import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';
import Promises from '../../components/Promises/Promises.js';
import CandidateBuns from '../../components/CandidateBuns/CandidateBuns.js';

import eng2url from '../../utils/eng2url';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import getPeopleDistrict from '../../utils/getPeopleDistrict';
import identity from '../../utils/identity';
/*
:category => {"records", "promises"}
歷史紀錄
未來承諾
*/

@connect(
    state => ({  
                 legislators: state.legislators,
                 candidates: state.candidates,
                 records: state.records,
                 issues: state.issues,
                 people: state.people
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class People extends Component {
  constructor(props){ super(props)
      this.state = {
        legislatorPositions: parseToLegislatorPosition(props.records, props.issues, props.legislators),
        districtData: getPeopleDistrict(props.legislators, props.candidates, props.params.peopleId)
      }
      //console.log(parseToLegislatorPosition(props.records, props.issues, props.legislators))
  }
  render() {
    const styles = require('./People.scss');
    
    const id = this.props.params.peopleId;
    const category = this.props.params.category;

    //立委基本資料
    const {legislators, candidates, people} = this.props;
    const currentPeople = people[id];
    //是否為第八屆立委，是否為第九屆區域立委參選人
    let currentIdentity = identity(legislators, candidates, id);

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
        const {candidates} = this.props;
        let promises = candidates[id];
        content = <Promises id={id} promises={promises}/>

        title = `${currentPeople.name}對於議題與法案的未來承諾-沃草2016立委出任務`;
        description = `${currentPeople.name}的未來承諾大公開！趕快來看看${currentPeople.name}各項重大議題的戰鬥策略與優先法案的戰鬥目標！`;
    
      break;

      
    }


    /////// NEEDS REFINE
    //頁面最下方看其他候選人
    let morePeopleSection;
    // 順序為優先順序
    if(currentIdentity.is9thCandidate){//是第九屆區域參選人
      morePeopleSection = (
          <div className={styles.bottomWrap}>
              <div>看{currentPeople.name}的競爭對手</div>
              <CandidateBuns area={districtData.area} areaNo={districtData.areaNo} category={category}
                             exclude={id}/>
          </div>
      )
    }
    if(!morePeopleSection && currentIdentity.is8thProportional){//在第八屆是不分區候選人
      let parties = legislators[id].parties;
      let partyCht = parties[parties.length-1].partyCht;

      morePeopleSection =  (
        <div className={styles.bottomWrap}>
          <div>
              <div>{currentPeople.name}是{partyCht}本屆不分區立委。</div>
              <Link to={`/parties/${cht2eng(partyCht)}`}>看{partyCht}這一屆的不分區名單。</Link>
          </div>
        </div>
      )
    }
    if(!morePeopleSection && !currentIdentity.is9thCandidate && !currentIdentity.is8thProportional){
      morePeopleSection =  (
        <div className={styles.bottomWrap}>
          <div>{currentPeople.name}沒有繼續參選下一屆的區域立委，看看這一區有誰選？</div>
          <CandidateBuns area={districtData.area} areaNo={districtData.areaNo} category={category}/>
        </div>
  
      )

    }////// 如果是改列為不分區呢？
   
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
          </ul>

          <div className={styles.innerWrap}>
            {content}
          </div>
            {morePeopleSection}
      </div>
    );
  }
}
