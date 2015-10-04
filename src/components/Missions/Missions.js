import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";

import eng2url from '../../utils/eng2url';


export default class Missions extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired
  }
  
  render() {
    const styles = require('./Missions.scss');
    const {issues, skipIssue, showComingMission} = this.props;
    let missonItems = Object.keys(issues).map((currentIssue, index)=>{

        let imgURL;

        try {
          imgURL = require(`./images/${issues[currentIssue].titleEng}.png`);
        }catch(e){
          imgURL = require("./images/default.png");
        }
        if(skipIssue !== currentIssue){
            return (
              <Link to={`/issues/${currentIssue}/parties`} key={index} className={styles.coverItem}>
                  <img src={imgURL} className={styles.coverImg}/>
                  <div className={styles.coverTitleBlock}>
                      <div className={styles.coverTitle}>{issues[currentIssue].title}</div>之城
                  </div>
                  <div>{issues[currentIssue].question}</div>
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
