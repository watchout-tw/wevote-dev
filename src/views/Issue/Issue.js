import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import PositionGroup from '../../components/PositionGroup/PositionGroup.js';
import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import Slideshow from '../../components/Slideshow/Slideshow.js';

@connect(
    state => ({issues: state.issues, positionRecords: state.positionRecords}),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  render() {
    const styles = require('./Issue.scss');

    const {issues, positionRecords} = this.props;
    
    const issue = issues[this.props.params.issueName];//誰贊成誰反對的資料們 (目前只是隨便亂丟的測試資料)
    const position = positionRecords[this.props.params.issueName];//只拿: 針對目前頁面議題的表態資料
    //console.log(position);

    /*
      把拿到的記錄依照政黨分組
      這裡也許之後要搬到 ducks 裡面做，而不是在 view component 裡面
    */
    let partyPositionData = {};
    position.map((value, index)=>{
        if(!partyPositionData[value.Party])
            partyPositionData[value.Party] = [];
        partyPositionData[value.Party].push(value);
    })
    //console.log(partyPositionData);

    /*
      每一個政黨分給不同的 view component 去畫
    */
    let partyPositionGroups = Object.keys(partyPositionData).map((value, index)=>{
        //console.log(value);
        return <PartyPositionGroup data={partyPositionData[value]} party={value} key={index}/>;
    });


    // let positionGroups = issue.positions.map((value, index)=>{
    //   return <PositionGroup data={value} key={index}/>
    // });

    
    

    return (
      <div className={styles.masthead}>
          <Slideshow data={issue.slideshows} topic={issue.title}/>
          <div className={styles.records}>
            {partyPositionGroups}
          </div>
         
      </div>
    );
  }
}
