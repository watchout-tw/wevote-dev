import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import PartyProfile from '../../components/PartyProfile/PartyProfile.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';
import PositionSquare from '../../components/PositionSquare/PositionSquare.js';

import eng2url from '../../utils/eng2url';
import parseToPartyPosition from '../../utils/parseToPartyPosition';

@connect(
    state => ({
                 legislators: state.legislators,
                 records: state.records,
                 issues: state.issues
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class Party extends Component {
  static propTypes = {
      legislators: PropTypes.object.isRequired,
      records: PropTypes.object.isRequired,
      issues: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      this.state = {
        partyPositions: parseToPartyPosition(props.records, props.issues)
      }
  }

  render() {
    const styles = require('./Party.scss');
    const id = this.props.params.partyId;
    const {partyPositions} = this.state;

    const currentPartyPositions = partyPositions[id];
    const positions = currentPartyPositions.positions || {};

    let issueGroups = Object.keys(positions).map((currentIssue, index)=>{
        //console.log(positions[currentIssue])
        let issueUrl = eng2url(currentIssue);
        return (
          <Link to={`/parties/${id}/${issueUrl }`}
            className={styles.issueBlock}
            key={index}>
            <PositionSquare issueName={currentIssue} data={positions[currentIssue]}/>
          </Link>
        );
    })
    // 改用IssueGroup嗎？

    const title = `${currentPartyPositions.name}議題表態分析-2016立委出任務`;
    const description = `${currentPartyPositions.name}對於各項重大議題的攻城策略大解析！趕快來看看${currentPartyPositions.name}委員在立法院針對下列重大議題講了哪些話！`;
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
          <div className={styles.issueWrap}>
            {issueGroups}
          </div>
      </div>
    );
  }
}
