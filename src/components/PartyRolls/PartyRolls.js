import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import PKer from '../../components/PKer/PKer';

@connect(
    state => ({ partyBlock: state.partyBlock }),
    dispatch => bindActionCreators({}, dispatch))
export default class PartyRolls extends Component {
    constructor(props){ super(props)
        this.state = {
            focus: "KMT",
            showMenu: false,
            outside: false
        }
    }
    _onScroll(){
      const {outside} = this.state;
      let footerNode = document.getElementById("footer");
      let footerRect = footerNode.getBoundingClientRect();
      let current = (footerRect.top - window.innerHeight < 0) ? true : false;

      if(current!==outside){
        this.setState({
          outside: current
        })
      }
    }
    componentDidMount(){
        window.addEventListener("scroll", this._onScroll.bind(this));
    }
    componentWillUnmount(){
        window.removeEventListener("scroll", this._onScroll.bind(this));
    }
    _onChangeFocus(value, event){
        window.scrollTo(0,0);
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
    render(){
      const styles = require("./PartyRolls.scss");
      const {partyBlock, onSetStage} = this.props;
      const {focus, showMenu, outside} = this.state;

      /* current display party */
      let data = partyBlock[focus];
      let list = partyBlock[focus].list || [];

      let wrapClasses = classnames({
        [styles.pbWrap]: true,
        [styles.show] : showMenu === true
      })
      let menuClasses = classnames({
        [styles.partyMenuBlock]: true,
        [styles.show] : showMenu === true,
        [styles.notFixed] : outside === true
      })
      let mobileMenuButtonClasses = classnames({
        [styles.mobileMenuButton]: true,
        [styles.hide] : outside === true
      })
      //mobile 選單: 選擇 & 關閉
      let mobileMenuButton = (
          <div className={mobileMenuButtonClasses}>
              <div className={styles.closeMenu}
                   onClick={this._setMenu.bind(this, false)}>
                   <i className="fa fa-times"></i>
              </div>
              <div className={styles.toggleMenu}
                    onClick={this._setMenu.bind(this, true)}>
                  <i className={`fa fa-map-o ${styles.toggleIcon}`}></i>
              </div>
          </div>
      )
      //標題字體svg
      let partyTitleImg = require(`./images/PartyNames_${focus.toLowerCase()}.svg`);
      let partyListImg = require("./images/PartyNames_list.svg");

      //名單列表
      let nameEntryItems = list.map((v,i)=>{
        return (
          <li>
            <div className={styles.partyEntryCount}>{i+1}</div>
            <div className={styles.peopleEntryName}>{v.name}</div>
            <div className={styles.peopleEntryInfo}>{v.info}</div>
          </li>
        )
      });

      return (
          <div className={wrapClasses} id="pbWrap">
              <div className={styles.pbInner}>
                  {mobileMenuButton}

                  <div className={styles.partyWrap}>
                      <section className={styles.partyRoll}>
                        <div className={styles.kwWrap}>
                            <div className={styles.keywords}>勇者關鍵字</div>
                        </div>
                        <ol>{nameEntryItems}</ol>
                      </section>
                      <div className={`${styles.partyRollEndpoint} ${styles.top}`}>
                          <h2 className={styles.partyTitle}>
                              <img src={partyTitleImg}/>
                              <img src={partyListImg} />
                          </h2>
                      </div>
                      <div className={`${styles.partyRollEndpoint} ${styles.bottom}`}></div>
                  </div>

                  <div className={menuClasses}>
                      <div className={`${styles.billboard} ${styles.left}`}>
                          <PartyMenu side={1}
                                     onChangeFocus={this._onChangeFocus.bind(this)}
                                     focus={focus}/></div>
                      <div className={`${styles.billboard} ${styles.right}`}>
                          <PartyMenu side={2}
                                     onChangeFocus={this._onChangeFocus.bind(this)}
                                     focus={focus}/></div>
                  </div>

              </div>

              <div className={styles.actionBlock}>
                  <div className={styles.actionText}>黨團成分分析，快來看誰最適合你？</div>
                  <div className={styles.actions}>
                      <div className={styles.goMatch}
                           onClick={onSetStage.bind(null, "matchgame")}>開始分析</div>
                  </div>
              </div>



          </div>
      )
   }
}

@connect(
    state => ({
                parties: state.parties,
                partyBlock: state.partyBlock
              }),
    dispatch => bindActionCreators({}, dispatch))

class PartyMenu extends Component {
  constructor(props){ super(props)
    const {partyBlock, parties} = props;
    //prepare 左右兩邊的政黨列表
    let side1parties = [], side2parties = [];
    Object.keys(partyBlock)
          .map((partyId, index)=>{
              if(parties[partyId].side === 1){
                 side1parties.push(parties[partyId])
              }else{
                 side2parties.push(parties[partyId])
              }
          });

    this.state = {
      side1parties: side1parties,
      side2parties: side2parties
    }
  }
  render(){
    const {side, onChangeFocus, focus} = this.props;
    const {side1parties, side2parties} = this.state;
    const styles = require("./PartyRolls.scss");

    let currentSide = (side ===1) ? side1parties : side2parties;
    let partyMenuItems = currentSide.map((value, index)=>{
      let active = (focus === value.id);
      return (
        <div className={styles.partyItem}
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
