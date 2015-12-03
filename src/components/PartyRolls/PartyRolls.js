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
            showMenu: false
        }
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
    render(){
      const styles = require("./PartyRolls.scss");
      const {partyBlock} = this.props;
      const {focus, showMenu} = this.state;
      /* current display party */
      let data = partyBlock[focus];
      let list = partyBlock[focus].list || [];

      
   
      let menuClasses = classnames({
        [styles.partyMenuBlock]: true,
        [styles.show] : showMenu === true
      })
      let mobileMenuToggle = (
          <div>
              <div className={styles.closeMenu}
                   onClick={this._setMenu.bind(this, false)}>
                   <i className="fa fa-times"></i>
              </div>
              <div className={styles.toggleMenu}>
                <div className={styles.partyMenuItem}
                     onClick={this._setMenu.bind(this, true)}>
                    <div className={styles.innerHexagon}>
                      選擇<i className={`fa fa-sort-desc ${styles.toggleIcon}`}></i>
                    </div>
                </div>
              </div>
          </div>
      )
      let partyTitleImg = require(`./images/PartyNames_${focus.toLowerCase()}.svg`);

      //名單列表
      let nameEntryItems = list.map((v,i)=>{
        return (
          <li>
            <div className={styles.partyEntryCount}>{i+1}・</div>
            <div className={styles.peopleEntryName}>{v.name}</div>
            <div className={styles.peopleEntryInfo}>{v.info}</div>
          </li>
        )
      });
      
      return (
          <div className={styles.pbWrap}>
              {mobileMenuToggle}
              
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
          
              <div className={styles.partyWrap}>
                  
                  <section className={styles.partyRoll}>
                    <ol>{nameEntryItems}</ol>
                  </section>
                  <div className={`${styles.partyRollEndpoint} ${styles.top}`}>
                      <h2 className={styles.partyTitle}>
                          <img src={partyTitleImg}
                               className={styles.partyTitleImg}/>參戰名單
                      </h2>
                  </div>
                  <div className={`${styles.partyRollEndpoint} ${styles.bottom}`}></div>
                 
                  
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
  
  render(){
    const {parties, partyBlock, side, onChangeFocus, focus} = this.props;
    const styles = require("./PartyRolls.scss");

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