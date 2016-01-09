import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import moment from 'moment';

import cht2url from '../../utils/cht2url';
import people_name2id from '../../utils/people_name2id';
import eng2cht from '../../utils/eng2cht';
import cht2eng from '../../utils/cht2eng';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import peopleInfo from '../../utils/peopleInfo';
import district2url from '../../utils/district2url';
import circleNumber from '../../utils/circleNumber';
import identity from '../../utils/identity';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';

import getData from '../../data/getData';
const {records, issues, legislators, candidates} = getData();

export default class Record extends Component {
  constructor(props){ super(props)
      this.state = {
        legislatorPositions: parseToLegislatorPosition(records, issues, legislators)
      }
  }
  componentDidMount(){
      document.body.scrollTop = 0;
  }

  render() {
    const styles = require('./Record.scss');
    const recordId = this.props.params.recordId;

    const data = records[recordId];

    const peopleId = people_name2id(data.legislator);
    const legislator = legislators[peopleId];

    const {legislatorPositions} = this.state;
    const currentLegislatorPosition = legislatorPositions[legislator.name];

    //參選資料
    const candidateData = candidates[peopleId];
    let isCandidate = candidateData;
    let candidateDistrict1, candidateDistrict2;
    if(candidateData){
        candidateDistrict1 = candidateData.districtArea;
        candidateDistrict2 = candidateData.districtNo;
    }
    //


    let date = moment.unix(data.date);
    let question;
    if(issues[cht2url(data.issue)])
       question = issues[cht2url(data.issue)].question;
    if(!data.position) return <div></div>


    /* 立委澄清 */
    let clarification;
    if(data.clarificationContent){
        let clarificationDate = moment.unix(data.clarificationLastUpdate);
        clarification = (
            <div className={styles.clarificationContent}>
              <div className={styles.date}>{clarificationDate.format('YYYY-MM-DD')}</div>
              <div className={styles.contentMain}>{data.clarificationContent}</div>
            </div>
        )
    } else {
        clarification = (
          <div className={styles.clarificationContent}>沒有澄清資訊。</div>
        )
    }

    /* 立委個人資料 */
    const {name, party, partyCht, isCurrent, constituency1, constituency2} = legislator;

    /* 候選人資料 */
    const info = peopleInfo(name, "", constituency1, constituency2, isCandidate, candidateDistrict1, candidateDistrict2);

    //第八屆立委資訊
    let legInfoItem;
    if(info.legislatorTitle && info.legislatorDistrict){//區域立委
        legInfoItem = (
          <p className={styles.legislatorInfo}>第八屆
              <span className={styles.districtLinkSet}>
                  <Link to={`/constituencies/${district2url(constituency1)}/`}
                        className={`${styles.districtLink} ${styles.ia} ${styles.line} ${styles.gray}`}>
                        {info.legislatorDistrictArea}
                  </Link>
                  {
                    (info.legislatorDistrictAreaNo) ? 
                    <Link to={`/constituencies/${district2url(constituency1,constituency2)}/`}
                          className={`${styles.districtLink} ${styles.districtLink} ${styles.ia} ${styles.line} ${styles.gray}`}>
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
            <p className={styles.legislatorInfo}>2016第九屆
                <span className={styles.districtLinkSet}>
                    <Link to={`/constituencies/${district2url(candidateDistrict1)}/`}
                          className={`${styles.districtLink} ${styles.ia} ${styles.line} ${styles.gray}`}>
                          {info.candidateDistrictArea}
                    </Link>
                    { 
                      (info.candidateDistrictAreaNo) ? 
                      <Link to={`/constituencies/${district2url(candidateDistrict1,candidateDistrict2)}/`}
                            className={`${styles.districtLink} ${styles.ia} ${styles.line} ${styles.gray}`}>
                            {info.candidateDistrictAreaNo}
                      </Link>: ""
                    }
                </span>
                      {circleNumber(candidateData.number)}候選人</p>
        </div>);
    }

    let currentIdentity = identity(legislators, peopleId);
    if(currentIdentity.is9thProportional===true){//第八屆立委 && 第九屆不分區
      let parties = legislator.parties;
      let partyCht = parties[parties.length-1].partyCht;

      candidateInfoItem = (
        <p className={styles.legislatorInfo}>
            2016第九屆
            <Link className={`${styles.ia} ${styles.line} ${styles.gray}`}
                  to={`/parties/${cht2eng(partyCht)}/list/`}>{partyCht}不分區</Link>
            立委</p>
        );
      
    }

    /* 來源資料 */
    let lySourceItem = (data.lyURL) ? (
        <div className={styles.lyURL}>
          <a className={`${styles.ia} ${styles.bright}`} href={data.lyURL} target="_blank" >中華民國立法院原始資料</a>
        </div>) : "";
    let otherSourceItem = (data.otherSourceTitle && data.otherSourceURL) ? (
        <div className={styles.lyURL}>
          <a className={`${styles.ia} ${styles.bright}`} href={data.otherSourceURL} target="_blank" >{data.otherSourceTitle}</a>
        </div>) : "";

    let sourceItem = <div>{lySourceItem}{otherSourceItem}</div>;


    const title = `${name}${data.positionJudgement}-沃草2016立委出任務`;
    const description = `${name}${data.positionJudgement}，${name}為${eng2cht(data.party)}立委，為什麼對於${data.issue}採用此戰鬥策略？`;
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
      <div className={styles.form}>
        <div className={styles.issueRow}>
          <div className={styles.issueName}>{data.issue}</div>
          <div className={styles.issueQuestion}>{question}</div>
        </div>

        <div className={styles.peopleRow}>
          <div className={styles.avatar}><PeoplePhoto id={people_name2id(data.legislator)}/></div>
          <div className={styles.profileBlock}>
            
            {candidateInfoItem}
            {legInfoItem}
            
            <div className={styles.avatarName}>
              <Link to={`/people/${peopleId}/records/`} className={`${styles.name} ${styles.ia} ${styles.black} ${styles.big}`}>{data.legislator}</Link>
              <div className={styles.party}>
                <div className={`${styles.partyFlag} ${styles.small} ${styles[data.party]}`}></div>
                <Link to={`/parties/${data.party}/records/`} className={`${styles.partyName} ${styles.ia} ${styles.black}`}>{eng2cht(data.party)}</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.judegementRow}>
          立場判斷
          <div className={`${styles.positionCube} ${styles[data.position]}`}></div>
          {data.positionJudgement}
        </div>

        <div className={styles.recordRow}>
          <div className={styles.content}>
            <div className={styles.contentMeta}>
              <div className={styles.date}>{date.format('YYYY-MM-DD')}</div>
              <div className={styles.category}>{data.category}</div>
              <div className={styles.partyThen}>{(info.isCaucus ? '' : `${data.legislator}為時任${eng2cht(data.party)}立委`)}</div>
            </div>
            <div className={styles.contentMain}>{data.content}</div>
            {sourceItem}
          </div>
        </div>

        <div className={styles.clarifyRow}>
          <div className={styles.content}>
            <div className={styles.clarifyTitle}>委員澄清</div>
            {clarification}
            <div className={styles.clarifyPrompt}>表態立場如有解讀錯誤，歡迎<Link to={`/clarify/`} className={`${styles.ia} ${styles.bright}`}>來函澄清</Link></div>
          </div>
        </div>
      </div>
      <div className={styles.seeOtherIssue}>看看{data.legislator}<br/>在各個議題的表態紀錄⋯</div>
      <IssueGroup id={peopleId} currentLegislatorPosition={currentLegislatorPosition}/>
    </div>

    ); // end of return
  }
}
