import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';

import eng2url from '../../utils/eng2url';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';

@connect(
    state => ({  
                 legislators: state.legislators,
                 records: state.records,
                 issues: state.issues
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class People extends Component {
  static propTypes = {
      legislators: PropTypes.object.isRequired,
      records: PropTypes.object.isRequired,
      issues: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      this.state = {
        legislatorPositions: parseToLegislatorPosition(props.records, props.issues, props.legislators)
      }
  }
  render() {
    const styles = require('./People.scss');
    const id = this.props.params.peopleId;
    const name = this.props.legislators[id].name;
    const {legislatorPositions} = this.state;
    const currentLegislatorPosition = legislatorPositions[name];
  
    const metaData = {
      title: `${name}議題表態分析-立委出任務`,
      description: `${name}對於各項重大議題的表態大解析！趕快來看看${name}在立法院針對下列重大議題有哪些發言！`,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': `${name}議題表態分析-立委出任務`,
            'og:description': `${name}對於各項重大議題的表態大解析！趕快來看看${name}在立法院針對下列重大議題有哪些發言！`,
            'og:type' : 'website'
          }
      }
     
    };

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <PeopleProfile id={id} />
          <IssueGroup id={id} currentLegislatorPosition={currentLegislatorPosition}/>
      </div>
    );
  }
}
