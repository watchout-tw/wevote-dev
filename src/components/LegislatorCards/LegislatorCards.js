import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

import eng2cht from '../../utils/eng2cht';
import people_name2id from '../../utils/people_name2id';
import PeoplePhoto from '../PeoplePhoto/PeoplePhoto';

@connect(
    state => ({ MaXiRecords: state.MaXiRecords }),
    dispatch => bindActionCreators({}, dispatch))

export default class LegislatorCards extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
      
  }
  render() {
    const styles = require('./LegislatorCards.scss');
    const {MaXiRecords, handleClickCard, activeLegislator, showBack, handleCloseCard,
           meetFilterValue, procedureFilterValue} = this.props;

    let cardItems = Object.keys(MaXiRecords)
      .filter((currentLegislator, index)=>{
          //立場過濾
          let item = MaXiRecords[currentLegislator];
          
          let shouldReturn = true;
          if(meetFilterValue!=="all"){
              if(item.supportMaXiMeet!==meetFilterValue){
                shouldReturn = false;
              } 
          }
          if(procedureFilterValue!=="all"){
              if(item.positionOnProcedure!==procedureFilterValue){
                shouldReturn = false;
              }
          }

          if(shouldReturn === true){
             return currentLegislator;
          }
          
      })
      .map((currentLegislator, index)=>{
        return <LegislatorCard data={ MaXiRecords[currentLegislator] }
                               activeLegislator={activeLegislator}
                               showBack={showBack}
                               handleClickCard={handleClickCard}
                               handleCloseCard={handleCloseCard}
                               key={`LegislatorCard-${index}`} />
    })
    return (
        <div className={styles.wrap}>
            {cardItems}
        </div>
    );
  }
}
function handlePosEng(pos){
    if(pos === "none"){
        return "？"
    }else{
        return eng2cht(pos);
    }
}
function transparent2aye(pos){
    if(pos === "transparent"){
      return "aye";
    }else if(pos === "blackbox"){
      return "nay";
    }else{
      return pos;
    }
}
class LegislatorCard extends Component {
  render(){
    const styles = require('./LegislatorCards.scss');
    const {data, activeLegislator, handleClickCard, handleCloseCard, showBack} = this.props;

    console.log("showBack:"+showBack)
    let shouldShowBack = (showBack === true && data.name === activeLegislator);
    
    let outerWrapClasses = classnames({
      [styles.outerWrap] : true,
      [styles.showBack] : shouldShowBack === true,
      [styles.showFront]: shouldShowBack === false
    })


    let cardWrapClasses = classnames({
      [styles.cardWrap]   : true,
      [styles.active]     : data.name === activeLegislator
    })

    return (
        <div className={outerWrapClasses}>
            <div className={cardWrapClasses}
                 onClick={handleClickCard.bind(null,data.name)}>
    
                <div className={`${styles.card} ${styles.front}`}>
                    <div className={styles.photo}><PeoplePhoto id={people_name2id(data.name)}/></div>
                    <div className={styles.peopleName}>{data.name}</div>
                    
                    <div>
                        <div className={`${styles.partyFlag} ${styles.small} ${styles[data.party]}`}></div>
                        <div className={styles.partyTitle}>{eng2cht(data.party)}</div>
                    </div>
        
                    <div className={styles.positions}>
                        <div className={styles.position}>
                            <div className={styles.posTitle}>支持會面</div>
                            <div className={`${styles.posPosition} ${styles[data.supportMaXiMeet]}`}>{handlePosEng(data.supportMaXiMeet)}</div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.posTitle}>本次程序</div>
                            <div className={`${styles.posPosition}  ${styles[transparent2aye(data.positionOnProcedure)]}`}>{handlePosEng(data.positionOnProcedure)}</div>
                        </div>
                    </div>
                </div>
    
                <div className={`${styles.card} ${styles.back}`}>
                     <div className={styles.closeCard}
                          onClick={handleCloseCard.bind(null)}>Close</div>
                </div>
            </div>
        </div>
    )
  }

}
