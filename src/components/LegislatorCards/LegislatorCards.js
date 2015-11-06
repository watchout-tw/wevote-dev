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
    const {MaXiRecords, handleClickCard, activeLegislator} = this.props;
    let cardItems = Object.keys(MaXiRecords).map((currentLegislator, index)=>{
        return <LegislatorCard data={ MaXiRecords[currentLegislator] }
                               activeLegislator={activeLegislator}
                               handleClickCard={handleClickCard}
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
    const {data, activeLegislator, handleClickCard} = this.props;
    let cardWrapClasses = classnames({
      [styles.cardWrap]: true,
      [styles.active]  : data.name === activeLegislator
    })

    return (
        <div className={cardWrapClasses}
             onClick={handleClickCard.bind(null,data.name)}>
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
    )
  }

}
