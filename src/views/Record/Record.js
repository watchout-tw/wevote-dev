import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';
import moment from 'moment';

import cht2url from '../../utils/cht2url';
import people_name2id from '../../utils/people_name2id';
import eng2cht from '../../utils/eng2cht';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';

@connect(
    state => ({legislators: state.legislators,
               issues: state.issues,
               records: state.records
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class Record extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired,
      records: PropTypes.object.isRequired,
      legislators: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      this.state = {
        legislatorPositions: parseToLegislatorPosition(props.records, props.issues, props.legislators)
      }
  }

  render() {
    const styles = require('./Record.scss');
    const {records, issues, legislators} = this.props;
    const recordId = this.props.params.recordId;

    const data = records[recordId];

    const legislatorId = people_name2id(data.legislator);
    const legislator = legislators[legislatorId];

    const {legislatorPositions} = this.state;
    const currentLegislatorPosition = legislatorPositions[legislator.name];


    let date = moment.unix(data.date);
    let question;
    if(issues[cht2url(data.issue)])
       question = issues[cht2url(data.issue)].question;
    if(!data.position) return <div></div>

    let clarification;
    if(data.clarificationContent){
        clarification = (
          <div className={styles.clarificationContent}>
            {data.clarificationLastUpdate}
            {data.clarificationContent}
          </div>
        )
    } else {
        clarification = (
          <div className={styles.clarificationContent}>沒有澄清資訊。</div>
        )
    }

    /* 立委個人資料 */
    let {name, party, partyCht, gender, age, isCurrent, constituency1, constituency2,
         isCandidate, candidateConstituency1, candidateConstituency2} = legislator;

    if(constituency2 === "N/A")
        constituency2 = "";
    else
        constituency2 =  `第${constituency2}選區`;

    if(candidateConstituency2 === "N/A")
        candidateConstituency2 = "";
    else
        candidateConstituency2 = `第${candidateConstituency2}選區`;

    let currentInfo;
    if(isCurrent){
      currentInfo = <div className={styles.isCurrent}>第八屆立委</div>;
    }

    let candidateInfo;
    if(isCandidate === true){
      candidateInfo = <div className={styles.isCandidate}>{`2016第九屆${candidateConstituency1}${candidateConstituency2}立委候選人`}</div>;
    }

    return (

<div className={styles.wrap}>
  <div className={styles.form}>
    <div className={styles.issueRow}>
      <div className={styles.issueName}>{data.issue}</div>
      <div className={styles.issueQuestion}>{question}</div>
    </div>

    <div className={styles.peopleRow}>
      <div className={styles.avatar}><PeoplePhoto id={people_name2id(data.legislator)}/></div>
      <div className={styles.profileBlock}>
        {currentInfo}
        {candidateInfo}
        <div className={styles.avatarName}>
          <div className={`${styles.partyFlag} ${styles[data.party]}`}></div>
          <Link to={`/people/${legislatorId}/records/`} className={`${styles.name} ${styles.ia} ${styles.black} ${styles.big}`}>{data.legislator}</Link>
        </div>
      </div>
    </div>
    <div className={styles.judegementRow}>
      立場判斷
      <div className={` ${styles.positionCube} ${styles[data.position]}`}></div>
      {data.positionJudgement}
    </div>

    <div className={styles.recordRow}>
      <div className={styles.content}>
        <div className={styles.contentMeta}>
          <div className={styles.date}>{date.format('YYYY-MM-DD')}</div>
          <div className={styles.category}>{data.category}</div>
          <div className={styles.partyThen}>{`時任${eng2cht(data.party)}立委`}</div>
        </div>
        <div className={styles.contentMain}>{data.content}</div>
        <div className={styles.lyURL}><Link className={`${styles.ia} ${styles.bright}`} to={data.lyURL} target="_blank" >中華民國立法院原始資料</Link></div>
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
  <IssueGroup id={legislatorId} currentLegislatorPosition={currentLegislatorPosition}/>
</div>

    ); // end of return
  }
}

 /*
    category: "發言"
    clarificationContent: ""
    clarificationLastUpdate: ""
    content: "本院黃委員昭順，針對近日同性婚姻合法化爭議，xxxx"
    date: 1336665600
    id: 1
    issue: "婚姻平權"
    legislator: "黃昭順"
    lyURL: "http://lci.ly.gov.tw/LyLCEW/communique1/final/pdf/101/32/LCIDC01_1013201.pdf"
    meeting: "院會"
    meetingCategory: "院會書面質詢"
    party: "KMT"
    position: "aye"
    positionJudgement: "贊成同性婚姻合法化"
    */
