import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";

import eng2url from '../../utils/eng2url';


export default class Missions extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      this.state = {
        completed: {
          "marriage-equality" :false,
          "recall" : false,
          "referendum" : false,
          "nuclear-power" : false
        }
      }

  }

  // 取得 localStorage
  _checkLocalStorage(){
      if(window){
          const {issues} = this.props;
          const {completed} = this.state;
          Object.keys(issues).map((currentIssueName, index)=>{
              let local = window.localStorage.getItem(currentIssueName);
              if(local === "true"){
                  completed[currentIssueName] = true;
              }
          })
      
          
      }
      
      
  }
  componentDidMount(){//Only runs in client side
      this._checkLocalStorage();
  }
  componentDidUpdate(prevProps, prevState){//Only runs in client side
      this._checkLocalStorage();
  }
  
  render() {
    const styles = require('./Missions.scss');
    const {issues, skipIssue, showComingMission} = this.props;
    const {completed} = this.state;

    let missonItems = Object.keys(issues).map((currentIssue, index)=>{

        let imgURL;

        try {
          imgURL = require(`./images/${issues[currentIssue].titleEng}.png`);
        }catch(e){
          imgURL = require("./images/default.png");
        }

        let completedOrStatement = (completed[currentIssue] === true) ? (
          <div className={styles.missionStatusBlock}>
            <i className={`fa fa-star ${styles.star}`}></i>
            <div className={styles.missionStatusText}>COMPLETED</div>
          </div>
        ) : (<div>{issues[currentIssue].question}</div>);
        
        let titleStyle = (completed[currentIssue] === true) ? styles.completedCoverTitle : styles.coverTitle;

        if(skipIssue !== currentIssue){
            return (
              <Link to={`/issues/${currentIssue}/parties`} key={index} className={styles.coverItem}>
                  <img src={imgURL} className={styles.coverImg}/>
                  <div className={styles.coverTitleBlock}>
                      <div className={titleStyle}>{issues[currentIssue].title}</div>之城
                  </div>
                  {completedOrStatement}
              </Link>
            )
        }
    });

    let comingMissionItem = (showComingMission === true) ? (
        <div className={styles.coverItem}>
                <div className={styles.comingText}>更多任務<br/>coming soon</div>
        </div>
    ) : "";

    return (
        <div className={styles.wrap}>
            {missonItems}
            {comingMissionItem}
        </div>
    );
  }
}
