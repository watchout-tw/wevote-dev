import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import IssueController from '../../components/IssueController/IssueController.js';

import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import PositionLegislatorGroup from '../../components/PositionLegislatorGroup/PositionLegislatorGroup.js';
import PositionPartyGroup from '../../components/PositionPartyGroup/PositionPartyGroup.js';
import IssueArticle from '../../components/IssueArticle/IssueArticle.js';

import {getAllRecords} from '../../ducks/records';
import parseToPartyView from '../../utils/parseToPartyView';
import parseToLegislatorView from '../../utils/parseToLegislatorView';
import parseToPositionView from '../../utils/parseToPositionView';

import {loadRecords} from '../../ducks/records.js';

@connect(
    state => ({ 
      records: state.records.data,
      issues: state.issues,
      parties: state.parties
    }),
    dispatch => bindActionCreators({loadRecords}, dispatch))

export default class IssueFigure extends Component {
    constructor(props){ super(props)
      this.state = {
        userPosition: {
             "marriage-equality" : "none",
             "recall" : "none",
             "referendum" : "none",
             "nuclear-power" : "none",
             "course-guide" : "none",
             "justice-reform" : "none"
        },
        recordsLoaded: false,
        partyView: "",
        legislatorView: "",
        positionView: ""
      }
    }
    componentWillMount(){
      this.props.loadRecords();
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.records){
          const {issues} = this.props;
          this.setState({
              recordsLoaded: true,
              partyView: parseToPartyView(nextProps.records.value, issues),
              legislatorView: parseToLegislatorView(nextProps.records.value, issues),
              positionView: parseToPositionView(nextProps.records.value, issues),
          })
      }
    }
    componentDidMount(){
        // Get user position from local Storage
        if(window){
            const {currentIssueName} = this.props;
            let value = currentIssueName + "-userPosition"
            let position =  window.localStorage.getItem(value);
            if(["aye","nay"].indexOf(position)!==-1){
                let {userPosition} = this.state;
                userPosition[currentIssueName] = position;
                this.setState({
                   userPosition: userPosition
                })
            }
        }
    }

   
    render(){
      const {recordsLoaded} = this.state;
      if(!recordsLoaded) return <div style={{textAlign: 'center'}}>Loading...</div>

      const styles = require('./IssueFigure.scss');  
      const {currentView, currentIssue, currentIssueName, setCurrentView} = this.props;
      const {parties} = this.props;
      const {partyView, legislatorView, positionView, userPosition} = this.state;

      if(!partyView[currentIssue.titleEng]) return <div></div>
      if(!legislatorView[currentIssue.titleEng]) return <div></div>
      if(!positionView[currentIssue.titleEng]) return <div></div>
     
      // 結果圖表

      // 1. 看政黨
      const currentPartyView = partyView[currentIssue.titleEng];
      let partyPositionGroups = currentPartyView.partyPositions.map((value, index)=>{
          let maxCount = currentPartyView.maxCount;
          return <PartyPositionGroup data={value} 
                                     maxCount={maxCount}
                                     issueStatement={currentPartyView.statement} 
                                     issueURL={currentIssueName}
                                     userPosition={userPosition[currentIssueName]}
                                     parties={parties}
                                     key={index} />;
      });
  
  
      // 2. 看立委
      const currentLegislatorView = legislatorView[currentIssue.titleEng];
      let positionLegislatorGroups = currentLegislatorView.positions.map((value, index)=>{
          return <PositionLegislatorGroup data={value} 
                                          issueStatement={currentPartyView.statement} 
                                          issueURL={currentIssueName}
                                          userPosition={userPosition[currentIssueName]}
                                          parties={parties}
                                          key={index}/>;
      });
  
      // 3. 看表態
      const currentPositionView = positionView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料
      let maxCount = currentPositionView.maxCount;
      let positionPartyGroups = currentPositionView.positions.map((value, index)=>{
          //console.log(value);
          return <PositionPartyGroup data={value} 
                                     maxCount={maxCount}
                                     issueStatement={currentPartyView.statement}
                                     issueURL={currentIssueName}
                                     userPosition={userPosition[currentIssueName]}
                                     parties={parties}
                                     key={index} />;
      });
  
      let currentViewGroups, currentViewStatement;
      let hints = ['誠心推薦你在電腦上閱讀','講個祕訣：用電腦，看更多！'];
      let ran = Date.now()%2;
      let hintRandom = hints[ran];
     
      switch(currentView){
        case 'parties': 
          currentViewStatement = `${currentIssue.statement}，政黨的態度是？`;
          currentViewGroups = (
            <div>
              <div>{partyPositionGroups}</div>
              <div className={styles.mobileHint}>{hintRandom}</div>
            </div>);
          break;
        case 'legislators':
          currentViewStatement = `${currentIssue.statement}，委員的態度是？`;
          currentViewGroups = positionLegislatorGroups;
          break;
        case 'positions':
          currentViewStatement = `${currentIssue.statement}，委員有哪些具體表態行動？`;
          currentViewGroups = (
          <div>
            <div>{positionPartyGroups}</div>
            <div className={styles.mobileHint}>{hintRandom}</div>
          </div>);
          break;
        case 'analysis':
          currentViewStatement = `${currentIssue.statement}，數據告訴我們哪些事？`;
          currentViewGroups = <IssueArticle issue={currentIssue.titleEng} />
          break;
        
        default:
          currentViewGroups = partyPositionGroups;
        
      }

     

      return (
          <div>
              <div className={styles.figHeader} id="view">
                  
                  <div className={styles.issueBlock}>
                      <div className={styles.issueTitle}>{currentIssue.title}</div>  
                  </div>

                  <div className={styles.issueController}>
                    <IssueController currentIssue={currentIssue} 
                                     currentView={currentView}
                                     setCurrentView={setCurrentView}/>
                  </div>

                  <div className={styles.issueStatement}>{currentViewStatement}</div>
                  
              </div>
    
              <div className={styles.records}>
                  {currentViewGroups}
              </div>
          </div>
          );

     
    }
}