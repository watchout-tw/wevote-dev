import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';

import people_name2id from '../../utils/people_name2id';
import identity_district from '../../utils/identity_district';
import eng2cht from '../../utils/eng2cht';
import countLevel from '../../utils/countLevel';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';

import getData from '../../data/getData';
const {legislators, people} = getData();

export default class CandidateProfileCards extends Component {
  constructor(props){ super(props)
    this.state = {
        activeIssue: ""
    }
  }
  _onSetActiveIssue(name, e){
    this.setState({
        activeIssue: name
    })
  }
 
  render() {
    const styles = require("./CandidateProfileCards.scss");
    const {candidateList, area, areaNo, side} = this.props;
    const {activeIssue} = this.state;

    let candidateCardItems = (candidateList || []).map((value, index)=>{
        let currentInfo;//本區現任立委 or 現任立委，但不是本區
        
        let isCurrent = identity_district(legislators[value.id], area, areaNo);
        if(isCurrent === 'D'){
           currentInfo = <h3 className={styles.currentInfo} >本區現任勇者代表</h3>;
        }
        if(isCurrent === 'C'){
           currentInfo = <h3 className={styles.currentInfo} >現任勇者，但並非本區代表</h3>;
        }
        
        return (
          <div className={styles.cardWrap} key={`candiate-card-${index}`}>
              {currentInfo}
              <Card id={value.id}
                    people={value}
                    side={side}
                    onSetActiveIssue={this._onSetActiveIssue.bind(this)}
                    activeIssue={activeIssue}/>
          </div>
        );
    })

    return (
        <div className={styles.wrap}>
            <div className={styles.cardItems}>{candidateCardItems}</div>
        </div>
    );
  }
}

class Card extends Component {
  render() {
    const styles = require("./CandidateProfileCards.scss")
    const {people, side, onSetActiveIssue, activeIssue} = this.props;
    if(!people) return <div></div>


    /* ------ 正面：法案 ------ */
    let billItems = (people.bills||[]).map((value, index)=>{
        return (
            <li key={`${people.id}-${index}`}>{value.goal}</li>
        )
    })
    let billSection;
    if(people.bills[0].goal){
      billSection = (
        <div className={styles.billSection}>
            <ul className={styles.billList}>{billItems}</ul>        
        </div>
      )
    }else{
      let text = (people.contactAvaliable === true) ? "尚未回覆" : "無公開聯絡資訊";
      billSection = (
        <div className={`${styles.billSection} ${styles.noReply}`}>
            {text}  
        </div>
      )

    }
    /* ------- 背面：表態 ------ */
    //表態
    //REFINE: image duplicated with position table
    let imgHub = {};
    imgHub.aye = require("./images/answers_aye.svg")
    imgHub.nay = require("./images/answers_nay.svg")
    imgHub.none = require("./images/answers_unknown.svg")

    let positionEntries = Object.keys(people.positions).map((issueName, j)=>{
        let pos = people.positions[issueName];
        let level = countLevel(pos.recordCount);
        let recordClasses = classnames({
          [styles.record] : true,
          [styles.empty] : level==="empty"
        })
        let positionClasses = classnames({
          [styles.position]: true,
          [styles.active]: activeIssue === issueName
        })

        return (
          <div className={positionClasses}
               onMouseEnter={onSetActiveIssue.bind(null, issueName)}>
              <div className={styles.issueName}>{eng2cht(issueName)}</div>
              <div className={recordClasses}>
                  <div className={`${styles.recordSquare} ${styles[pos.record]} ${styles[level]}`}></div>
              </div>
              <img className={styles.promise}
                   src={`${imgHub[pos.promise]}`} />
          </div>
        )
    })
    let cardItemClasses = classnames({
      [styles.cardItem] : true,
      [styles.front] : side === 'front',
      [styles.back] : side === 'back'
    })
    return ( 
        <Link to={`/people/${people.id}/records/`}
              className={cardItemClasses}>
            
            <div className={`${styles.innerCard} ${styles.front}`}>
                <div className={styles.partyItem}>
                    <div className={`${styles.partyFlag} ${styles.small} ${styles[people.party]}`}></div>
                </div>
                <div className={styles.name}>{people.name}</div>
                <div className={styles.peoplePhoto}><PeoplePhoto id={people.id}/></div>
                {billSection}
            </div>
            
            <div className={`${styles.innerCard} ${styles.back}`}>
                <div className={styles.peopleName}>{people.name}</div>
                {positionEntries}
            </div>
        </Link>
        
        
    );
  }

}

