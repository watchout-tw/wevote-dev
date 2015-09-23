import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';
import moment from 'moment';

import {setIdFilter} from '../../ducks/records';

import cht2url from '../../utils/cht2url';
import people_name2id from '../../utils/people_name2id';
import eng2cht from '../../utils/eng2cht';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';

@connect(
    state => ({legislators: state.legislators,
               issues: state.issues,
               records: state.records
               }),
    dispatch => bindActionCreators({setIdFilter}, dispatch))

export default class Record extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired,
      setIdFilter: PropTypes.func.isRequired,
      records: PropTypes.object.isRequired
  }
  componentWillMount(){
      const id = this.props.params.recordId;
      const { setIdFilter } = this.props;
      setIdFilter(id);
  }
  componentWillReceiveProps(nextProps){
      
      const id = this.props.params.recordId;
      const nextId = nextProps.params.recordId;

      if(id !== nextId){
          const { setIdFilter } = this.props;
          setIdFilter(id);
      }

  }
  render() {
    const styles = require('./Record.scss');
    const {records, issues, legislators} = this.props;
    const data = records.data;

    const legislatorId = people_name2id(data.legislator);
    const legislator = legislators[legislatorId];

    let date = moment.unix(data.date);

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
    
    }else{
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
      candidateInfo = <div className={styles.isCandidate}>{` 2016 ${candidateConstituency1} ${candidateConstituency2} 立委候選人`}</div>;
    }

    return (
      <div className={styles.wrap}>
      
      <div className={styles.form}>
         
         
         <div className={styles.issueRow}>
              <div className={styles.issueName}>{data.issue}</div>
              <div className={styles.issueQuestion}>{question}</div>
         </div>    
         
         <div className={styles.peopleRow}>
            <div className={styles.avatar}>
              <PeoplePhoto id={people_name2id(data.legislator)}/>
            </div>

            <div className={styles.profileBlock}>
                {currentInfo}
                {candidateInfo}
                <div className={styles.avatarName}>
                      <div className={` ${styles["party-flag"]} ${styles[data.party]} `}></div>
                      {data.legislator}
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
                </div>
                <div className={styles.contentMain}>{data.content}</div>
                <div className={styles.partyThen}>{`（時任${eng2cht(data.party)}立委）`}</div>
            </div>
            <a className={styles.lyURL}
               href={data.lyURL}
               target="_blank" >中華民國立法院原始資料</a>
         </div>

         <div className={styles.clarifyRow}>
            <div className={styles.clarifyTitle}>委員澄清</div>

         </div>
         {clarification}
         <Link to={`/clarify`} className={styles.clarifyButton}>表態立場如果有解讀錯誤，歡迎委員來函澄清</Link>

      </div>
          <Link className={styles.button}
                to={`/people/${people_name2id(data.legislator)}/${cht2url(data.issue)}`}>
                看{data.legislator}在{data.issue}的所有表態
          </Link>
      </div>
    );
  }
}
