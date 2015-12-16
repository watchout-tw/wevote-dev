import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import classnames from 'classnames';

import PartyProfile from '../../components/PartyProfile/PartyProfile.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';
import PositionSquare from '../../components/PositionSquare/PositionSquare.js';
import Promises from '../../components/Promises/Promises.js';
import PartyBuns from '../../components/PartyBuns/PartyBuns.js';

import eng2url from '../../utils/eng2url';
import eng2cht from '../../utils/eng2cht';
import people_name2id from '../../utils/people_name2id';
import is8thLegislator from '../../utils/is8thLegislator';
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
                 parties: state.parties,
                 partyPromises: state.partyPromises
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class Party extends Component {
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
        const {partyPromises} = this.props;
        let promises = partyPromises[id];
        content = <Promises id={id} promises={promises}/>

        title = `${eng2cht(id)}對於議題與法案的未來承諾-沃草2016立委出任務`;
        description = `${eng2cht(id)}的未來承諾大公開！趕快來看看${eng2cht(id)}各項重大議題的戰鬥策略與優先法案的戰鬥目標！`;
    
      break;

      case 'list':
        content = <PartyBlock id={id} />

        title = `${eng2cht(id)}不分區名單完整公開-沃草2016立委出任務`;
        description = `${eng2cht(id)}的不分區名單完整公開！你不能錯過的${eng2cht(id)}參戰勇者介紹！`;
    
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
              <li><Link to={`/parties/${id}/records/`} 
                        className={ category==="records" ? styles.active : ""}>歷史紀錄</Link></li>
              <li><Link to={`/parties/${id}/promises/`} 
                        className={ category==="promises" ? styles.active : ""}>未來承諾</Link></li>
              <li><Link to={`/parties/${id}/list/`} 
                        className={ category==="list" ? styles.active : ""}>不分區名單</Link></li>
          </ul>

          <div className={styles.innerWrap}>
            {content}
          </div>
          <div className={styles.bottomWrap}>
            <h2>看其他政黨</h2>
            <PartyBuns category={category} />
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

@connect(
    state => ({
                 partyBlock: state.partyBlock
               }),
    dispatch => bindActionCreators({}, dispatch))
class PartyBlock extends Component {
    render(){
      const styles = require('./Party.scss');
      const {partyBlock, id} = this.props;
      const party = partyBlock[id];
      if(!party) return <div></div>

      
      let peopleItems = party.list.map((value,i)=>{

          //如果是第八屆候選人，連到他的個人頁面
          let nameLink;
          let is8th = is8thLegislator(value.name);
          let nameItem = (is8th === true) ? (
              <Link className={`${styles.pbName} ${styles.ia} ${styles.bright}`} 
                    to={`/people/${people_name2id(value.name)}/records/`}>
                    {value.name}
              </Link>
          ) : (
              <span className={styles.pbName}>{value.name}</span>
          );

          // item class
          let itemClasses = classnames({
            [styles.pbItem] : true,
            [styles.current] :is8th === true
          })

          return (
            <div className={itemClasses}
                 key={`pb-${i}`}>
                <div>
                    <span className={styles.pbCount}>{i+1}</span>・{nameItem}</div>
                <div className={styles.pbInfo}>{value.info}</div>
            </div>
          )
      })
      return (
        <div className={styles.partyBlockWrap}>
          <div className={styles.metaInfo}>姓名前有<span className={styles.metaIcon}></span>方塊標示者，為現任立委</div>
          {peopleItems}
        </div>
      )
    }
}