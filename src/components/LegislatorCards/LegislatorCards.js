import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

import eng2cht from '../../utils/eng2cht';
import people_name2id from '../../utils/people_name2id';
import handlePos from '../../utils/handlePos';
import PeoplePhoto from '../PeoplePhoto/PeoplePhoto';
import RecordPost from '../RecordPost/RecordPost';
import ReactSwipe from 'react-swipe';
import moment from 'moment';

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
    const {MaXiRecords, handleClickCard, activeLegislator,
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
        return <Card data={ MaXiRecords[currentLegislator] }
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

class Card extends Component {

  constructor(props){super(props)
    this.state = {
        currentIndex: 0
    }

  }
  _onSlideChange(index, div){
    this.setState({
      currentIndex: index
    })
  }
  render(){
    const styles = require('./LegislatorCards.scss');
    const {data, activeLegislator, handleClickCard} = this.props;
    let {currentIndex} = this.state;

    let cardWrapClasses = classnames({
      [styles.cardWrap]   : true,
      [styles.active]     : data.name === activeLegislator
    })
    let recordPosts = data.records.map((r,i)=>{
        return (
            <div className={styles.recordWrap}><RecordPost r={r} totalLength={data.records.length} /></div>
        )
    });
    let dotItems = data.records.map((r,i)=>{
        let dotClasses = classnames({
          [styles.dotItem] : true,
          [styles.active]  : i === currentIndex
        })
        return (
            <div className={dotClasses}></div>
        )
    });

    /* quote */
    let quoteSection = data.records.length > 1 ? (
      <div className={styles.quoteSwiper}>
          <ReactSwipe continuous={true} 
              callback={this._onSlideChange.bind(this)}>
              {recordPosts}
          </ReactSwipe>
          <div className={styles.dots}>{dotItems}</div>
      </div>
    ) : <div className={styles.quoteSwiper}>{recordPosts}</div>;


    /* position */
    let positionSection = (
        <div className={styles.aboutPosition}>
            <div className={styles.aboutPositionMobile}>
                <div className={styles.position}>
                    <div className={`${styles.posPosition} ${styles[data.supportMaXiMeet]}`}></div>
                    <div className={styles.posTitle}>支持會面：{handlePos(data.supportMaXiMeet)}</div>
                </div>
                <div className={styles.position}>
                    <div className={`${styles.posPosition}  ${styles[transparent2aye(data.positionOnProcedure)]}`}></div>
                    <div className={styles.posTitle}>本次程序：{handlePos(data.positionOnProcedure)}</div>
                </div>
            </div>
            <div className={styles.aboutPositionWeb}>
                <div className={styles.position}>
                    <div className={styles.posTitle}>支持會面</div>
                    <div className={`${styles.posPosition} ${styles[data.supportMaXiMeet]}`}>{handlePos(data.supportMaXiMeet)}</div>
                </div>
                <div className={styles.position}>
                    <div className={styles.posTitle}>本次程序</div>
                    <div className={`${styles.posPosition}  ${styles[transparent2aye(data.positionOnProcedure)]}`}>{handlePos(data.positionOnProcedure)}</div>
                </div>
            </div>
        </div>
    )

    return (
        
        <div className={cardWrapClasses}
             onClick={handleClickCard.bind(null,data.name)}>
            
            <div className={styles.aboutPeople}>
                <div className={styles.photo}><PeoplePhoto id={people_name2id(data.name)}/></div> 
                <div className={styles.peopleInfo}>
                    <div className={styles.peopleName}>{data.name}</div>
                    <div className={`${styles.partyFlag} ${styles.small} ${styles[data.party]}`}></div>
                    <div className={styles.partyTitle}>{eng2cht(data.party)}</div>
                </div>
            </div>

            {positionSection}
            {quoteSection}
          
        </div>
        
    )
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

