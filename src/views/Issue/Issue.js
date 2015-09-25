import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import Slideshow from '../../components/Slideshow/Slideshow.js';
import IssueView from '../../components/IssueView/IssueView.js';

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
    const {issues} = this.props;
    // 從 URL 知道現在讀的議題頁面
    const currentIssueName = this.props.params.issueName;
    // 拿該議題的資料
    const currentIssue = issues[currentIssueName];

    let preservedLines = this._generatePreservedLines(currentIssue);

    this.state = {
        stage: "intro", 
        currentLineIndex: 0,
        preservedLines : preservedLines,
        lines : [`嘿！歡迎來到${currentIssue.title}城堡。`],
        showSlides: "",
        userPosition: "" //贊成, 反對, 不確定
    }
  
  }
  _generatePreservedLines(issue){
    return [
        `在這個國度裡，每一座城堡，`,
        `都有不同的人馬駐守著。`,
        `駐守者可以決定城堡的相關制度及未來發展。`,
        `甚至，要自我毀滅，讓${issue.title}完全消失，`,
        `也不是完全不可能。`,
        `嗯⋯⋯`,
        `目前${issue.title}城堡是由反方佔領。`,
        `有一群人正準備攻擊，想要奪下這個城堡，`,
        `他們的目標是：${issue.statement}。`,
        `現在兩方人馬即將對戰！`
        
    ];
  }

  componentDidMount(){ 
      window.addEventListener('keydown', this._handleKeyDown.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener('keydown', this._handleKeyDown.bind(this));  
  }

  _handleAddLine(){
    let {currentLineIndex, preservedLines, lines} = this.state;
    if( currentLineIndex + 1 <= preservedLines.length ){
        //預設台詞還沒說完
        lines.push(preservedLines[currentLineIndex]);
        currentLineIndex++;

        this.setState({
          currentLineIndex: currentLineIndex,
          lines: lines
        })

    }else{
        //台詞說完了，開始選擇
         this.setState({
          stage: "chooseSlides"
        })
    }
  }
  _handleChooseSlides(value, event){
      this.setState({
        showSlides: value,
        stage: "slides"
      })
  }
  _handleChoosePosition(value, event){
    this.setState({
        userPosition: value,
        stage: "userPosition"
    })  
  }
  _handleSeeOthers(){
    this.setState({
        stage: "others"
    })  
  }
  _handleBackStage(){
    const stages = ['intro', 'chooseSlides','slides','userPosition','results','others'];
    const {stage} = this.state;
    let index = stages.indexOf(stage) - 1;
    if(index < 0)
       index = 0;
    this.setState({
      stage: stages[index]
    })
  }


  _handleKeyDown(e){

    const SPACE = 32,
          Y = 89,
          y = 121,
          N = 78,
          n = 110,
          S = 83,
          s = 115;
    
    const { stage } = this.state;
    switch(stage){
      case 'intro':
          if( e.keyCode === SPACE ) {
            e.preventDefault();
            this._handleAddLine(); 
          }
          break;

      case 'chooseSlides':
          if( e.keyCode === Y || e.keyCode === y) {
            e.preventDefault();
            this._handleChooseSlides(true);
            
          }
          if( e.keyCode === N || e.keyCode === n ) {
            e.preventDefault();
            this._handleChooseSlides(false);
          }
          break;
      case 'slides':
          if( e.keyCode === Y || e.keyCode === y) {
            e.preventDefault();
            this._handleChoosePosition("贊成"); 
           
          }
          if( e.keyCode === N || e.keyCode === n ) {
            e.preventDefault();
            this._handleChoosePosition("反對");
            
          }
          if( e.keyCode === S || e.keyCode === s ) {
            e.preventDefault();
            this._handleChoosePosition("不確定"); 
            
          }
          break;
      case 'userPosition':
          if( e.keyCode === SPACE ) {
            e.preventDefault();
            this.setState({
              stage: "results"
            }) 
          }
          break;

       case 'results':
          if( e.keyCode === Y || e.keyCode === y) {
            e.preventDefault();
            this.setState({
              stage: "others"
            }) 
          }
          break;

      default:
      //no op
    }
    
  }
  componentWillReceiveProps(nextProps){
    
    const {issues} = this.props;
    const currentIssueName = this.props.params.issueName;
    const nextIssueName = nextProps.params.issueName

    if(currentIssueName !== nextIssueName){
        const nextIssue = issues[nextIssueName];
        let preservedLines = this._generatePreservedLines(nextIssue);
        this.state = {
            stage: "intro",
            showSlides: "",
            userPosition: "",
            currentLineIndex: 0,
            preservedLines : preservedLines,
            lines : [`嘿！歡迎來到${nextIssue.title}城堡。`]
        }
    }
  }


  render(){
    
      const styles = require('./Issue.scss');
      const {issues} = this.props;
      const {stage, currentLineIndex, lines, showSlides, userPosition} = this.state;
  
      // 從 URL 知道現在讀的議題頁面
      const currentIssueName = this.props.params.issueName;
      // 拿該議題的資料
      const currentIssue = issues[currentIssueName];
      // 設定一開始看到的圖表 view，共有 parties, legislators, positions 三種 
      const currentView = this.props.params.view || "parties";

      console.log("==== RENDER:"+stage+"=====")
      let introItem = (
            <Intro currentLineIndex={currentLineIndex}
                   lines={lines}
                   handleAddLine={this._handleAddLine.bind(this)}
                   handleBackStage={this._handleBackStage.bind(this)} />
      )
      let chooseSlidesItem = (
            <ChooseSlides handleChooseSlides={this._handleChooseSlides.bind(this)}
                          handleBackStage={this._handleBackStage.bind(this)} />
      )
      let slidesItem = (
            <Slides showSlides={showSlides}
                    handleChoosePosition={this._handleChoosePosition.bind(this)}
                    currentIssue={currentIssue}
                    handleBackStage={this._handleBackStage.bind(this)}/>
      )
      let userPositionItem = (
            <UserPosition userPosition={userPosition}
                          currentIssue={currentIssue}
                          handleBackStage={this._handleBackStage.bind(this)} />
      )
      let resultsItem = (
            <IssueView currentView={currentView}
                       currentIssue={currentIssue}
                       currentIssueName={currentIssueName}
                       handleSeeOthers={this._handleSeeOthers.bind(this)}
                       handleBackStage={this._handleBackStage.bind(this)} /> 
      )

      let othersItem = (
            <div>
                <div className={styles.backStage}
                     onClick={this._handleBackStage.bind(this)}>回到上一步
                </div>
    
                <div className={styles.storyBlock}>
                      
                      <div className={`${styles.cssTyping} ${ styles[`animation12`] }`}>
                          了解其他城堡的戰況
                          <span className={styles.blinkingCursor}></span>
                      </div>
                </div>
            </div>
      )
      
      let currentStage;
      switch(stage){
        case 'intro':
          currentStage = introItem;
          break;

        case 'chooseSlides':
          currentStage = chooseSlidesItem;
          break;

        case 'slides':
          currentStage = slidesItem;
          break;

        case 'userPosition': 
          currentStage = userPositionItem;
          break;

        case 'results':
          currentStage = resultsItem;
          break;

        case 'others':
          currentStage = othersItem;
          break;

        default:
          //op
      }
      return (
        <div className={styles.wrap}>
            <div className={styles.innerWrap}>
               {currentStage}
            </div>
        </div>
      )
  }
}
class UserPosition extends Component {
  
