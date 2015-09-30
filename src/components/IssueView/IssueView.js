import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import IssueController from '../../components/IssueController/IssueController.js';

import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import PositionLegislatorGroup from '../../components/PositionLegislatorGroup/PositionLegislatorGroup.js';
import PositionPartyGroup from '../../components/PositionPartyGroup/PositionPartyGroup.js';


@connect(
    state => ({
                partyView: state.partyView,
                legislatorView: state.legislatorView,
                positionView: state.positionView
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class IssueView extends Component {
    static propTypes = {
      partyView: PropTypes.object.isRequired,
      legislatorView: PropTypes.object.isRequired,
      positionView: PropTypes.object.isRequired
    }
   
    render(){
      const styles = require('./IssueView.scss');  
      const {currentView, currentIssue, currentIssueName, 
             partyView, legislatorView, positionView,
             handleSeeOthers,
             handleBackStage} = this.props;

     

      // 結果圖表

      // 1. 看政黨
      const currentPartyView = partyView[currentIssue.titleEng];
      let partyPositionGroups = currentPartyView.partyPositions.map((value, index)=>{
          //console.log(value);
          return <PartyPositionGroup data={value} 
                                     issueId={currentIssueName}
                                     issueStatement={currentPartyView.statement} 
                                     key={index} />;
      });
  
  
      // 2. 看立委
      const currentLegislatorView = legislatorView[currentIssue.titleEng];
      let positionLegislatorGroups = currentLegislatorView.positions.map((value, index)=>{
          return <PositionLegislatorGroup data={value} 
                                          issueStatement={currentPartyView.statement} 
                                          key={index}
                                          currentIssueName={currentIssueName}/>;
      });
  
      // 3. 看表態
      const currentPositionView = positionView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料
      let positionPartyGroups = currentPositionView.positions.map((value, index)=>{
          //console.log(value);
          return <PositionPartyGroup data={value} 
                                     issueStatement={currentPartyView.statement}
                                     key={index} />;
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

      // 協力 NGO
      const { collaborators } = currentIssue;
      let collaboratorItems = collaborators.map((ngo, index)=>{
          return <a className={styles.link}
                    href={ngo.link}
                    target="_blank"
                    key={index}>{ngo.name}</a>
      });

      return (
          <div>
              
              <div className={styles.figHeader} id="view">
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

              
          </div>
          );

     
    }
}