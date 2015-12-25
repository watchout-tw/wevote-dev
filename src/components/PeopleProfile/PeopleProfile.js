import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import eng2cht from '../../utils/eng2cht';
import cht2eng from '../../utils/cht2eng';
import district2url from '../../utils/district2url';
import peopleInfo from '../../utils/peopleInfo';
import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';

import getData from '../../data/getData';
const {legislators, candidates, people} = getData();

export default class PeopleProfile extends Component {
  render () {
    const styles = require('./PeopleProfile.scss');

    const {id} = this.props;
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
    
    //第八屆政黨資訊
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
    //是否已經離職（第八屆立委）
    let hasResignedText = (hasResigned===true) ? "已離職" : "";
    
    //年齡
    let ageItem = (info.ageText) ? <p>{info.ageText}</p> : "";
    
    //第八屆立委資訊
    let legInfoItem;
    if(info.legislatorTitle && info.legislatorDistrict){//區域立委
        legInfoItem = <p>第八屆
        <Link to={`/constituencies/${district2url(constituency1,constituency2)}/`}
              className={`${styles.ia} ${styles.line} ${styles.black}`}>
              {info.legislatorDistrict}
        </Link>立委</p>;
    }
    if(info.legislatorTitle && !info.legislatorDistrict){//不分區或黨團
        legInfoItem = <p>{info.legislatorTitle}</p>;
    }

    //第九屆參選資訊
    let candidateInfoItem = (info.candidateTitle) ? (
      <div className={styles.candidateParty}>
          <p>2016第九屆
              <Link to={`/constituencies/${district2url(candidateDistrict1,candidateDistrict2)}/`}
                    className={`${styles.ia} ${styles.line} ${styles.black}`}>{info.candidateTitle}</Link>立委候選人</p>
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
