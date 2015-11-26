import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';

import PartyProfile from '../../components/PartyProfile/PartyProfile.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';
import PositionSquare from '../../components/PositionSquare/PositionSquare.js';

import eng2url from '../../utils/eng2url';
import parseToPartyPosition from '../../utils/parseToPartyPosition';

/*
:category => {"records", "info"}
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

    //SEO
    let title, description;

    switch(category){
      case 'records':
        const {partyPositions} = this.state;
        const currentPartyPositions = partyPositions[id];
        let content;
        if(currentPartyPositions){
            //有第八屆的資料
            const positions = currentPartyPositions.positions;
            // 改用IssueGroup嗎？
            content = Object.keys(positions).map((currentIssue, index)=>{
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

        }else{
            content = <div>無過去表態紀錄：該政黨在第八屆立法院沒有席次。</div>
        }

        //SEO
        title = `${currentParty.name}議題表態分析-沃草2016立委出任務`;
        description = `${currentParty.name}對於各項重大議題的戰鬥策略大解析！趕快來看看${currentParty.name}委員在立法院針對下列重大議題講了哪些話！`;
    

      break;

      case 'info':
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
              <li><Link to={`/parties/${id}/records/`} className = { category==="records" ? styles.active : ""}>紀錄</Link></li>
              <li><Link to={`/parties/${id}/info/`} className = { category==="info" ? styles.active : ""}>資料</Link></li>
          </ul>

          <div className={styles.innerWrap}>
            {content}
          </div>
      </div>
    );
  }
}
