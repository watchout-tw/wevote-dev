import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';
import eng2cht from '../../utils/eng2cht';
import cht2eng from '../../utils/cht2eng';
import peopleInfo from '../../utils/peopleInfo';
import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';
@connect(
    state => ({
      legislators: state.legislators,
      candidates: state.candidates,
      people: state.people
    }),
    dispatch => bindActionCreators({}, dispatch))


export default class PeopleProfile extends Component {
  static propTypes = {
    legislators: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }
  
  render () {
    const styles = require('./PeopleProfile.scss');

    const {legislators, candidates, people, id} = this.props;
    const peopleData = people[id];
    const legislatorData = legislators[id];
    const candidateData = candidates[id];
    let {name, age} = peopleData;
    let isCandidate = legislatorData || false;
    let parties, constituency1, constituency2, hasResigned;
    let candidateDistrict1, candidateDistrict2;
    
    if(legislatorData){
        parties = legislatorData.parties;
        constituency1 = legislatorData.constituency1;
        constituency2 = legislatorData.constituency2;
        hasResigned = legislatorData.hasResigned;
    }
    if(candidateData){
      candidateDistrict1 = candidateData.districtArea;
      candidateDistrict2 = candidateData.districtNo;
    }
    /* maybe move to contructor later */
    let info = peopleInfo(name, age, constituency1, constituency2, candidateData, candidateDistrict1, candidateDistrict2);
        
    let partiesItem;
    if(parties){
        partiesItem = (parties).map((p,index)=>{
            let partyEng = cht2eng(p.partyCht);
            return (
              <div key={index}>
                  <div className={styles.partyEng}>
                    <div className={`${styles.partyFlag} ${styles.small} ${styles[partyEng]}`}></div>
                    <Link to={`/parties/${partyEng}/records/`} className={`${styles.partyTitle} ${styles.ia} ${styles.black}`}>{p.partyCht}</Link>
                  </div>
                  <div className={styles.partyPeriod}>{`（${p.startDate}-${p.endDate}）`}</div>
              </div>
            )
        })
    }
    let hasResignedText = (hasResigned===true) ? "已離職" : "";
    
    //年齡
    let ageItem = (info.ageText) ? <p>{info.ageText}</p> : "";
    
    let legInfoItem = (info.legislatorTitle) ? <p>{info.legislatorTitle}</p> : "";
    let candidateInfoItem = (info.candidateTitle) ? (
      <div className={styles.candidateParty}>
          <p>{info.candidateTitle}</p>
          <div className={styles.partyEng}>
              <div className={`${styles.partyFlag} ${styles.small} ${styles[candidateData.party]}`}></div>
              <Link to={`/parties/${candidateData.party}/records/`} 
                    className={`${styles.partyTitle} ${styles.ia} ${styles.black}`}>{eng2cht(candidateData.party)}</Link>
          </div>
      </div>) : "";

    return (
      <div className={styles.wrap}>
        <header>
          <div className={styles.peopleProfile}>
            <div className={styles.avatar}><PeoplePhoto id={id}/></div>
            <div className={styles.peopleInfo}>
              <div className={styles.peopleName}>
                <Link to={`/people/${id}/records/`} className={`${styles.name} ${styles.ia} ${styles.black} ${styles.big}`}>{name}</Link>
              </div>
              <div className={styles.peopleDetail}>
                  {ageItem}
                  {legInfoItem}
                  <div>{partiesItem}</div>
                  <p>{hasResignedText}</p>
                  {candidateInfoItem}
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
