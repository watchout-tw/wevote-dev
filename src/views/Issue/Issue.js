import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import Slideshow from '../../components/Slideshow/Slideshow.js';
import IssueView from '../../components/IssueView/IssueView.js';

const issueOrder = ['婚姻平權','罷免','公投','核四'];
const chapterOrder = ['一','二','三','四'];

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

    let preservedLines = this._generateIntroLines();
   
    this.state = {
        stage: "intro", 
        
        preservedLines : preservedLines,
        currentLineIndex: 0,
        lines : [preservedLines[0]],

        currentScript: "",
        
        showSlides: "",
        userPosition: "", //贊成, 反對, 不確定

        resetScript: false
    }
  
  }
  _generateIntroLines(){
    const {issues} = this.props;
    const currentIssueName = this.props.params.issueName;
    const issue = issues[currentIssueName];
    const index = issueOrder.indexOf(issue.title);
    const chapter = chapterOrder[index];

    return [
          `任務${chapter}：${issue.title}城堡`,
          `${issue.title}城堡荒煙瀰漫，壟罩迷霧。`,
          `島民都不太清楚這個城堡的內部，`,
          `也因此被怪獸佔據，`,
          `黑暗的力量持續造成諸多問題。`,
          `為了創造美好家園，大家都知道必須驅逐怪獸。`,
          `現在有三方勇者要前往驅逐怪獸，`,
          `完成島嶼主人交付的任務。`,
          `正方勇者提出使用${issue.statement}的方式戰鬥，`,
          `但反方勇者卻不贊同。`,
          `另外則有一些模糊意見的勇者，`,
          `還拿不定主意⋯⋯`
    ];

  }
  _generateSlidesLines(){
      return [
        `身為島嶼主人的你，在決定要選任哪一方的勇士前，`,
        `要先看看戰役簡介嗎？（Y/n）`
      ];
  }
  _generateDecisionLines(userPosition, issue){
      let positionChoice1, positionChoice2; 
      if(userPosition === "贊成"){
        positionChoice1 = `你決定選任贊成方的勇士，`;
        positionChoice2 = `使用${issue.statement}的方式戰鬥。`;
      }
      if(userPosition === "反對"){
        positionChoice1 = `你決定選任反對方的勇士，`;
        positionChoice2 = `反對用${issue.statement}的方式戰鬥。`;
      }
      if(userPosition === "不確定"){
        positionChoice1 = `目前為止，你還無法下決定。`;
        positionChoice2 = `你決定再想想⋯`;
      }
      return [
        positionChoice1,
        positionChoice2,
        `Fighto!!!`,
        `這是雙方過去的交戰紀錄：`
      ]
  }

  componentDidMount(){ 
      window.addEventListener('keydown', this._handleKeyDown.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener('keydown', this._handleKeyDown.bind(this));  
  }
  _resetScript(){
    console.log("STOP-")
    const {currentScript} = this.state;
    if(currentScript){
      currentScript.map((script, index)=>{
        clearTimeout(script);
      })
    }
    this.setState({
      resetScript: true
    })

  }
  _runScript(preservedLines){

    console.log("RUN-")
    //reset current lines & index
    let adjustLines = (this.state.resetScript) ? [] : this.state.lines;
    this.setState({
        currentLineIndex: 0,
        lines: adjustLines,
        resetScript: false
    });

    let {currentLineIndex, lines} = this.state;
    this._resetScript();
    
    let newScript = [];

    preservedLines.map((value,index)=>{
        
        let script = setTimeout(()=>{
          
            console.log(">"+value)

            lines.push(value);

            this.setState({
              lines: lines,
              currentLineIndex: this.state.currentLineIndex+1
            });
  
        }, 500*index);

        newScript.push(script);
    });

    this.setState({
        currentScript: newScript,
    });

  }

  _handleShowIntro(issue){
    const {currentLineIndex} = this.state;
    if(currentLineIndex === 0){
        let preservedLines = this._generateIntroLines(issue);
        preservedLines.shift();

        this._runScript(preservedLines);

    }else{
        this._resetScript();

        let preservedLines = this._generateSlidesLines();
        this._runScript(preservedLines);
        
        this.setState({
           stage: "chooseSlides"
        });

    }

  }

  _handleChooseSlides(value, event){
      let nextStage;
      
      if(value === true){
        nextStage = "slides";

      }else{
        nextStage = "choosePosition";
      }
    
      this.setState({
        showSlides: value,
        stage: nextStage 
      })
  }
  _handleChoosePosition(action, event){
    let preservedLines = this._generateDecisionLines(action.value, action.issue);
    this._runScript(preservedLines);

    this.setState({
      stage: "results"
    })
  }
  _handleSeeOthers(){
    this.setState({
        stage: "others"
    })  
  }
  _handleBackStage(){
    const stages = ['intro', 'chooseSlides', 'slides', 'choosePosition','results','others'];
    const {stage} = this.state;
    let index = stages.indexOf(stage) - 1;
    if(index < 0)
       index = 0;
    this.setState({
      stage: stages[index],
      currentLineIndex: 0
    })
  }
  _handleSetStage(value, event){
    this.setState({
        stage: value
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
            this._handleShowIntro(); 
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

          if( e.keyCode === SPACE ) {
            e.preventDefault();
            if(!this.state.showSlides){
              
            }else{
              this.setState({
                stage: "choosePosition"
              }) 
            }
            
          }
          break;

      case 'choosePosition':
          const {issues} = this.props;
          const currentIssueName = this.props.params.issueName;
          const currentIssue = issues[currentIssueName];

          if( e.keyCode === Y || e.keyCode === y) {
            e.preventDefault();
            this._handleChoosePosition({value:"贊成", issue:currentIssue}); 

          }
          if( e.keyCode === N || e.keyCode === n ) {
            e.preventDefault();
            this._handleChoosePosition({value:"反對", issue:currentIssue});
          }
          if( e.keyCode === S || e.keyCode === s ) {
            e.preventDefault();
            this._handleChoosePosition({value:"不確定", issue:currentIssue}); 
            
          }
          break;
          
      case 'results': 
          if( e.keyCode === SPACE ) {
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
    const {stage} = this.state;
    const currentIssueName = this.props.params.issueName;
    const nextIssueName = nextProps.params.issueName

    if(currentIssueName !== nextIssueName){
        const nextIssue = issues[nextIssueName];
        let preservedLines = this._generateIntroLines(nextIssue);
        this.state = {
            stage: "intro",
            showSlides: "",
            userPosition: "",
            lines : preservedLines[0],
            resetScript: false
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

      console.log("==== RENDER:"+stage+"=====");
      console.log("currentLineIndex:"+currentLineIndex);

      let introItem = (
            <Intro currentLineIndex={currentLineIndex}
                   lines={lines}
                   handleShowIntro={this._handleShowIntro}
                   handleBackStage={this._handleBackStage.bind(this)} />
      )
      
      let slidesItem = (
            <Slides handleChooseSlides={this._handleChooseSlides.bind(this)}
                    showSlides={showSlides}
                    currentIssue={currentIssue}
                    lines={lines}
                    currentLineIndex={currentLineIndex}
                    handleBackStage={this._handleBackStage.bind(this)}
                    handleSetStage={this._handleSetStage.bind(this)}/>
      )
     
      let resultsItem = (
            <Results handleChoosePosition={this._handleChoosePosition.bind(this)}
                     stage={stage}
                     lines={lines}
                     currentLineIndex={currentLineIndex}
                     currentIssue={currentIssue}
                     currentIssueName={currentIssueName}
                     currentView={currentView}
                     userPosition={userPosition}
                     handleBackStage={this._handleBackStage.bind(this)}
                     handleSeeOthers={this._handleSeeOthers.bind(this)}
                     handleSetStage={this._handleSetStage.bind(this)}/>
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
        case 'slides':
          currentStage = slidesItem;
          break;

        case 'choosePosition':
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
class Results extends Component {
  
  render(){
      const styles = require('./Issue.scss');  
       // 選擇立場
      const { handleChoosePosition, currentIssue, currentView, currentIssueName } = this.props;
      
      const { userPosition, handleBackStage, handleSeeOthers, stage, handleSetStage, lines, currentLineIndex } = this.props;
      
      let userPositionBlock;
      let resultBlock;
      if( stage === "choosePosition" ){
          userPositionBlock = (
              <div>
                  <div className={styles.storyBlock}>
                      <div className={`${styles.cssTyping} ${ styles[`animation14`] }`}>{currentIssue.statement}，你選擇的陣營是？（Y/n/s）
                          <span className={styles.blinkingCursor}></span>
                      </div>
                  </div>
                  <div className={styles.actionButtons}>
                      <div className={styles.actionButton} onClick={handleChoosePosition.bind(this,{value:"贊成", issue:currentIssue} )}>贊成</div>
                      <div className={styles.actionButton} onClick={handleChoosePosition.bind(this,{value:"反對", issue:currentIssue} )}>反對</div>
                      <div className={styles.actionButton} onClick={handleChoosePosition.bind(this,{value:"不確定", issue:currentIssue} )}>跳過</div>
                  </div>
              </div>
          );

          
      }else{
          
          let lineItems = lines.map((value, index)=>{
        
              let blink = (index === currentLineIndex)? <span className={styles.blinkingCursor}></span> : "";
              let data = lines[index];
              let animationClass = styles[`animation${data.length}`] ? styles[`animation${data.length}`] : styles[`animation12`];
              return(
                <div>
                  <div className={` ${styles.cssTyping} ${animationClass} `} 
                       key={index}>
                       <div className={`${styles.cssText} `}>
                         {data}
                       </div>
                       {blink}
                  </div>
                </div>
      
              )
          });

          

          userPositionBlock = (
            <div className={styles.storyBlock}>
              
              {lineItems}
              
              <div className={styles.actionButtons}>
                <div className={styles.arrowRight}
                     onClick={handleSetStage.bind(this, "others")}></div>
              </div>
            </div>
          )

          resultBlock = (
            <IssueView userPosition={userPosition}
                       currentView={currentView}
                       currentIssue={currentIssue}
                       currentIssueName={currentIssueName}
                       handleSeeOthers={handleSeeOthers}
                       handleBackStage={handleBackStage} /> 
          )
          
      }
     
      return (
        <div>
            <div className={styles.backStage}
                 onClick={handleBackStage.bind(null)}>回到上一步
            </div>
            {userPositionBlock}
            {resultBlock}
        </div>
      )
  }
}


class Slides extends Component {
   
    render(){
      const styles = require('./Issue.scss');  

      // 選擇要不要顯示 slides
      const { handleChooseSlides, handleBackStage, showSlides, 
              currentIssue, handleChoosePosition, handleSetStage, 
              lines, currentLineIndex } = this.props;

      let lineItems = lines.map((value, index)=>{
      
          let blink = (index === currentLineIndex)? <span className={styles.blinkingCursor}></span> : "";
          let data = lines[index];
          let animationClass = styles[`animation${data.length}`] ? styles[`animation${data.length}`] : styles[`animation12`];
          return(
            <div>
              <div className={` ${styles.cssTyping} ${animationClass} `} 
                   key={index}>
                   <div className={`${styles.cssText} `}>
                     {data}
                   </div>
                   {blink}
              </div>
            </div>
      
          )
      });

      let chooseSlidesBlock = (
        <div>
              <div className={styles.backStage}
                   onClick={handleBackStage.bind(null)}>回到上一步
              </div>
              <div className={styles.storyBlock}>
                  {lineItems}
              </div>
              <div className={styles.actionButtons}>
                  <div className={styles.actionButton}
                       onClick={handleChooseSlides.bind(this, true)}>好</div>
                  <div className={styles.actionButton}
                       onClick={handleChooseSlides.bind(this, false)}>不要</div>
              </div>
         </div>
      );

      let afterChooseSlides = (
        <div>
              <div className={styles.backStage}
                   onClick={handleBackStage.bind(null)}>回到上一步
              </div>
              <div className={styles.storyBlock}>
                  <div className={`${styles.cssTyping} ${ styles[`animation14`] }`}>
                      以下是{currentIssue.title}的背景資訊
                      <span className={styles.blinkingCursor}></span>
                  </div>
                  <div className={styles.actionButtons}>
                    <div className={styles.arrowRight}
                         onClick={ handleSetStage.bind(this, "results")}></div>
                  </div>
              </div>
        </div>
      );
      
      let mainItem = (showSlides) ? afterChooseSlides : chooseSlidesBlock;

      let slideshowBlock;
      if(showSlides === true){
        slideshowBlock = <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>
      }

     

      return (
        <div>
          {mainItem}
          {slideshowBlock}
        </div>
      )
    }


}
class Intro extends Component {
 

  render(){
    const styles = require('./Issue.scss');     
    const { lines, currentLineIndex, handleShowIntro, handleBackStage }  = this.props;
    const breakLines = [1, 5, 6, 8, 10];
    
    if(!lines) return <div></div>

    let lineItems = lines.map((value, index)=>{
        
        let blink = (index === currentLineIndex)? <span className={styles.blinkingCursor}></span> : "";
        let data = lines[index];
        let animationClass = styles[`animation${data.length}`] ? styles[`animation${data.length}`] : styles[`animation12`];
        
        let paragraphBreaks = (breakLines.indexOf(index)!==-1)? <div><br/></div> : "";
        return(
          <div>
            {paragraphBreaks}
            <div className={` ${styles.cssTyping} ${animationClass} `} 
                 key={index}>
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
             onClick={handleShowIntro.bind(this)}></div>
      </div>
    )

    return( 
        <div className={styles.withMargin}>
            
            <div className={styles.storyBlock}>
                {lineItems}
                {optionButton}
            </div>
            <div className={styles.keyboardHint}>
              （按空白鍵繼續）
            </div>
            
        </div>
        
    )
      
  }
}

