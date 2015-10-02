import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import InteractiveIssue from '../../components/InteractiveIssue/InteractiveIssue.js';
import StaticIssue from '../../components/StaticIssue/StaticIssue.js';

@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  static propTypes = {
     issues: PropTypes.object.isRequired
  }

  constructor(props) { super(props)   
      this.state = {
        currentView: 'parties',
        interactive: true,
        hasPlayedVersion1: false, 
        showNotification: true
      }
  }
  _toggleInteractive(){
      this.setState({
          interactive: !this.state.interactive
      })
  }
  _handleSetInteractive(value){
      this.setState({
          interactive: value
      })
  }
  _handleReplay(){
      this.setState({
          interactive: true
      })
      this._markLocalStorageHide();
  }
  _handleTryInteractive(){
      this.setState({
          interactive: true
      })
      this._markLocalStorageHide();
  }
  _hideNotification(){
      this._markLocalStorageHide();
  }
  _skipInteractive(){
      this.setState({
          interactive: false,
          hasPlayedVersion1: "skip"
      })
  }
  _markLocalStoragePlayed(){
      if(window){
          console.log(" ▨ ▨ MARKED ")
          window.localStorage.setItem("hasPlayedVersion1", true);
      }
  }
  _markLocalStorageHide(){
      if(window){
          console.log(" ▨ Hide ME!")
          window.localStorage.setItem("hideNotification", true);
      }
  }
  _checkLocalStorage(){
      if(!this.state.hasPlayedVersion1){
          
          let hasPlayed = window.localStorage.getItem("hasPlayedVersion1");
          if(hasPlayed){
              console.log(" ▨ ▨ You've played! ▨ ▨")
              this.setState({
                 hasPlayedVersion1: true
              })
          }  

      }

      if(this.state.showNotification){
          let shouldHide = window.localStorage.getItem("hideNotification");
          if(shouldHide){
              console.log(" ▨ 你選擇隱藏訊息")
              this.setState({
                 showNotification: false
              })
          }  

      }
  }
  componentDidMount(){//Only runs in client side
      this._checkLocalStorage();
  }
  componentDidUpdate(prevProps, prevState){//Only runs in client side
      this._checkLocalStorage();
  }
  
  render(){
    
      const styles = require('./Issue.scss');
      const {issues} = this.props;
      const currentIssueName = this.props.params.issueName;
      const {currentView, interactive, hasPlayedVersion1, showNotification} = this.state; //this.props.params.view || "parties";
      const currentIssue = issues[currentIssueName];

     
      // 主畫面
      let main = (interactive) ? (
          <InteractiveIssue currentIssueName={currentIssueName}
                            currentView={currentView}
                            markLocalStoragePlayed={this._markLocalStoragePlayed.bind(this)}
                            skipInteractive={this._skipInteractive.bind(this)} />
      ):(
          <StaticIssue currentIssueName={currentIssueName}
                       currentView={currentView}/>
        );
      
      // 已經玩過的提示
      let hasPlayedNotification =  (
         <div className={styles.headerNotification}>
              {`你已經玩過互動腳本了，以下將直接顯示${currentIssue.title}之城的對戰紀錄。`}
              <div className={styles.playAgain}
                   onClick={this._handleReplay.bind(this)}>再玩一次</div>
              <div className={styles.removeButton}
                   onClick={this._hideNotification.bind(this)}><i className="fa fa-times"></i></div>
         </div>
      );

      // 第一次就選擇跳過的提示
      let skipNotification =  (
         <div className={styles.headerNotification}>
              {`你選擇跳過互動腳本，以下將直接顯示${currentIssue.title}之城的對戰紀錄。`}
              <div className={styles.playAgain}
                   onClick={this._handleTryInteractive.bind(this,true)}>玩玩看互動腳本</div>
              <div className={styles.removeButton}
                   onClick={this._hideNotification.bind(this)}><i className="fa fa-times"></i></div>
         </div>
      );

      // 判斷要顯示哪一則提示
      let headerNotification = <div className={`${styles.headerNotification} ${styles.isHide}`}></div>
      if(hasPlayedVersion1===true && showNotification){
         headerNotification = hasPlayedNotification;
      }
      if(hasPlayedVersion1==="skip" && showNotification){
         headerNotification = skipNotification;
      } 


      // 畫面右上方的控制鍵
      let alternative = (interactive) ? (
              <div className={styles.settingButton}
                   onClick={this._handleSetInteractive.bind(this,false)}>
                   <i className="fa fa-rocket"></i>
                   <div className={styles.settingText}>跳過互動</div>
              </div>) : (
              <div className={styles.settingButton}
                   onClick={this._handleSetInteractive.bind(this,true)}>
                   <i className="fa fa-reply"></i>
                   <div className={styles.settingText}>互動版本</div>
              </div>
              );

      let interactionControlPanel = (
        <div className={styles.settingPanel}>
          <div className={styles.settingButtons}>
              {alternative}
          </div>
        </div>
      )


      

      return (
        <div className={styles.wrap}>
             {headerNotification}
             {interactionControlPanel}
             {main}
        </div>
      )
  }
}

// let devTool = (
//         <div className={styles.interactiveControl}
//              onClick={this._toggleInteractive.bind(this)}>清</div>
// )

