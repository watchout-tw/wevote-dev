import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import eng2cht from '../../utils/eng2cht';
import cht2eng from '../../utils/cht2eng';
import district2url from '../../utils/district2url';
import peopleInfo from '../../utils/peopleInfo';
import circleNumber from '../../utils/circleNumber';
import identity from '../../utils/identity';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';
import PartyFlag from '../../components/PartyFlag/PartyFlag.js';

import getData from '../../data/getData';
const {legislators, candidates, people, parties} = getData();

export default class PeopleProfile extends Component {
  render () {
    const styles = require('./PeopleProfile.scss');

    const {id} = this.props;
    const peopleData = people[id];
    const legislatorData = legislators[id];
    const candidateData = candidates[id];
    let {name, age} = peopleData;
    let isCandidate = legislatorData || false;
    let legislatorParties, constituency1, constituency2, hasResigned;
    let candidateDistrict1, candidateDistrict2;
    
    if(legislatorData){
        legislatorParties = legislatorData.parties;
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
    
    //////// 第八屆政黨資訊
    let partiesItem;
    if(legislatorParties){
        partiesItem = (legislatorParties).map((p,index)=>{
            let partyEng = cht2eng(p.partyCht);
            
            return (
              <div key={index}>
                  <div className={styles.partyEng}>
                    <div className={`${styles.partyFlag} ${styles.small} ${styles[partyEng]}`}></div>
                    <PartyFlag partyId={partyEng} />
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
        legInfoItem = (
          <p className={styles.legislatorInfo}>第八屆
              <span className={styles.districtLinkSet}>
                  <Link to={`/constituencies/${district2url(constituency1)}/`}
                        className={`${styles.districtLink} ${styles.ia} ${styles.line} ${styles.black}`}>
                        {info.legislatorDistrictArea}
                  </Link>
                  {
                    (info.legislatorDistrictAreaNo) ? 
                    <Link to={`/constituencies/${district2url(constituency1,constituency2)}/`}
                          className={`${styles.districtLink} ${styles.districtLink} ${styles.ia} ${styles.line} ${styles.black}`}>
                          {info.legislatorDistrictAreaNo}
                    </Link> : ""

                  }
              </span>
              立委
          </p>);
    }
    if(info.legislatorTitle && !info.legislatorDistrict){//不分區或黨團
        legInfoItem = <p className={styles.legislatorInfo}>{info.legislatorTitle}</p>;
    }

    ///////////// 第九屆參選資訊
    let candidateInfoItem;

    if(info.candidateTitle){    
        candidateInfoItem = (
        <div>
            <p>2016第九屆
                <span className={styles.districtLinkSet}>
                    <Link to={`/constituencies/${district2url(candidateDistrict1)}/`}
                          className={`${styles.districtLink} ${styles.ia} ${styles.line} ${styles.black}`}>
                          {info.candidateDistrictArea}
                    </Link>
                    { 
                      (info.candidateDistrictAreaNo) ? 
                      <Link to={`/constituencies/${district2url(candidateDistrict1,candidateDistrict2)}/`}
                            className={`${styles.districtLink} ${styles.ia} ${styles.line} ${styles.black}`}>
                            {info.candidateDistrictAreaNo}
                      </Link>: ""
                    }
                </span>
                      {circleNumber(candidateData.number)}候選人</p>
                <div className={styles.partyEng}>
                    <div className={`${styles.partyFlag} ${styles.small} ${styles[candidateData.party]}`}></div>
                    <PartyFlag partyId={candidateData.party} />
                </div>
        </div>);
    }

    let currentIdentity = identity(legislators, id);
    if(currentIdentity.is9thProportional===true){//第八屆立委 && 第九屆不分區
      let parties = legislatorData.parties;
      let partyCht = parties[parties.length-1].partyCht;

      candidateInfoItem = (
        <div className={styles.seeMore}>
            2016第九屆
            <Link className={`${styles.ia} ${styles.line} ${styles.black}`}
                  to={`/parties/${cht2eng(partyCht)}/list/`}>{partyCht}不分區</Link>
            立委</div>
        );
      
    }


    return (
      <div className={styles.wrap}>
        <header>
          <div className={styles.peopleProfile}>
            <div className={styles.avatar}><PeoplePhoto id={id}/></div>
            <div className={styles.peopleInfo}>
              <div className={styles.peopleName}>
                <Link to={`/people/${id}/records/`} 
                      className={`${styles.name} ${styles.ia} ${styles.black} ${styles.big}
                                  ${name.length > 20 ? styles.small : ""}`}>{name}</Link>
              </div>
              <div className={styles.peopleDetail}>
                  {ageItem}
                  {candidateInfoItem}

                  {legInfoItem}
                  <div>{partiesItem}</div>
                  <p>{hasResignedText}</p>
                  
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
