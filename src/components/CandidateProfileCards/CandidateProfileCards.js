import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import people_name2id from '../../utils/people_name2id';
import getDistrictCandidates from '../../utils/getDistrictCandidates';
import identity_district from '../../utils/identity_district';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';

@connect(
    state => ({
      legislators: state.legislators,
      candidates: state.candidates
    }),
    dispatch => bindActionCreators({}, dispatch))

export default class CandidateProfileCards extends Component {
  constructor(props){ super(props)
    const {legislators, candidates, area, areaNo} = props;
    let candidateList = getDistrictCandidates(candidates, area, areaNo);
    this.state = {
        candidateList: candidateList
    }
  }
 
  render() {
    const styles = require("./CandidateProfileCards.scss");
    const {legislators, area, areaNo} = this.props;
    const {candidateList} = this.state;

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
                    people={value}/>
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
    const {people} = this.props;
    if(!people) return <div></div>

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

    return (
        <Link to={`/people/${people.id}/records/`}
              className={`${styles.cardItem}`}>
            <div className={styles.partyItem}>
                <div className={`${styles.partyFlag} ${styles.small} ${styles[people.party]}`}></div>
            </div>
            <div className={styles.name}>{people.name}</div>
            <div className={styles.peoplePhoto}><PeoplePhoto id={people.id}/></div>
            {billSection}
        </Link>
    );
  }

}

