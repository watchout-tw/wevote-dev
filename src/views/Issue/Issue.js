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
        interactive: false,
        localInteractivePrefChecked: false,

        chooseSkip: false, 
        showNotification: true
      }
  }
  _setCurrentView(value){
      this.setState({
          currentView: value
      })
  }
  
  _handleSetInteractive(value){
      console.log("設定互動模式："+value)
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
  _skipInteractive(){
      this._handleSetInteractive(false);
      this.setState({
          chooseSkip: true
      })
  }

  _markLocalStorageHide(){
      if(window){
          window.localStorage.setItem("hideNotification", true);
      }
  }
  _setLocalStorageInteractivePref(value){
      if(window){
          window.localStorage.setItem("interactivePref", value);
      }
  }

  // 取得 localStorage
  _checkLocalStorage(){
      if(this.state.showNotification===true){
          let shouldHide = window.localStorage.getItem("hideNotification");
          if(shouldHide){
              console.log(" ▨ 你選擇隱藏訊息")
              this.setState({
                 showNotification: false
              })
          }  

      }
      
      const {interactive, localInteractivePrefChecked} = this.state;
      

      if(localInteractivePrefChecked===false){
          let interactivePref = window.localStorage.getItem("interactivePref");
          console.log(" ▨▨▨  更新 interactive pref ")
          if(interactivePref){
              console.log("▨ 瀏覽器存的設定："+interactivePref)
              this.setState({
                  localInteractivePrefChecked: true,
                  interactive: interactivePref
              })
          }else{
             this.setState({
                  localInteractivePrefChecked: true,
                  interactive: true
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
      const {currentView, interactive, chooseSkip, showNotification, localInteractivePrefChecked} = this.state; //this.props.params.view || "parties";
      const currentIssue = issues[currentIssueName];

      console.log("ＯＯＯ render ＯＯＯ")
      console.log("interactive:"+interactive);
      console.log("localInteractivePrefChecked:"+localInteractivePrefChecked);

      // 主畫面
      let main = (interactive === true) ? (
          <InteractiveIssue currentIssueName={currentIssueName}
                            currentView={currentView}
                            skipInteractive={this._skipInteractive.bind(this)}
                            setCurrentView={this._setCurrentView.bind(this)} />
      ):(
          <StaticIssue currentIssueName={currentIssueName}
                       currentView={currentView}
                       setCurrentView={this._setCurrentView.bind(this)}/>
        );
      
    
      // 選擇跳過的提示
      let skipNotification =  (
         <div className={styles.headerNotification}>
              {`你選擇跳過互動腳本，將直接顯示對戰紀錄。`}
              <div className={styles.removeButton}
                   onClick={this._hideNotification.bind(this)}><i className="fa fa-times"></i></div>
         </div>
      );

      // 判斷是否要顯示提示通知
      let headerNotification;
      if(chooseSkip===true && showNotification){
         headerNotification = skipNotification;
      } 


      // 畫面右上方的控制鍵
      let alternative = (interactive === true) ? (
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



