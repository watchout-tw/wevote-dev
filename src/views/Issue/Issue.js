import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import PositionGroup from '../../components/PositionGroup/PositionGroup.js';
import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import Slideshow from '../../components/Slideshow/Slideshow.js';

@connect(
    state => ({issues: state.issues, partyView: state.partyView}),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  render() {
    const styles = require('./Issue.scss');

    const {issues, partyView} = this.props;
    const currentIssueName = this.props.params.issueName;

    const currentIssue = issues[currentIssueName]//只拿: 目前頁面議題的議題基本資料
    const currentPartyView = partyView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料

    

    let partyPositionGroups = currentPartyView.partyPositions.map((value, index)=>{
        //console.log(value);
        return <PartyPositionGroup data={value} issueStatement={currentPartyView.statement} key={index}/>;
    });


    return (
      <div className={styles.masthead}>
          <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>
          <div className={styles.records}>
            {partyPositionGroups}
          </div>
         
      </div>
    );
  }
}
