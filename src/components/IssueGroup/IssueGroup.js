import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';
import PositionSquare from '../../components/PositionSquare/PositionSquare.js';

import eng2url from '../../utils/eng2url';

export default class IssueGroup extends Component {
  render() {
    const styles = require('./IssueGroup.scss');
    const id = this.props.id;
    const {currentLegislatorPosition} = this.props;
    if(!currentLegislatorPosition)//候選人沒有這個圖表
        return <div></div>

    const {name, positions} = currentLegislatorPosition;

    if(!positions)
        return <div></div>

    let issueGroups = Object.keys(positions).map((currentIssue, index)=>{

        let issueUrl = eng2url(currentIssue);
        return (
                <Link to={`/people/${id}/records/${issueUrl}`}
                      className={styles.issueBlock}
                      key={index} >
                    <PositionSquare issueName={currentIssue}
                                         data={positions[currentIssue]}/>
                </Link>)
    })

    return (
      <div className={styles.wrap}>
          <div className={styles.issueWrap}>{issueGroups}</div>
      </div>
    );
  }
}
