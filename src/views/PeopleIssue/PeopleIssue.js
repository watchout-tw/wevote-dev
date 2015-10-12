import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';
import PositionSquare from '../../components/PositionSquare/PositionSquare.js';
import RecordTable from '../../components/RecordTable/RecordTable.js';

import url2eng from '../../utils/url2eng';
import eng2cht from '../../utils/eng2cht';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';

@connect(
    state => ({
                  legislators: state.legislators,
                  records: state.records,
                  issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class PeopleIssue extends Component {
  static propTypes = {
      legislators: PropTypes.object.isRequired,
      records: PropTypes.object.isRequired,
      issues: PropTypes.object.isRequired
  }
  //設定 initial state
  constructor(props) { super(props)
      this.state = {
          showMenu: false,
          legislatorPositions: parseToLegislatorPosition(props.records, props.issues, props.legislators)
      }
  }
  _toggleMenu(){  
    this.setState({ showMenu: !this.state.showMenu });
  }
 
  render() {
    const styles = require('./PeopleIssue.scss');
    const id = this.props.params.peopleId;
    const issueURL = this.props.params.issueName;

    const {issues, legislators} = this.props;
    const issue = issues[issueURL];
    const {showMenu} = this.state;

    const issueDataName = url2eng(issueURL);
    const issueName = eng2cht(issueURL);

    const legislator = legislators[id];
    const {name, partyCht} = legislator;

    const {legislatorPositions} = this.state;
    const currentLegislatorPosition = legislatorPositions[name];

    const positions = currentLegislatorPosition.positions[issueDataName];
    const {dominantPosition} = positions;
  
    let issueMenu = (showMenu===true) ? (Object.keys(issues).map((currentIssueName,i)=>{
        let active = (issueURL === currentIssueName) ? styles.menuActive : "";
        
        /// Refine 拿數字的方法
        let dataName = issues[currentIssueName].titleEng;
        let recordsCount = currentLegislatorPosition.positions[dataName].totalCounts;
        return  <Link className={` ${styles.menu} ${active}`}
                      to={`/people/${id}/records/${currentIssueName}`} 
                      key={i}>
                {`${issues[currentIssueName].title}(${recordsCount})`}
                </Link>;
        
    })) : "";

    

    /* SEO */

    let description;
    
    switch(dominantPosition){
      case 'unknown':
      description = `${name}對${issue.statement}立場模糊，${name}為${partyCht}立委，為什麼在${issue.statement}上立場模糊？`;
      break;
      
      case 'none':
      description = `${name}沒有針對${issue.statement}的表態資料，${name}為${partyCht}立委，為什麼在${issue.statement}上沒有表態？`;
      break
      
      default://aye, nay
      description = `${name}${eng2cht(dominantPosition)}${issue.statement}，${name}為${partyCht}立委，為什麼${eng2cht(dominantPosition)}${issue.statement}？`;

    }
    
    const title = `${name}對於${issueName}的表態-沃草2016立委出任務`;
    
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
    
          <div className={styles.main}>
              <div className={styles.summary}> 
                  <PositionSquare issueName={issueDataName}
                                  data={positions} />
                  <div className={styles.menuBlock}>
                      <div className={styles.menuTitle}
                           onClick={this._toggleMenu.bind(this)}>更換議題</div>
                      {issueMenu}
                  </div>
              </div>
              <div className={styles.table}>
                  <RecordTable data={positions}/> 
              </div>

          </div>
      </div>
    );
  }
}
