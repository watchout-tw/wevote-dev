import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import Slideshow from '../../components/Slideshow/Slideshow.js';

import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import PositionLegislatorGroup from '../../components/PositionLegislatorGroup/PositionLegislatorGroup.js';
import PositionPartyGroup from '../../components/PositionPartyGroup/PositionPartyGroup.js';

import IssueController from '../../components/IssueController/IssueController.js';

import PositionRecord from '../../components/PositionRecord/PositionRecord.js';

const VIEW_PARTY = 'VIEW_PARTY';
const VIEW_LEGISLATOR = 'VIEW_LEGISLATOR';
const VIEW_POSITION = 'VIEW_POSITION';

@connect(
    state => ({
                issues: state.issues,
                partyView: state.partyView,
                legislatorView: state.legislatorView,
                positionView: state.positionView
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  static propTypes = {
     issues: PropTypes.object.isRequired,
     partyView: PropTypes.object.isRequired,
     legislatorView: PropTypes.object.isRequired,
     positionView: PropTypes.object.isRequired
  }

  constructor(props) { super(props)
    this.state = {
        activeRecord: "",
        activeLegislator: "",
    }
  }

  _setToActiveRecord(value, event){
      this.setState({ activeRecord: value });
  }
  _resetActiveRecord(){
      this.setState({ activeRecord: "" });
  }

  _setToActiveLegislator(value, event){
      this.setState({ activeLegislator: value });
  }
  _resetActiveLegislator(){
      this.setState({ activeLegislator: "" });
  }

  render() {
    const styles = require('./Issue.scss');

    const {issues, partyView, legislatorView, positionView} = this.props;
    const {activeRecord, activeLegislator, isLocked} = this.state;

    /* 從 URL 知道現在讀的議題頁面 */
    const currentIssueName = this.props.params.issueName;
    const currentView = this.props.params.view || "parties";
    // parties, legislators, positions
    // default set to parties

    const currentIssue = issues[currentIssueName]//只拿目前頁面議題的議題基本資料，maybe refine to ducks/select later on


    let bindSetToActiveRecord = this._setToActiveRecord.bind(this);
    let bindResetActiveRecord = this._resetActiveRecord.bind(this);

    let bindSetToActiveLegislator = this._setToActiveLegislator.bind(this);
    let bindResetActiveLegislator = this._resetActiveLegislator.bind(this);


    /* 1. 看政黨 */
    const currentPartyView = partyView[currentIssue.titleEng];
    let partyPositionGroups = currentPartyView.partyPositions.map((value, index)=>{
        //console.log(value);
        return <PartyPositionGroup data={value} issueId={currentIssueName}
                                   issueStatement={currentPartyView.statement} key={index}
                                   setToActiveRecord={bindSetToActiveRecord}
                                   resetActiveRecord={bindResetActiveRecord}
                                   activeRecord={activeRecord} />;
    });


    /* 2. 看立委 */
    const currentLegislatorView = legislatorView[currentIssue.titleEng];
    let positionLegislatorGroups = currentLegislatorView.positions.map((value, index)=>{
        return <PositionLegislatorGroup data={value} issueStatement={currentPartyView.statement} key={index}
                                        setToActiveLegislator={bindSetToActiveLegislator}
                                        resetActiveLegislator={bindResetActiveLegislator}
                                        activeLegislator={activeLegislator}
                                        currentIssueName={currentIssueName}/>;
    });

    /* 3. 看表態 */
    const currentPositionView = positionView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料
    let positionPartyGroups = currentPositionView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionPartyGroup data={value} issueStatement={currentPartyView.statement} key={index}
                                   setToActiveRecord={bindSetToActiveRecord}
                                   resetActiveRecord={bindResetActiveRecord}
                                   activeRecord={activeRecord} />;
    });

    let currentViewGroups, currentViewStatement;

    switch(currentView){
      case 'parties': 
        currentViewStatement = `${currentIssue.statement}，政黨的態度是？`;
        currentViewGroups = partyPositionGroups;
        break;
      case 'legislators':
        currentViewStatement = `${currentIssue.statement}，委員的態度是？`;
        currentViewGroups = positionLegislatorGroups;
        break;
      case 'positions':
        currentViewStatement = `${currentIssue.statement}，委員有哪些具體表態行動？`;
        currentViewGroups = positionPartyGroups;
        break;
      
      default:
        currentViewGroups = partyPositionGroups;
      
    }

    const metaData = {
      title: `${currentIssue.title}-${currentIssue.question}-2016立委求職中`,
      description: currentIssue.description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': `${currentIssue.title}-${currentIssue.question}-2016立委求職中`,
            'og:description': currentIssue.description
          }
      }
     
    };

    /* 協力 NGO */
    const { collaborators } = currentIssue;
    let collaboratorItems = collaborators.map((ngo, index)=>{
        return <a className={styles.link}
                  href={ngo.link}
                  target="_blank"
                  key={index}>{ngo.name}</a>
    });


    /* 其他議題列表 */
    let otherIssues = Object.keys(issues).map((current_issue, index)=>{
      if(currentIssue.title !== issues[current_issue].title){
      return <Link to={`/issues/${current_issue}`}
                   key={index}
                   className={styles.linkButton}>{issues[current_issue].title}</Link>
      }
    })


    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          
          <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>

          <div className={styles.innerWrap}>
              <div className={styles.figHeader}>
                  <div className={styles.issueBlock}>
                      <div className={styles.issueTitle}>{currentIssue.title}</div>
                      <div className={styles.issueStatement}>{currentViewStatement}</div>
                  </div>
                  
                  <div className={styles.issueController}>
                    <IssueController currentIssue={currentIssue} currentView={currentView}/>
                  </div>
              </div>
    
              <div className={styles.records}>
                  {currentViewGroups}
              </div>

              <div className={styles.collaboratorInfo}>
                本議題協力NGO：{collaboratorItems}
              </div>
              
              <div className={styles.moreInfo}>
                <div className={styles.moreInfoInner}>
                    <div>想了解其他議題嗎？{otherIssues}</div>
                    <div>想知道2016你的選區候選人對這個議題的表態嗎？<div className={styles.comingButton}>coming soon</div></div>
                    <div>想知道各政黨對其他議題的表態嗎？<div className={styles.comingButton}>coming soon</div></div>
                </div>
              </div>

          </div>

      </div>
    );
  }
}
