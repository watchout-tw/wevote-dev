import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import AnimatedScript from '../../components/AnimatedScript/AnimatedScript.js';
import Slideshow from '../../components/Slideshow/Slideshow.js';
import IssueFigure from '../../components/IssueFigure/IssueFigure.js';


//handle key down event, key code
const SPACE = 32,
          Y = 89,
          y = 121,
          N = 78,
          n = 110,
          S = 83,
          s = 115,
          B = 66,
          b = 98;

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
        stage: "intro", 
        shouldAnimated: true,
        showNext: true,
        showSlides: false,
        userPosition: "" //贊成, 反對, 不確定
        
    }
  
  }
  
  componentDidMount(){ 
      window.addEventListener('keydown', this._handleKeyDown.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener('keydown', this._handleKeyDown.bind(this));  
  }
 
  _handleKeyDown(e){

    // back
    if(e.keyCode === b || e.keyCode === B){
      if(this.state.stages !== "intro"){
        e.preventDefault();
        this._handleBackStage();  
      }
      return;
    }

    // continue
    const { stage } = this.state;
    if( e.keyCode === SPACE ) {
        e.preventDefault();
        this._handleNext();
        return;
    }

    // choice
    if( e.keyCode === Y || e.keyCode === y) {
      e.preventDefault();
      this._handleChoice(Y);
      return;
    }
    if( e.keyCode === N || e.keyCode === n ) {
      e.preventDefault();
      this._handleChoice(N);
      return;
    }
    if( e.keyCode === S || e.keyCode === s ) {
      e.preventDefault();
      this._handleChoice(S);
      return;
    }
  
    
  }
  _handleNext(){
     
    const {stage, shouldAnimated, completed} = this.state;
    //console.log("[ handle next ], shouldAnimated="+shouldAnimated)

    switch(stage){
        case 'intro':
          this._handleSetStage("introStory");
          break;

        case 'introStory':
          if(shouldAnimated){
            //console.log("> 跳過動態打字")
            this.setState({
               shouldAnimated: false 
            })
          }else{
            this.setState({
               shouldAnimated: true
            })
            this._handleSetStage("chooseSlides");
          }
          break;

        case 'slides':
            this._handleSetStage("choosePosition");
            break;

        case 'results':
            this._handleSetStage("others");

            
            break;

        case 'others':
        break;
       
    }
  }
  _handleChoice(choice){
    const {stage} = this.state;
    console.log("[ handle choice ]")

    switch(stage){
        case 'chooseSlides':
          if(choice===S){
            return;
          }
          let showSlides = (choice === Y) ? true : false ;
          let nextStage = (choice === Y) ? "slides" : "choosePosition" ;
          this.setState({
            showSlides: showSlides
          })
          this._handleSetStage(nextStage);
          break;

        case 'choosePosition':

          if(choice===Y){
              this.setState({
                  userPosition: "贊成"
              })
              let {currentIssueName} = this.props;
              this.props.handleCompleted(currentIssueName);
              this._handleSetStage("results");
          }
          if(choice===N){
              this.setState({
                  userPosition: "反對"
              })
              let {currentIssueName} = this.props;
              this.props.handleCompleted(currentIssueName);
              this._handleSetStage("results");
          }
          if(choice===S){
              this.setState({
                  userPosition: "不確定"
              })
  
              this._handleSetStage("results");

          }
          break;

        default:
        break;

         
    }
  }
  _handleBackStage(){
    const stages = ['intro', 'chooseSlides', 'slides', 'choosePosition','results','others'];
    const {stage, showSlides} = this.state;
    let index = stages.indexOf(stage) - 1;
    if(index < 0)
       index = 0;

    let backTo = stages[index];

    // console.log("<>"+backTo);
    // console.log("<><>"+showSlides);

    if(backTo === "slides" && showSlides === false){
       backTo = "chooseSlides";
      //否則會回到 slide 看到一片空白
    }

    this._handleSetStage(backTo);
  }
  _handleSetStage(value, event){

    //console.log("[handle set stage]")
    const hasNext = ["intro", "introStory", "slides", "results"];
    let shouldShowNext = (hasNext.indexOf(value) !== -1) ? true : false ;

    // reset 'showSlides' state, otherwise it will show according to previous choice
    
    let resetSlideChoiceTo = (value==="chooseSlides") ? false : this.state.showSlides;
    this.setState({
        stage: value,
        lines: [],
        showNext: shouldShowNext, 
        showSlides: resetSlideChoiceTo
    })
    this.props.handleUpdateStage(value);  
  }
  componentWillReceiveProps(nextProps){
    
    const {issues} = this.props;
    const currentIssueName = this.props.currentIssueName;
    const nextIssueName = nextProps.currentIssueName
    

    if(currentIssueName !== nextIssueName){
        
        const nextIssue = issues[nextIssueName];
        console.log("RESET STAGE PARAMETERS")
        console.log("currentIssue:"+currentIssueName);
        console.log("nextIssue:"+nextIssueName);
        
        this.props.handleUpdateStage("intro"); 

        this.state = {
            stage: "intro", 
            shouldAnimated: true,
            showNext: true,
            showSlides: false,
            userPosition: "" //贊成, 反對, 不確定
        }
    }
  


  }

  render(){
    
      const styles = require('./InteractiveIssue.scss');
      const {issues, currentIssueName, currentView, skipInteractive, setCurrentView} = this.props;
      const {stage, shouldAnimated, showNext, showSlides, userPosition} = this.state;
  
      // 拿該議題的資料
      const currentIssue = issues[currentIssueName];
     

      //console.log("==== RENDER:"+stage+"=====");
      
      let backItem = ((stage !== "intro") && (stage !=="introStory")) ? (
              <div className={styles.backStage}
                   onClick={this._handleBackStage.bind(this)}>回到上一步 (b)
              </div>)
              :(<div className={styles.backStage}></div>);


      let introItem = (
            <div className={styles.keyboardHint}>
                  （按空白鍵繼續）或是 <div className={styles.skipInteractive}
                                         onClick={skipInteractive.bind(null)}>直接看結果</div>
            </div>
      )
     
      let slidesItem = (showSlides === true) ? <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/> : "";
    
      let resultsItem = (stage === "results") ? (
        <IssueFigure currentView={currentView}
                     currentIssue={currentIssue}
                     currentIssueName={currentIssueName}
                     setCurrentView={setCurrentView} /> 
      ):"";


      let othersItem;

      let choiceItems;
      
      let stageItem;
      switch(stage){
        case 'intro':
        case 'introStory':
          stageItem = introItem;
          break;

        case 'chooseSlides':
          choiceItems = (
            <div className={styles.actionButtons}>
               <div className={styles.actionButton} onClick={this._handleChoice.bind(this,Y)}>好</div>
               <div className={styles.actionButton} onClick={this._handleChoice.bind(this,N)}>不要</div>
            </div>);
          stageItem = slidesItem;
          break;

        case 'slides':
          stageItem = slidesItem;
          break;

        case 'choosePosition':
          choiceItems = (
            <div className={styles.actionButtons}>
               <div className={styles.actionButton} onClick={this._handleChoice.bind(this,Y)}>贊成</div>
               <div className={styles.actionButton} onClick={this._handleChoice.bind(this,N)}>反對</div>
               <div className={styles.actionButton} onClick={this._handleChoice.bind(this,S)}>跳過</div>
            </div>);
          stageItem = resultsItem;
          break;

        case 'results':
          stageItem = resultsItem;
          break;

        case 'others':
          stageItem = othersItem;
          break;

        default:
          //op
      }
      return (
        <div className={styles.wrap}>
            <div className={styles.innerWrap}>
                <div>
                    {backItem}
                    <AnimatedScript stage={stage}
                                    issue={currentIssue}
                                    shouldAnimated={shouldAnimated}
                                    showNext={showNext}
                                    handleNext={this._handleNext.bind(this)}
                                    userPosition={userPosition}/>
                    {choiceItems}
                </div>

                {stageItem}
            </div>
        </div>
      )
  }
  //
          
}

