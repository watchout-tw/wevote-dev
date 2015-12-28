import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';

import people_name2id from '../../utils/people_name2id';
import identity_district from '../../utils/identity_district';
import eng2cht from '../../utils/eng2cht';
import countLevel from '../../utils/countLevel';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';
import PartyFlag from '../../components/PartyFlag/PartyFlag.js';

import getData from '../../data/getData';
const {legislators, people} = getData();

export default class CandidateCompare extends Component {
  
 
  render() {
    const styles = require("./CandidateCompare.scss");
    const {candidateList, area, areaNo} = this.props;
    console.log(candidateList)
    let candidateCardItems = candidateList.map((people, index)=>{
        
        return (
         
              <Card people={people} 
                    area={area}
                    areaNo={areaNo} 
                    key={`candiate-compare-card-${index}`}/>
          
        );
    })

    return (
        <div className={styles.wrap}>
            {candidateCardItems}
        </div>
    );
  }
}

class Card extends Component {
  render() {
    const styles = require("./CandidateCompare.scss")
    const {people, area, areaNo} = this.props;
   
    /* ------  現任資訊 ------ */
    let currentInfo;//本區現任立委 or 現任立委，但不是本區
        
    let isCurrent = identity_district(legislators[people.id], area, areaNo);
    if(isCurrent === 'D'){
       currentInfo = <h3 className={styles.currentInfo} >本區現任勇者代表</h3>;
    }
    if(isCurrent === 'C'){
       currentInfo = <h3 className={styles.currentInfo} >現任勇者，但並非本區代表</h3>;
    }
    
    /* -------  表態 ------ */
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
       
        return (
          <div className={styles.position}>
              <div className={styles.issueName}>{eng2cht(issueName)}</div>
              <div className={recordClasses}>
                  <div className={`${styles.recordSquare} ${styles[pos.record]} ${styles[level]}`}></div>
              </div>
              <img className={styles.promise}
                   src={`${imgHub[pos.promise.position]}`} />
          </div>
        )
    })


    /* ------  法案 ------ */
    let billItems = (people.bills||[]).map((value, index)=>{
        return (
            <li key={`${people.id}-${index}`}>{value.goal}</li>
        )
    })
    let billSection = (people.bills[0].goal) ? (
        <div className={styles.billSection}>
            <ul className={styles.billList}>{billItems}</ul>        
        </div>
    ):"";
   
    /* ------  無聯絡資訊 ------ */
    let noContactInfo = (people.contactAvaliable === false) ? <div>無公開聯絡資訊</div> : "";
     

    return ( 
        <div className={styles.card}>
             <Link to={`/people/${people.id}/records/`} className={styles.cardLink}>
              <div className={styles.peoplePhoto}>
                  <PeoplePhoto id={people.id}/>
              </div>
              <div className={styles.basicInfo}>
                  {currentInfo}
                  <div className={styles.peopleNumber}>{people.number}</div>
                  <div className={styles.peopleName}>{people.name}</div>
                  <div className={styles.partyItem}>
                      <div className={`${styles.partyFlag} ${styles.small} ${styles[people.party]}`}></div>
                      <PartyFlag partyId={people.party}/>
                  </div>
              </div>
              <div>{positionEntries}</div>
              </Link>
        </div>
        
        
    );
  }

}


              
//               
//               {noContactInfo}
//               {billSection}

