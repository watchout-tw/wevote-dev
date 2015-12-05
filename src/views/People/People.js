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
                 candidates: state.candidates,
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
      //console.log(parseToLegislatorPosition(props.records, props.issues, props.legislators))
  }
  render() {
    const styles = require('./People.scss');
    
    const id = this.props.params.peopleId;
    const {legislators, candidates} = this.props;
    let name;
    if(legislators[id]){
      name = legislators[id].name;
    }else{
      name = candidates[id].name;
    }
    
    const {legislatorPositions} = this.state;
    const currentLegislatorPosition = legislatorPositions[name];
    
    const title = `${name}戰鬥策略分析-沃草2016立委出任務`;
    const description = `${name}對於各項重大議題之城的戰鬥策略大解析！趕快來看看${name}在立法院針對下列重大議題說了些什麽！`;
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
          <PeopleProfile id={id} />
          <IssueGroup id={id} currentLegislatorPosition={currentLegislatorPosition}/>
      </div>
    );
  }
}
