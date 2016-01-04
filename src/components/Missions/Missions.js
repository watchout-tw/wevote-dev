import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';

import eng2url from '../../utils/eng2url';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setToProecessing} from '../../ducks/processingState.js';

import getData from '../../data/getData';
const {issues} = getData();

@connect(
    state => ({}),
    dispatch => bindActionCreators({setToProecessing}, dispatch))
export default class Missions extends Component {
 
  constructor(props){ super(props)
      this.state = {
        checkedLocal: false,
        completed: {
          "marriage-equality" :false,
          "recall" : false,
          "referendum" : false,
          "nuclear-power" : false,
          "course-guide" : false,
          "justice-reform" : false
        },
        shipments: {
          "1" : ["marriage-equality","recall","referendum","nuclear-power"],
          "2" : ["course-guide","justice-reform"]
        }

      }

  }

  // 取得 localStorage，檢查任務是否已完成
  _checkLocalStorage(){
      const {checkedLocal} = this.state;
      if(window && checkedLocal === false){
          const {completed} = this.state;

          Object.keys(issues).map((currentIssueName, index)=>{
              let local = window.localStorage.getItem(currentIssueName);
              if(local === "true"){
                  completed[currentIssueName] = true;
              }
          })

          this.setState({
            checkedLocal: true,
            completed: completed
          })
      }

  }
  componentDidMount(){//Only runs in client side
      this._checkLocalStorage();
  }

  render() {
    const styles = require('./Missions.scss');
    const {skipIssue, showComingMission, embed, shipmentsType} = this.props;
    
    const {completed, shipments} = this.state;
    const castle_default = require('./images/castles_default.svg');
    const title_default = require('./images/castles_defaultTitle.svg');
    const symbol_star = require('./images/symbols_star.svg');
    const badge = require('./images/missionAccomplishBadge.svg');

    const {setToProecessing} = this.props;

    let coverItemClasses = classnames({
      [styles.coverItem]  : true,
      [styles.embed] : embed
    })

    //As we want to layout newer issues on top of it.
    const currentShipments = shipments[shipmentsType];
    let missonItems = currentShipments.map((currentIssue, index)=>{

        let imgURL;
        let titleURL;

        try {
          imgURL = require(`./images/castles_${issues[currentIssue].titleEng}.svg`);
          titleURL = require(`./images/castles_${issues[currentIssue].titleEng}Title.svg`);
        } catch (e){
          imgURL = castle_default;
          titleURL = title_default;
        }

        let missionAccomplishBadge = (
          (completed[currentIssue] === true) ?
          (<img src={badge} className={styles.missionAccomplishBadge}/>) :
          (<div></div>)
        );

        let titleStyle = (completed[currentIssue] === true) ? styles.completedCoverTitle : styles.coverTitle;

        if(skipIssue !== currentIssue){
            if(embed === true){
              let linkURL = `//wevote.tw/issues/${currentIssue}/`;
              return (
                  <a href={linkURL}
                     target="_blank"
                     key={`${currentIssue}-index`}
                     className={coverItemClasses}
                     onClick={setToProecessing}>
                      <img src={imgURL} className={styles.coverImg}/>
                      <img src={titleURL} className={styles.coverTitleImg}/>
                      {missionAccomplishBadge}
                  </a>
              )

            }else{
              return (
                  <Link to={`/issues/${currentIssue}/`} 
                        key={`${currentIssue}-index`} 
                        className={coverItemClasses}
                        onClick={setToProecessing}>
                      <img src={imgURL} className={styles.coverImg}/>
                      <img src={titleURL} className={styles.coverTitleImg}/>
                      {missionAccomplishBadge}
                  </Link>
              )

            }

        }
    });

    /* 更多任務 */
    let comingMissionItem = (showComingMission === true) ? (
        <div className={coverItemClasses}>
          <img src={castle_default} className={styles.coverImg}/>
          <div className={styles.comingText}>更多任務<br/>即將揭曉</div>
        </div>
    ) : "";


    let wrapClasses = classnames({
      [styles.wrap]  : true,
      [styles.embed] : embed,
      [styles.showingOtherIssues] : (skipIssue !== undefined),
    })

    return (
        <div className={wrapClasses}>
            {missonItems}
            {comingMissionItem}
        </div>
    );
  }
}
