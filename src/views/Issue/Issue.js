import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';


import Slideshow from '../../components/Slideshow/Slideshow.js';

import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import PositionLegislatorGroup from '../../components/PositionLegislatorGroup/PositionLegislatorGroup.js';
import PositionPartyGroup from '../../components/PositionPartyGroup/PositionPartyGroup.js';

import IssueController from '../../components/IssueController/IssueController.js';

@connect(
    state => ({
                issues: state.issues, 
                partyView: state.partyView,
                legislatorView: state.legislatorView,
                positionView: state.positionView
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  //設定 initial state
  constructor(props) { super(props)
      this.state = {
            options: [
                  {
                    'title' : '看政黨',
                    'id' : 'viewParty'
                  },
                  {
                    'title' : '看委員',
                    'id' : 'viewLegislator'
                  },
                  {
                    'title' : '看表態',
                    'id' : 'viewPosition'
                  }

            ],
            activeOption: 'viewParty'
      }
  }

  _toggleOption(value, event){
    this.setState({activeOption: value})
  }

  render() {
    const styles = require('./Issue.scss');

    const {issues, partyView, legislatorView, positionView} = this.props;
    const {options, activeOption} = this.state;

    const currentIssueName = this.props.params.issueName;/* 從 URL 知道現在讀的議題頁面 */

    const currentIssue = issues[currentIssueName]//只拿目前頁面議題的議題基本資料，maybe refine to ducks/select later on
  



    /* 1. 看政黨 */
    const currentPartyView = partyView[currentIssue.titleEng];
    let partyPositionGroups = currentPartyView.partyPositions.map((value, index)=>{
        //console.log(value);
        return <PartyPositionGroup data={value} issueStatement={currentPartyView.statement} key={index}/>;
    });


    /* 2. 看立委 */
    const currentLegislatorView = legislatorView[currentIssue.titleEng];
    let positionLegislatorGroups = currentLegislatorView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionLegislatorGroup data={value} issueStatement={currentPartyView.statement} key={index}/>;
    });

    /* 3. 看表態 */
    const currentPositionView = positionView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料
    let positionPartyGroups = currentPositionView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionPartyGroup data={value} issueStatement={currentPartyView.statement} key={index}/>;
    });


    let positionFigure;
    switch(activeOption){
        case 'viewParty': 
            positionFigure = partyPositionGroups;
            break;

        case 'viewLegislator': 
            positionFigure = positionLegislatorGroups;
            break;

        case 'viewPosition': 
            positionFigure = positionPartyGroups;
            break;
        
    }


    return (
      <div className={styles.masthead}>
          <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>
          
          <IssueController options={options} activeOption={activeOption} handlerSetOption={this._toggleOption.bind(this)}/>
          
          <div className={styles.records}>
            {positionFigure}
          </div>
         
      </div>
    );
  }
}
