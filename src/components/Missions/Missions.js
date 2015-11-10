import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';

import eng2url from '../../utils/eng2url';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setToProecessing} from '../../ducks/processingState.js';

@connect(
    state => ({}),
    dispatch => bindActionCreators({setToProecessing}, dispatch))
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

  // 取得 localStorage，檢查任務是否已完成
  _checkLocalStorage(){
      const {checkedLocal} = this.state;
      if(window && checkedLocal === false){
          const {issues} = this.props;
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
    const {issues, skipIssue, showComingMission, embed} = this.props;
    const {completed} = this.state;
    const castle_default = require("./images/castles_default.svg");
    const symbol_star = require('./images/symbols_star.svg');

    const {setToProecessing} = this.props;

    let coverItemClasses = classnames({
      [styles.coverItem]  : true,
      [styles.embed] : embed
    })

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
            if(embed === true){
              let linkURL = `//wevote.tw/issues/${currentIssue}/`;
              return (
                  <a href={linkURL}
                     target="_blank" 
                     key={index} 
                     className={coverItemClasses}
                     onClick={setToProecessing}>
                      <img src={imgURL} className={styles.coverImg}/>
                      <div className={styles.coverTitleBlock}>
                          <span className={titleStyle}>{issues[currentIssue].title}</span><span>之城</span>
                      </div>
                      <div className={styles.coverQuestion}>{completedOrStatement}</div>
                  </a>
              )

            }else{
              return (
                  <Link to={`/issues/${currentIssue}/`} key={index} className={coverItemClasses}
                        onClick={setToProecessing}>
                      <img src={imgURL} className={styles.coverImg}/>
                      <div className={styles.coverTitleBlock}>
                          <span className={titleStyle}>{issues[currentIssue].title}</span><span>之城</span>
                      </div>
                      <div className={styles.coverQuestion}>{completedOrStatement}</div>
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
      [styles.embed] : embed
    })

    return (
        <div className={wrapClasses}>
            {missonItems}
            {comingMissionItem}
        </div>
    );
  }
}
