import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';
import Promises from '../../components/Promises/Promises.js';
import Story from '../../components/Story/Story.js';
import CandidateBuns from '../../components/CandidateBuns/CandidateBuns.js';

import cht2eng from '../../utils/cht2eng';
import eng2url from '../../utils/eng2url';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import getPeopleDistrict from '../../utils/getPeopleDistrict';
import identity from '../../utils/identity';
import district2cht from '../../utils/district2cht';

/*
:category => {"records", "promises", "story"}
歷史紀錄
未來承諾
人物誌
*/

import getData from '../../data/getData';
const {records, issues, legislators, candidates, people} = getData();


export default class People extends Component {
  constructor(props){ super(props)
      this.state = {
        legislatorPositions: parseToLegislatorPosition(records, issues, legislators),
        districtData: getPeopleDistrict(legislators, candidates, props.params.peopleId)
      }
  }
  render() {
    const styles = require('./People.scss');
    
    const id = this.props.params.peopleId;
    const category = this.props.params.category;

    //立委基本資料
    const currentPeople = people[id];
    //是否為第八屆立委，是否為第九屆區域立委參選人
    
    let currentIdentity = identity(legislators, id);

    //頁面最下方要呈現的候選人選區資料
    const {districtData} = this.state;

    //content
    let content;

    //SEO
    let title, description;

    switch(category){
      case 'records':
        const {legislatorPositions} = this.state;
        const currentLegislatorPosition = legislatorPositions[currentPeople.name];
        
        if(currentLegislatorPosition){//有第八屆的資料
            content = <IssueGroup id={id} currentLegislatorPosition={currentLegislatorPosition}/>
        }else{
            content = <div>無歷史表態紀錄：非第八屆立委。</div>
        }

        //SEO
        title = `${currentPeople.name}戰鬥策略分析-沃草2016立委出任務`;
        description = `${currentPeople.name}對於各項重大議題之城的戰鬥策略大解析！趕快來看看${currentPeople.name}在立法院針對下列重大議題說了些什麽！`;

      break;

      case 'promises':
        let promises = candidates[id];
        content = <Promises id={id} promises={promises}/>;

        title = `${currentPeople.name}對於議題與法案的未來承諾-沃草2016立委出任務`;
        description = `${currentPeople.name}的未來承諾大公開！趕快來看看${currentPeople.name}各項重大議題的戰鬥策略與優先法案的戰鬥目標！`;
    
      break;

      case 'story':
        content = <Story id={id}/>
        title = `${currentPeople.name}-沃草人物誌-沃草2016立委出任務`;
        description = `${currentPeople.name}-沃草人物誌-沃草2016立委出任務`;//TBD
    
      break;


      
    }

    let districtText, proportionalText;
    let districtSection, proportionalSection;
    
    /* ----- 區域 ------ */
    let disNoText = (districtData.areaNo === "N/A") ? "" : `第${districtData.areaNo}選區`;

    //第九屆區域參選人
    if(currentIdentity.is9thCandidate){
        districtText = <div>{currentPeople.name}是{district2cht(districtData.area)}{disNoText}的候選人，看他的對手有誰？</div>
    }
    //區域轉戰不分區
    if(currentIdentity.is8thDistrict && currentIdentity.is9thProportional){
        districtText = <div>{currentPeople.name}是{district2cht(districtData.area)}{disNoText}的現任立委，看看這一區現在有誰參戰</div>;
    }
    //區域不再當立委
    if(currentIdentity.is8thDistrict && !currentIdentity.is9thProportional && !currentIdentity.is9thCandidate){
        districtText = <div>{currentPeople.name}沒有繼續參選立委，看看2016這區有誰參戰？</div>;
    }

    if(districtText){
        districtSection = (
          <div className={styles.bottomWrap}>
              {districtText}
              <CandidateBuns area={districtData.area} 
                             areaNo={districtData.areaNo} 
                             category={category}
                             exclude={id}/>
          </div>
        )
    }

    /* ----- 不分區 ------ */
    let parties, partyCht;
    if(legislators[id]){
        parties = legislators[id].parties;
        partyCht = parties[parties.length-1].partyCht;
        //第八屆不分區
        if(currentIdentity.is8thProportional){
            proportionalText = <div>{currentPeople.name}是{partyCht}本屆不分區立委。</div>;
        }
        //第九屆不分區
        if(currentIdentity.is9thProportional){
            proportionalText = <div>{currentPeople.name}是{partyCht}2016不分區立委。</div>;
        }
    }
    if(proportionalText){
        proportionalSection =  (
          <div className={styles.bottomWrap}>
            <div>
                {proportionalText}
                <Link className={styles.partyLink}
                      to={`/parties/${cht2eng(partyCht)}/list/`}>看2016{partyCht}不分區名單。</Link>
            </div>
          </div>
        )
    }
    
   
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description,
            'og:type' : 'website'
          }
      }
    };

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <PeopleProfile id={id} />
          <ul className={styles.innerTag}>
              <li><Link to={`/people/${id}/records/`} 
                        className={ category==="records" ? styles.active : ""}>歷史紀錄</Link></li>
              <li><Link to={`/people/${id}/promises/`} 
                        className={ category==="promises" ? styles.active : ""}>未來承諾</Link></li>
              <li><Link to={`/people/${id}/story/`} 
                        className={ category==="story" ? styles.active : ""}>人物誌</Link></li>
          </ul>

          <div className={styles.innerWrap}>
            {content}
          </div>

          {proportionalSection}
          {districtSection}
          
      </div>
    );
  }
}
