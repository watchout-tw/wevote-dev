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
        currentView: props.params.viewName || 'parties',
        interactive: false,
        localInteractivePrefChecked: false,

        chooseSkip: false, 
        
        showNotification: true,
        showCompleteNotification: true,
        hasCheckNotificationPref: false,

        stage: "",
        isClientSide: false,

        completed: {
          "marriage-equality" :false,
          "recall" : false,
          "referendum" : false,
          "nuclear-power" : false
        },
        localChecked: {
          "marriage-equality" :false,
          "recall" : false,
          "referendum" : false,
          "nuclear-power" : false
        }
      }
  }
  _handleUpdateStage(stage){
      console.log("[ handleUpdateStage ]"+stage)
      const {isClientSide} = this.state;
      if(isClientSide === true){
          this.setState({
            stage: stage
          })
          const currentIssueName = this.props.params.issueName;
          let {completed, localChecked} = this.state;
    
          if((stage === "intro")&&(completed[currentIssueName]===false)&&localChecked[currentIssueName]===false){
              // add 'checked' to avoid overly checked local storage
              console.log("<> check local complete info.")
    
              if(window){
                  let current =  window.localStorage.getItem(currentIssueName);
                  if(current === "true"){
                      completed[currentIssueName] = true;
                      localChecked[currentIssueName] = true;
                      this.setState({
                          completed: completed,
                          localChecked: localChecked
                      })
                  }
              }
          }
      }
  }
  _setCurrentView(value){
      history.pushState({}, "", `/issues/${this.props.params.issueName}/${value}`);
      this.setState({
          currentView: value
      })
  }
  
  _handleSetInteractive(value){
      console.log("設定互動模式："+value)
      if(value === true){
         this._handleClearCompleted();
      }
      this.setState({
          interactive: value
      })
      this._setLocalStorageInteractivePref(value);

  }
  _hideNotification(){
      this._markLocalStorageHide();
      this.setState({
        showNotification: false
      })
  }
  _hideCompleteNotification(){
      this._markLocalStorageCompleteHide();
      this.setState({
        showCompleteNotification: false
      })
  }
  _skipInteractive(){
      this._handleSetInteractive(false);
      this.setState({
          chooseSkip: true
      })
  }
  _undoSkip(){
      this._handleSetInteractive(true);
      this.setState({
          chooseSkip: false
      })
  }
  _handleCompleted(issueName){
      this._markLocalStorageCompleted(issueName);
  }
  _handleClearCompleted(){
      console.log("[handle clear completed]")
      const issueName = this.props.params.issueName;
         
      let {completed, localChecked} = this.state;
      completed[issueName] = false;
      localChecked[issueName] = false;
      this.setState({
        completed: completed,
        localChecked: localChecked
      })
      if(window){
          window.localStorage.setItem(issueName, false);
      }
  }

  _markLocalStorageCompleted(issueName){
      if(window){
          window.localStorage.setItem(issueName, true);
      }
  }

  _markLocalStorageHide(){
      if(window){
          window.localStorage.setItem("hideNotification", true);
      }
  }
  _markLocalStorageCompleteHide(){
      if(window){
          window.localStorage.setItem("hideCompleteNotification", true);
      }
  }
  _setLocalStorageInteractivePref(value){
      if(window){
          window.localStorage.setItem("interactivePref", value);
      }
  }

  _checkLocalNotificationPref(){
      console.log("check local storage (issue - notification)")
      if(this.state.hasCheckNotificationPref===false){
          
          const {showNotification, showCompleteNotification} = this.state;
          if(showNotification === true){

                let shouldHide = window.localStorage.getItem("hideNotification");
                console.log("shouldHideNitification")
                console.log(shouldHide)
                
      
                if(shouldHide){
                    this.setState({
                       showNotification: false
                    })
                }  

          }
          if(showCompleteNotification===true){
                let shouldCompleteHide = window.localStorage.getItem("hideCompleteNotification");
                console.log("shouldCompleteHide")
                console.log(shouldCompleteHide)
                if(shouldCompleteHide){
                    this.setState({
                       showNotification: false
                    })
                }  
          }
          this.setState({
              hasCheckNotificationPref: true
          })
          
      }
      
  }

  // 取得 localStorage
  _checkLocalInteractive(){
      
      console.log("checkLocalInteractive");
     
      const {interactive, localInteractivePrefChecked} = this.state;
      

      if(localInteractivePrefChecked===false){
          let interactivePref = window.localStorage.getItem("interactivePref");
          
          console.log(" ▨▨▨  更新 interactive pref ")
          
          if(interactivePref==="false"){
              
              console.log("▨ 瀏覽器存的設定："+interactivePref)
              
              this.setState({
                  localInteractivePrefChecked: true,
                  interactive: false
              });

          }else{
              this.setState({
                  localInteractivePrefChecked: true,
                  interactive: true
              });
          }   
      }
  }
  componentDidMount(){//Only runs in client side
      console.log("[Issue Mount]")
      this._checkLocalInteractive();
      this._checkLocalNotificationPref();
      this.setState({
        isClientSide: true
      })
  }

  
  render(){
      const styles = require('./Issue.scss');
      const {issues} = this.props;
      const currentIssueName = this.props.params.issueName;
      const {currentView, interactive, chooseSkip, 
             showNotification, showCompleteNotification,
             localInteractivePrefChecked,
             completed} = this.state; 
      const currentIssue = issues[currentIssueName];

      let isInteractiveMode = (interactive === true && completed[currentIssueName]===false)? true : false;
      
      console.log("<><> isInteractiveMode:"+isInteractiveMode)


      // 主畫面
      let main;
      if(isInteractiveMode === true){
        main = (
          <InteractiveIssue currentIssueName={currentIssueName}
                            currentView={currentView}
                            skipInteractive={this._skipInteractive.bind(this)}
                            setCurrentView={this._setCurrentView.bind(this)}
                            handleCompleted={this._handleCompleted.bind(this)}
                            handleUpdateStage={this._handleUpdateStage.bind(this)} />
        )
      }else{
        // if we use (isInteractiveMode === false) here, it would not shown the static version at first
        // default mode has to be non-interactive, so that can generate static pages of all.
        // use 'invisibleStyle' to hide the 1-sec flash from real-person user
        let invisibleStyle = (isInteractiveMode === false) ? "" : styles.invisibleBlock;
        main = (
          <div className={styles.invisibleStyle}>
          <StaticIssue currentIssueName={currentIssueName}
                       currentView={currentView}
                       setCurrentView={this._setCurrentView.bind(this)}/>
          </div>
        )
      }
          
    
      // 選擇跳過的提示
      let skipNotification =  (
         <div className={styles.headerNotification}>
              <div className={styles.headerNotificationText}>你選擇跳過互動腳本，將直接顯示對戰紀錄。</div>
              <div className={styles.undo}
                   onClick={this._undoSkip.bind(this)}>Undo</div>
              <div className={styles.removeButton}
                   onClick={this._hideNotification.bind(this)}><i className="fa fa-times"></i></div>
         </div>
      );
      // completed notification
      let completedNotification =  (
         <div className={styles.headerNotification}>
              <div className={styles.headerNotificationText}>你已完成此任務，將直接顯示對戰紀錄。</div>
              <div className={styles.undo}
                   onClick={this._handleClearCompleted.bind(this)}>Reply</div>
              <div className={styles.removeButton}
                   onClick={this._hideCompleteNotification.bind(this)}><i className="fa fa-times"></i></div>
         </div>
      );``

      // 判斷是否要顯示提示通知
      let notificationShowed = false;
      let headerNotification;
      if(chooseSkip===true && showNotification && interactive===false && !completed[currentIssueName]){
          headerNotification = skipNotification;
          notificationShowed = true;
      } 
      if(completed[currentIssueName]===true && showCompleteNotification){
          headerNotification = completedNotification;
          notificationShowed = true;
      }


      // 畫面右上方的控制鍵
      let alternative = (isInteractiveMode === true) ? (
              <div className={styles.settingButton}
                   onClick={this._skipInteractive.bind(this,false)}>
                   <i className="fa fa-rocket"></i>
                   <div className={styles.settingText}>跳過互動</div>
              </div>) : (
              <div className={styles.settingButton}
                   onClick={this._handleSetInteractive.bind(this,true)}>
                   <i className="fa fa-reply"></i>
                   <div className={styles.settingText}>互動版本</div>
              </div>
              );

      let interactionControlPanel = (notificationShowed === false) ? (
        <div className={styles.settingPanel}>
          <div className={styles.settingButtons}>
              {alternative}
          </div>
        </div>
      ):"";

      const metaData = {
          title: `議題表態分析-2016立委出任務`,
          description: `對於各項重大議題的表態大解析！趕快來看看委員在立法院針對下列重大議題有哪些發言！`,
          meta: {
              charSet: 'utf-8',
              property: {
                'og:title': `議題表態分析-2016立委出任務`,
                'og:description': `對於各項重大議題的表態大解析！趕快來看看委員在立法院針對下列重大議題有哪些發言！`,
                'og:type' : 'website'
              }
          }
     
      };


      return (
        <div className={styles.wrap}>
            <DocumentMeta {...metaData}/>
            {headerNotification}
            {interactionControlPanel}
            {main}
        </div>
      )
  }
}



