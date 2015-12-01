import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';

import PartyProfile from '../../components/PartyProfile/PartyProfile.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';
import PositionSquare from '../../components/PositionSquare/PositionSquare.js';

import eng2url from '../../utils/eng2url';
import eng2cht from '../../utils/eng2cht';
import parseToPartyPosition from '../../utils/parseToPartyPosition';

/*
:category => {"records", "promises", "list"}
歷史紀錄
未來承諾
不分區名單
*/

@connect(
    state => ({
                 legislators: state.legislators,
                 records: state.records,
                 issues: state.issues,
                 parties: state.parties
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class Party extends Component {
  static propTypes = {
      legislators: PropTypes.object.isRequired,
      records: PropTypes.object.isRequired,
      issues: PropTypes.object.isRequired,
      parties: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      this.state = {
        partyPositions: parseToPartyPosition(props.records, props.issues)
      }
  }

  render() {
    const styles = require('./Party.scss');
    const id = this.props.params.partyId;
    const category = this.props.params.category;

    //政黨基本資料
    const {parties} = this.props;
    const currentParty = parties[id];
    
    //content
    let content;

    //SEO
    let title, description;

    switch(category){
      case 'records':
        const {partyPositions} = this.state;
        const currentPartyPositions = partyPositions[id];
        
        if(currentPartyPositions){//有第八屆的資料
            content = <PartyRecords positions={currentPartyPositions.positions} 
                                    id={id}/>
        }else{
            content = <div>無歷史表態紀錄：該政黨在第八屆立法院沒有席次。</div>
        }

        //SEO
        title = `${currentParty.name}議題表態分析-沃草2016立委出任務`;
        description = `${currentParty.name}對於各項重大議題的戰鬥策略大解析！趕快來看看${currentParty.name}委員在立法院針對下列重大議題講了哪些話！`;
    
      break;

      case 'promises':
        content = <PartyPromises id={id} />
      break;

      case 'list':
        /// TODO
      break;
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
          <PartyProfile id={id}/>
          <ul className={styles.innerTag}>
              <li><Link to={`/parties/${id}/records/`} className = { category==="records" ? styles.active : ""}>歷史紀錄</Link></li>
              <li><Link to={`/parties/${id}/promises/`} className = { category==="promises" ? styles.active : ""}>未來承諾</Link></li>
              <li><Link to={`/parties/${id}/list/`} className = { category==="list" ? styles.active : ""}>不分區名單</Link></li>
          </ul>

          <div className={styles.innerWrap}>
            {content}
          </div>
      </div>
    );
  }
}
class PartyRecords extends Component {
    render(){
        const styles = require('./Party.scss');
        const {positions, id} = this.props;
        let result = Object.keys(positions).map((currentIssue, index)=>{
            //console.log(positions[currentIssue])
            let issueUrl = eng2url(currentIssue);
            return (
              <Link to={`/parties/${id}/records/${issueUrl}`}
                className={styles.issueBlock}
                key={index}>
                <PositionSquare issueName={currentIssue} data={positions[currentIssue]}/>
              </Link>
            );
        })

        return <div>{result}</div>

    }
}
function handlePartyPos(value){
  if(value === "none"){
    return "尚未回覆"
  }else{
    return eng2cht(value);
  }
}
@connect(
    state => ({
                 partyPromises: state.partyPromises,
                 issues: state.issues
               }),
    dispatch => bindActionCreators({}, dispatch))
class PartyPromises extends Component {
    render(){
      const styles = require('./Party.scss');
      const {partyPromises, issues, id} = this.props;
      const {positions, bills} = partyPromises[id];
      
      if(!positions){
        return <div></div>
      }
      let postionItems = Object.keys(positions).map((issueName,i)=>{
          let pos = positions[issueName].promise.position;
          let statement = positions[issueName].promise.statement;
          let issueData = issues[eng2url(issueName)];
          return (
              <div className={styles.promiseItem}
                   key={`promiseItem-${id}-${i}`}>
                  <div className={styles.promiseTitle}>{eng2cht(issueName)}</div>
                  <div className={styles.promiseQuestion}>{issueData.question}</div>
                  <div className={styles.promisePos}>
                    <div className={`${styles[pos]} ${styles.promiseIcon}`}></div>
                    <div className={styles.promisePosText}>{handlePartyPos(pos)}</div>
                  </div>
                  <div className={styles.promiseStatement}>{statement}</div>
              </div>
          )
      })
      let billItems = bills.map((value,i)=>{
          return (
              <div className={styles.billItem}
                   key={`billItem-${id}-${i}`}>
                  <div className={styles.billItemTitle}>{i+1}・{value.goal}</div>
                  <div>{value.content || "尚未回覆"}</div>
              </div>
          )
      })
      return (
        <div>
          <div className={styles.sectionTitle}>議題表態</div>
          <div>{postionItems}</div>

          <div className={styles.sectionTitle}>優先法案</div>
          <div>{billItems}</div>
          
          <div className={`${styles.promiseMeta}`}>* 統計更新日期：2015/12/04。
                <Link className={`${styles.ia} ${styles.bright}`} 
                      to={`/about/FAQ/`}>我們如何統計的</Link></div>
        </div>
      )
    }
}