  render(){
      const styles = require('./Issue.scss');  
      const { userPosition, currentIssue, handleBackStage } = this.props;
     
      let positionChoice; 
      if(userPosition === "贊成"){
        positionChoice = `你決定加入贊成方陣營，努力推動${currentIssue.statement}。`;
      }
      if(userPosition === "反對"){
        positionChoice = `你決定加入反對方陣營，堅決反對${currentIssue.statement}。`;
      }
      if(userPosition === "不確定"){
        positionChoice = `目前為止，你還無法下決定。你決定再想想⋯`;
      }

      return (
        <div>
            <div className={styles.backStage}
                 onClick={handleBackStage.bind(null)}>回到上一步
            </div>
            <div className={styles.storyBlock}>
              <div className={`${styles.cssTyping} ${ styles[`animation12`] }`}>{positionChoice}</div>
            </div>
        </div>
      )
  }
}


class Slides extends Component {
   
    render(){
      const styles = require('./Issue.scss');  
      const { handleChoosePosition, currentIssue, showSlides, handleBackStage } = this.props;
      
      let slideshowBlock;
      if(showSlides === true){
        slideshowBlock = <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>
      }

      let userPositionBlock = (showSlides==="undecided") ? "":(
          <div>
              <div className={styles.backStage}
                   onClick={handleBackStage.bind(null)}>回到上一步
              </div>
              <div className={styles.storyBlock}>
                <div className={`${styles.cssTyping} ${ styles[`animation14`] }`}>{currentIssue.statement}，你選擇的陣營是？（Y/n/s）
                    <span className={styles.blinkingCursor}></span>
                </div>
              </div>
              <div className={styles.actionButtons}>
                  <div className={styles.actionButton} onClick={handleChoosePosition.bind(this,"贊成")}>贊成</div>
                  <div className={styles.actionButton} onClick={handleChoosePosition.bind(this,"反對")}>反對</div>
                  <div className={styles.actionButton} onClick={handleChoosePosition.bind(this,"不確定")}>跳過</div>
              </div>
          </div>
      );

      return (
        <div>
          {slideshowBlock}
          {userPositionBlock}
        </div>
      )
    }


}
class ChooseSlides extends Component {
   
