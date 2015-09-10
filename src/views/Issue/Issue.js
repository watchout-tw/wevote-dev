import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';


import Slideshow from '../../components/Slideshow/Slideshow.js';

import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import PositionLegislatorGroup from '../../components/PositionLegislatorGroup/PositionLegislatorGroup.js';
import PositionPartyGroup from '../../components/PositionPartyGroup/PositionPartyGroup.js';

@connect(
    state => ({
                issues: state.issues, 
                partyView: state.partyView,
                legislatorView: state.legislatorView,
                positionView: state.positionView
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  render() {
    const styles = require('./Issue.scss');

    const {issues, partyView, legislatorView, positionView} = this.props;
    const currentIssueName = this.props.params.issueName;

    const currentIssue = issues[currentIssueName]//只拿: 目前頁面議題的議題基本資料
    
    const currentPartyView = partyView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料
    const currentLegislatorView = legislatorView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料
    const currentPositionView = positionView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料


    let partyPositionGroups = currentPartyView.partyPositions.map((value, index)=>{
        //console.log(value);
        return <PartyPositionGroup data={value} issueStatement={currentPartyView.statement} key={index}/>;
    });

    let positionLegislatorGroups = currentLegislatorView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionLegislatorGroup data={value} issueStatement={currentPartyView.statement} key={index}/>;
    });

    let positionPartyGroups = currentPositionView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionPartyGroup data={value} issueStatement={currentPartyView.statement} key={index}/>;
    });



    return (
      <div className={styles.masthead}>
          <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>
          
          <div className={styles.records}>
            {partyPositionGroups}
          </div>
          
          <div className={styles.records}>
            {positionLegislatorGroups}
          </div>

          <div className={styles.records}>
             {positionPartyGroups}
          </div>
         
      </div>
    );
  }
}
