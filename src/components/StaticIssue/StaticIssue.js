import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Slideshow from '../../components/Slideshow/Slideshow.js';
import IssueFigure from '../../components/IssueFigure/IssueFigure.js';
import Missions from '../../components/Missions/Missions.js';

import {done, none} from '../../ducks/processingState.js';

@connect(
    state => ({
                issues: state.issues,
                processingState: state.processingState
              }),
    dispatch => bindActionCreators({done, none}, dispatch))

export default class StaticIssue extends Component {
  static propTypes = {
     issues: PropTypes.object.isRequired
  }

  constructor(props) { super(props)
     this.state = {
        currentIssueName: props.currentIssueName, //URL
        currentView: props.currentView
     }
  }

  componentDidMount(){
      this._updateCurrentIssueFromURL();
      this._informProcessing();
  }
  componentDidUpdate(){
      this._informProcessing();
  }
  _informProcessing(){
      const {processingState, done, none} = this.props;
      if(processingState.processing === "processing"){
          setTimeout(()=>{
              done();
              setTimeout(()=>{
                 none();
              }, 1000)
          }, 5000)
      }

  }
  _updateCurrentIssueFromURL(){
      //console.log("mount - static issue : update pathname form url")
      if(window){
        let pathname = window.location.pathname;

        if(pathname.indexOf(".html")!==-1){
           pathname = pathname.split(".html")[0]
        }
        pathname = pathname.split("/");

        let value = pathname[3] || "parties";
        if(["parties","legislators","positions"].indexOf(value)===-1){
           value = "parties";
        }
        this.setState({
          currentIssueName: pathname[2],
          currentView: value

        })

      }

  }
  componentWillReceiveProps(nextProps){
      //console.log(nextProps.currentIssueName)
      this.setState({
          currentIssueName: nextProps.currentIssueName,
          currentView: nextProps.currentView
      })

  }

  render(){
      const styles = require('./StaticIssue.scss');

      const {issues, setCurrentView} = this.props;
      const {currentView, currentIssueName} = this.state;
      const currentIssue = issues[currentIssueName];

      const runner = require('./images/runner.gif');
      const runner_animated = require('./images/runner-animated.gif');

      if(!currentIssue) return <div></div>;


      // 顯示處理中
      const {processingState} = this.props;
      let processingItem;

      switch(processingState.processing){
          case 'processing':
              processingItem = <div className={styles.processingItem}><div className={styles.content}><img src={runner_animated}/><div>立場分析中</div></div></div>;
              break;

          case 'done':
              processingItem = <div className={styles.processingItem}><div className={styles.content}><img src={runner}/><div>分析完成</div></div></div>;
              break;

          case 'none':
              processingItem = <div className={`${styles.processingItem} ${styles.processingItemHide}`}></div>;
              break;

      }


       // 協力 NGO
      const { collaborators } = currentIssue;
      let collaboratorItems = collaborators.map((ngo, index)=>{
          return <a className={`${styles.ia} ${styles.bright}`}
                    href={ngo.link}
                    target="_blank"
                    key={index}>{ngo.name}</a>
      });

      return (
        <div className={styles.wrap}>
            {processingItem}
            <div className={styles.innerWrap}>

                <Slideshow currentIssue={currentIssue}
                           topic={currentIssue.title}/>

                <IssueFigure currentView={currentView}
                             currentIssue={currentIssue}
                             currentIssueName={currentIssueName}
                             setCurrentView={setCurrentView} />
                <div className={styles.divider}></div>
                <Missions issues={issues}
                          skipIssue={currentIssueName}
                          showComingMission={false}/>

                <div className={styles.collaboratorInfo}>
                    本議題特別感謝{collaboratorItems}的協助
                </div>

             </div>
        </div>
      )
  }
}
