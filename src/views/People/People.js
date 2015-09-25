import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';

import eng2url from '../../utils/eng2url';

@connect(
    state => ({legislators: state.legislators
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class People extends Component {
  
  render() {
    const styles = require('./People.scss');
    const id = this.props.params.peopleId;
    const name = this.props.legislators[id].name;
  
    const metaData = {
      title: `${name}議題表態分析-立委出任務`,
      description: `${name}對於各項重大議題的表態大解析！趕快來看看${name}在立法院針對下列重大議題有哪些發言！`,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': `${name}議題表態分析-立委出任務`,
            'og:description': `${name}對於各項重大議題的表態大解析！趕快來看看${name}在立法院針對下列重大議題有哪些發言！`
          }
      }
     
    };

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <PeopleProfile id={id} />
          <IssueGroup id={id} />
      </div>
    );
  }
}
