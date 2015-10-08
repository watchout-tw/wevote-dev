import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";

import eng2url from '../../utils/eng2url';


export default class Missions extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      this.state = {
        checkedLocal: false,
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
      console.log("check local storage!!");
      const {checkedLocal} = this.state;
      if(window && checkedLocal === false){
          const {issues} = this.props;
          const {completed} = this.state;
          console.log("has window")
          Object.keys(issues).map((currentIssueName, index)=>{
              let local = window.localStorage.getItem(currentIssueName);
              console.log("local value")
              console.log(local)
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
  componentDidUpdate(prevProps, prevState){//Only runs in client side
      //this._checkLocalStorage();
  }

  render() {
    const styles = require('./Missions.scss');
    const {issues, skipIssue, showComingMission} = this.props;
    const {completed} = this.state;
    const castle_default = require("./images/castles_default.svg");
    const symbol_star = require('./images/symbols_star.svg');

    let missonItems = Object.keys(issues).map((currentIssue, index)=>{

        let imgURL;

        try {
          imgURL = require(`./images/castles_${issues[currentIssue].titleEng}.svg`);
        } catch (e){
          imgURL = castle_default;
        }

        let completedOrStatement = (completed[currentIssue] === true) ? (
          <div className={styles.missionStatusBlock}>
            <img src={symbol_star} className={`${styles.symbol} ${styles.star}`}/>
            <div className={styles.missionStatusText}>任務完成</div>
          </div>
        ) : (<div>{issues[currentIssue].question}</div>);

        let titleStyle = (completed[currentIssue] === true) ? styles.completedCoverTitle : styles.coverTitle;

        if(skipIssue !== currentIssue){
            return (
              <Link to={`/issues/${currentIssue}`} key={index} className={styles.coverItem}>
                  <img src={imgURL} className={styles.coverImg}/>
                  <div className={styles.coverTitleBlock}>
                      <span className={titleStyle}>{issues[currentIssue].title}</span><span>之城</span>
                  </div>
                  <div className={styles.coverQuestion}>{completedOrStatement}</div>
              </Link>
            )
        }
    });

    let comingMissionItem = (showComingMission === true) ? (
        <div className={styles.coverItem}>
          <img src={castle_default} className={styles.coverImg}/>
          <div className={styles.comingText}>更多任務<br/>即將揭曉</div>
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
