import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
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
                positionView: state.positionView,
                issueController: state.issueController
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  static propTypes = {
     issues: PropTypes.object.isRequired,
     partyView: PropTypes.object.isRequired,
     legislatorView: PropTypes.object.isRequired,
     positionView: PropTypes.object.isRequired,
     issueController: PropTypes.object.isRequired
  }

  constructor(props) { super(props)
    this.state = {
        activeRecords: [],
        activeLegislator: ""
    }
  }
  
  _setActiveRecord(records, event){
    this.setState({ activeRecords: records});
  }

  _setActiveLegislator(name, event){
    this.setState({ activeLegislator: name});
  }

  render() {
    const styles = require('./Issue.scss');

    const {issues, partyView, legislatorView, positionView, issueController} = this.props;
    const {activeRecords, activeLegislator} = this.state;
   
    const currentIssueName = this.props.params.issueName;/* 從 URL 知道現在讀的議題頁面 */

    const currentIssue = issues[currentIssueName]//只拿目前頁面議題的議題基本資料，maybe refine to ducks/select later on
  


    let bindSetActiveRecord = this._setActiveRecord.bind(this);
    let bindSetActiveLegislator = this._setActiveLegislator.bind(this);

    /* 1. 看政黨 */
    const currentPartyView = partyView[currentIssue.titleEng];
    let partyPositionGroups = currentPartyView.partyPositions.map((value, index)=>{
        //console.log(value);
        return <PartyPositionGroup data={value} issueStatement={currentPartyView.statement} key={index}
                                   setToActiveRecord={bindSetActiveRecord}
                                   activeRecords={activeRecords} />;
    });


    /* 2. 看立委 */
    const currentLegislatorView = legislatorView[currentIssue.titleEng];
    let positionLegislatorGroups = currentLegislatorView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionLegislatorGroup data={value} issueStatement={currentPartyView.statement} key={index}
                                        setToActiveRecord={bindSetActiveRecord}
                                        setToActiveLegislator={bindSetActiveLegislator}
                                        activeLegislator={activeLegislator}/>;
    });

    /* 3. 看表態 */
    const currentPositionView = positionView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料
    let positionPartyGroups = currentPositionView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionPartyGroup data={value} issueStatement={currentPartyView.statement} key={index}
                                   setToActiveRecord={bindSetActiveRecord}
                                   activeRecords={activeRecords}/>;
    });


    let positionFigure;
    switch(issueController.activeView){
        case VIEW_PARTY: 
            positionFigure = partyPositionGroups;
            break;

        case VIEW_LEGISLATOR: 
            positionFigure = positionLegislatorGroups;
            break;

        case VIEW_POSITION: 
            positionFigure = positionPartyGroups;
            break;
        
    }

    /* 顯示目前 active 的 records */
    let activeRecordItems = activeRecords.map((record, index)=>{
        return <PositionRecord data={record} key={index} />
    });

    return (
      <div className={styles.masthead}>
          <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>
          
          <IssueController/>
          
          <div className={styles.records}>
            {positionFigure}
          </div>
          {activeRecordItems}
      </div>
    );
  }
}
