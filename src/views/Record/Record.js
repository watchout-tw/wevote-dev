import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import moment from 'moment';

import cht2url from '../../utils/cht2url';
import people_name2id from '../../utils/people_name2id';
import eng2cht from '../../utils/eng2cht';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import peopleInfo from '../../utils/peopleInfo';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';

import getRecords from '../../data/getRecords';
const records = getRecords();

@connect(
    state => ({
      legislators: state.legislators,
      issues: state.issues
    }),
    dispatch => bindActionCreators({}, dispatch))

export default class Record extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired,
      legislators: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      this.state = {
        legislatorPositions: parseToLegislatorPosition(records, props.issues, props.legislators)
      }
  }
  componentDidMount(){
      document.body.scrollTop = 0;
  }

  render() {
    const styles = require('./Record.scss');
    const {issues, legislators} = this.props;
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
    const {name, party, partyCht, gender, age, isCurrent, constituency1, constituency2,
         isCandidate, candidateConstituency1, candidateConstituency2} = legislator;
    const info = peopleInfo(name, age, constituency1, constituency2, isCandidate, candidateConstituency1, candidateConstituency2);

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
            <div className={styles.isCurrent}>{info.legislatorTitle}</div>
            <div className={styles.isCandidate}>{info.candidateTitle}</div>
            <div className={styles.avatarName}>
              <Link to={`/people/${legislatorId}/records/`} className={`${styles.name} ${styles.ia} ${styles.black} ${styles.big}`}>{data.legislator}</Link>
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
      <IssueGroup id={legislatorId} currentLegislatorPosition={currentLegislatorPosition}/>
    </div>

    ); // end of return
  }
}