    render(){
      const styles = require('./Issue.scss');  
      const { handleChooseSlides, handleBackStage } = this.props;
    
      return (
          <div>
              <div className={styles.backStage}
                 onClick={handleBackStage.bind(null)}>回到上一步
              </div>
              <div className={styles.storyBlock}>
                  <div className={`${styles.cssTyping} ${ styles[`animation14`] }`}>
                      選邊站前，想先聽聽背景介紹嗎？（Y/n）
                      <span className={styles.blinkingCursor}></span>
                  </div>
              </div>
              <div className={styles.actionButtons}>
                <div className={styles.actionButton}
                     onClick={handleChooseSlides.bind(this, true)}>好</div>
                <div className={styles.actionButton}
                     onClick={handleChooseSlides.bind(this, false)}>不要</div>
              </div>
          </div>
      )
    }


}
class Intro extends Component {
 

  render(){
    const styles = require('./Issue.scss');     
    const { lines, currentLineIndex, handleAddLine, handleBackStage }  = this.props;
    const breakLines = [1, 3, 6, 9];

    let lineItems = lines.map((value, index)=>{
        
        let blink = (index === currentLineIndex)? <span className={styles.blinkingCursor}></span> : "";
        let data = lines[index];
        let animationClass = styles[`animation${data.length}`] ? styles[`animation${data.length}`] : styles[`animation12`];
        let paragraphBreaks = (breakLines.indexOf(index)!==-1)? <div><br/></div> : "";
        return(
          <div>
            {paragraphBreaks}
            <div className={`${styles.cssTyping} ${ animationClass }`} key={index}>
              <div className={`${styles.cssText} `}>
                {data}
              </div>
              {blink}
            </div>
          </div>

        )
    });

    let optionButton = (
      <div className={styles.actionButtons}>
        <div className={styles.arrowRight}
             onClick={handleAddLine.bind(this)}></div>
      </div>
    )

    return( 
        <div className={styles.withMargin}>
            
            <div className={styles.storyBlock}>
                {lineItems}
                {optionButton}
            </div>
            
        </div>
        
    )
      
  }
}

