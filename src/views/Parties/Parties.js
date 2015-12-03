import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import prefixr from 'react-prefixr';
import eng2party_short from '../../utils/eng2party_short';
import PKer from '../../components/PKer/PKer';
@connect(
    state => ({
                partyBlock: state.partyBlock
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Parties extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
      this.state = {
          focus: "KMT",
          showMenu: false
      }
  }
  componentDidMount(){
      this.setState({
          innerWidth: window.innerWidth
      })
      window.addEventListener('scroll', this._onResize.bind(this));
  }
  componentWillUnmount(){
      window.removeEventListener('scroll', this._onResize.bind(this));
  }
  _onResize(){
      this.setState({
          innerWidth: window.innerWidth
      })
  }
  _onChangeFocus(value, event){
      console.log(value)
      this.setState({
          focus: value,
          showMenu: false
      })
  }
  _setMenu(value, event){
      this.setState({
          showMenu: value
      })
  }
  render() {
    const styles = require('./Parties.scss');
    const {partyBlock} = this.props;
    const {focus, showMenu} = this.state;

    /* current display party */
    let data = partyBlock[focus];
    let list = partyBlock[focus].list || [];

    let partyNameImage = require('./images/PartyNames_' + data.id.toLowerCase() + '.svg');
    let partyNameListImage = require('./images/PartyNames_list.svg');
    let columnItems = list.map((v,i)=>{
        return <li>{v}</li>
    });
    let columnClasses = classnames({
      [styles.columnBlock] : true,
      [styles.twoColumns] : list.length >= 17
    })
    let partyRollItem = (
        <div className={styles.partyRoll}>
          <p className={styles.partyTitle}>
              <img src={partyNameImage} alt={data.title} />
              <img src={partyNameListImage} alt="參戰名單" />
          </p>
              <section className={columnClasses}>
                  <ol>{columnItems}</ol>
              </section>
        </div>
    );

    let menuClasses = classnames({
      [styles.partyMenuBlock]: true,
      [styles.show] : showMenu === true
    })
    return (
      <div className={styles.wrap}>
          <div className={styles.toggleMenu}>
            <div className={`${styles.hexagon} ${styles.partyMenuItem}`}
                 onClick={this._setMenu.bind(this, true)}>
                <div className={styles.innerHexagon}>
                  選擇<i className={`fa fa-sort-desc ${styles.toggleIcon}`}></i>
                </div>
            </div>
          </div>
          <div className={menuClasses}>
              <div className={styles.closeMenu}
                   onClick={this._setMenu.bind(this, false)}>
                <i className="fa fa-times"></i>
              </div>
              <div className={`${styles.billboard} ${styles.left}`}>
                  <PartyMenu side={1}
                             onChangeFocus={this._onChangeFocus.bind(this)}
                             focus={focus}/></div>
              <div className={`${styles.billboard} ${styles.right}`}>
                  <PartyMenu side={2}
                             onChangeFocus={this._onChangeFocus.bind(this)}
                             focus={focus}/></div>
          </div>
          <div className={styles.partyWrap}>
              <div className={styles.partyRollTop}></div>
              <div className={styles.partyFlow}>
                  {partyRollItem}
              </div>
          </div>
          <div className={styles.story}>
            <p>黨團衝突戰，將由各地勇者所組成不同的黨團，以團體戰的方式爭奪立法聖殿中的勇者席位。在這場團體戰鬥中，誰能爭取最多席位，同樣考驗島嶼主人的智慧。</p>
            <p>挑戰任務即刻啟動！</p>
            <p>黨團成分分析，快來看誰最適合你？</p>
          </div>
          <div className={styles.actions}>
              <Link to={`/parties-matchgame/`}
                    className={styles.goMatch}>進入挑戰</Link>
              <div><Link to={`/parties-table/`}
                    className={styles.goTable}>直接看結果</Link></div>
          </div>
      </div>
    );
  }
}
@connect(
    state => ({
                parties: state.parties,
                partyBlock: state.partyBlock
              }),
    dispatch => bindActionCreators({}, dispatch))

class PartyMenu extends Component {
  render(){
    const {parties, partyBlock, side, onChangeFocus, focus} = this.props;
    const styles = require("./Parties.scss");

    // 這段跟 PKerBillboard 重疊太高
    let side1parties = [], side2parties = [];
    Object.keys(partyBlock)
          .map((partyId, index)=>{
              if(parties[partyId].side === 1){
                 side1parties.push(parties[partyId])
              }else{
                 side2parties.push(parties[partyId])
              }
          })
    let currentSide = (side ===1) ? side1parties : side2parties;
    let partyMenuItems = currentSide.map((value, index)=>{
      let active = (focus === value.id);
      return (
        <div className={styles.partyMenuItem}
             key={`side-${side}-${index}`}
             onClick={onChangeFocus.bind(null,value.id)}>
             <PKer id={value.id} active={active} />
        </div>
      )
    })

    return (
      <div>{partyMenuItems}</div>
    )
  }
}
