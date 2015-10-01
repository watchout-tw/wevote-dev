import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import Slideshow from '../../components/Slideshow/Slideshow.js';
import IssueView from '../../components/IssueView/IssueView.js';
import AnimatedScript from '../../components/AnimatedScript/AnimatedScript.js';

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

    
    
    if(e.keyCode === b || e.keyCode === B){
      e.preventDefault();
      this._handleBackStage();
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
   




    // switch(stage){
    //   case 'intro':
    //       if( e.keyCode === SPACE ) {
    //         e.preventDefault();
    //         this._handleShowIntro(); 
    //       }
    //       break;
      
      
    //   case 'chooseSlides':
    //       if( e.keyCode === Y || e.keyCode === y) {
    //         e.preventDefault();
    //         this._handleChooseSlides(true);
            
    //       }
    //       if( e.keyCode === N || e.keyCode === n ) {
    //         e.preventDefault();
    //         this._handleChooseSlides(false);
    //       }

    //       if( e.keyCode === SPACE ) {
    //         e.preventDefault();
    //         if(!this.state.showSlides){
              
    //         }else{
    //           this.setState({
    //             stage: "choosePosition"
    //           }) 
    //         }
            
    //       }
    //       break;

    //   case 'slides':
    //       if( e.keyCode === SPACE ) {
    //           this.setState({
    //             stage: "choosePosition"
    //           }) 
    //       }
    //       break;

    //   case 'choosePosition':
    //       const {issues} = this.props;
    //       const currentIssueName = this.props.params.issueName;
    //       const currentIssue = issues[currentIssueName];

    //       if( e.keyCode === Y || e.keyCode === y) {
    //         e.preventDefault();
    //         this._handleChoosePosition({value:"贊成", issue:currentIssue}); 

    //       }
    //       if( e.keyCode === N || e.keyCode === n ) {
    //         e.preventDefault();
    //         this._handleChoosePosition({value:"反對", issue:currentIssue});
    //       }
    //       if( e.keyCode === S || e.keyCode === s ) {
    //         e.preventDefault();
    //         this._handleChoosePosition({value:"不確定", issue:currentIssue}); 
            
    //       }
    //       break;
          
    //   case 'results': 
    //       if( e.keyCode === SPACE ) {
    //         e.preventDefault();
    //         this.setState({
    //           stage: "others"
    //         }) 
    //       }
    //       break;

    //   default:
    //   //no op
    // }
    
  }
  _handleNext(){
     
    const {stage, shouldAnimated} = this.state;
    console.log("[ handle next ], shouldAnimated="+shouldAnimated)

    switch(stage){
        case 'intro':
          this._handleSetStageForward("introStory");
          break;

        case 'introStory':
          if(shouldAnimated){
            console.log("> SET TO STATIC")
            this.setState({
               shouldAnimated: false 
            })
          }else{
            this.setState({
               shouldAnimated: true
            })
            this._handleSetStageForward("chooseSlides");
          }
          break;
    }
  }
  _handleChoice(choice){
    const {stage} = this.state;
    console.log("[ handle choice ]")

    switch(stage){
        case 'chooseSlides':
          let showSlides = (choice === Y) ? true : false ;
          let nextStage = (choice === Y) ? "slides" : "choosePosition" ;
          this.setState({
            showSlides: showSlides
          })
          this._handleSetStageForward(nextStage);

          break;

         
    }
  }
  _handleSetStageForward(value, event){// Forward

    console.log("[handle set stage forward]")
    const hasNext = ["intro", "introStory"];
    let shouldShowNext = (hasNext.indexOf(value) !== -1) ? true : false ;

    this.setState({
        stage: value,
        showNext: shouldShowNext
    })  
  }
  componentWillReceiveProps(nextProps){
    
    const {issues} = this.props;
    const currentIssueName = this.props.params.issueName;
    const nextIssueName = nextProps.params.issueName
    const {stage} = this.state;

    if(currentIssueName !== nextIssueName || (stage !== "intro")){
        const nextIssue = issues[nextIssueName];
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
    
      const styles = require('./Issue.scss');
      const {issues} = this.props;
      const {stage, shouldAnimated, showNext, showSlides, userPosition} = this.state;
  
      // 從 URL 知道現在讀的議題頁面
      const currentIssueName = this.props.params.issueName;
      // 拿該議題的資料
      const currentIssue = issues[currentIssueName];
      // 設定一開始看到的結果圖表 view，共有 parties, legislators, positions 三種 
      const currentView = this.props.params.view || "parties";

      console.log("==== RENDER:"+stage+"=====");
     

      let introItem = (
            <div className={styles.withMargin}>
            
                <AnimatedScript stage={stage}
                                issue={currentIssue}
                                shouldAnimated={shouldAnimated}
                                showNext={showNext}
                                handleNext={this._handleNext.bind(this)}/>
                <div className={styles.keyboardHint}>
                  （按空白鍵繼續）
                </div>
            
            </div>
      )
     
      let slideshowBlock = (showSlides === true) ? <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/> : "";
      let slidesItem = (
          <div>
              <AnimatedScript stage={stage}
                              issue={currentIssue}
                              shouldAnimated={shouldAnimated}
                              showNext={showNext}
                              handleNext={this._handleNext.bind(this)}/>
              {slideshowBlock}
          </div>
      )


      let resultsItem;
      let othersItem;
     
     
      // let resultsItem = (
      //       <Results handleChoosePosition={this._handleChoosePosition.bind(this)}
      //                stage={stage}
      //                lines={lines}
      //                currentLineIndex={currentLineIndex}
      //                currentIssue={currentIssue}
      //                currentIssueName={currentIssueName}
      //                currentView={currentView}
      //                userPosition={userPosition}
      //                handleBackStage={this._handleBackStage.bind(this)}
      //                handleSeeOthers={this._handleSeeOthers.bind(this)}
      //                handleSetStage={this._handleSetStage.bind(this)}/>
      // )

      // let othersItem = (
      //       <div>
      //           <div className={styles.backStage}
      //                onClick={this._handleBackStage.bind(this)}>回到上一步 (b)
      //           </div>
    
      //           <div className={styles.storyBlock}>
                      
      //                 <div className={`${styles.cssTyping} ${ styles[`animation12`] }`}>
      //                     了解其他城堡的戰況
      //                     <span className={styles.blinkingCursor}></span>
      //                 </div>
                      
      //           </div>
      //       </div>
      // )
      
      let stageItem;
      switch(stage){
        case 'intro':
        case 'introStory':
          stageItem = introItem;
          break;

        case 'chooseSlides':
        case 'slides':
          stageItem = slidesItem;
          break;

        case 'choosePosition':
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
               {stageItem}
            </div>
        </div>
      )
  }
}
// class Results extends Component {
  
//   render(){
//       const styles = require('./Issue.scss');  
//        // 選擇立場
//       const { handleChoosePosition, currentIssue, currentView, currentIssueName } = this.props;
      
//       const { userPosition, handleBackStage, handleSeeOthers, stage, handleSetStage, lines, currentLineIndex } = this.props;
      
//       let userPositionBlock;
//       let resultBlock;
//       if( stage === "choosePosition" ){
//           userPositionBlock = (
//               <div>
//                   <div className={styles.storyBlock}>
//                       <div className={`${styles.cssTyping} ${ styles[`animation14`] }`}>{currentIssue.statement}，你選擇的陣營是？（Y/n/s）
//                           <span className={styles.blinkingCursor}></span>
//                       </div>
//                   </div>
//                   <div className={styles.actionButtons}>
//                       <div className={styles.actionButton} onClick={handleChoosePosition.bind(this,{value:"贊成", issue:currentIssue} )}>贊成</div>
//                       <div className={styles.actionButton} onClick={handleChoosePosition.bind(this,{value:"反對", issue:currentIssue} )}>反對</div>
//                       <div className={styles.actionButton} onClick={handleChoosePosition.bind(this,{value:"不確定", issue:currentIssue} )}>跳過</div>
//                   </div>
//               </div>
//           );

          
//       }else{
          
//           let lineItems = lines.map((value, index)=>{
        
//               let blink = (index === currentLineIndex)? <span className={styles.blinkingCursor}></span> : "";
//               let data = lines[index] || [];
//               let animationClass = styles[`animation${data.length}`] ? styles[`animation${data.length}`] : styles[`animation12`];
//               return(
//                 <div>
//                   <div className={` ${styles.cssTyping} ${animationClass} `} 
//                        key={index}>
//                        <div className={`${styles.cssText} `}>
//                          {data}
//                        </div>
//                        {blink}
//                   </div>
//                 </div>
      
//               )
//           });

          

//           userPositionBlock = (
//             <div className={styles.storyBlock}>
              
//               {lineItems}
              
//               <div className={styles.actionButtons}>
//                 <div className={styles.arrowRight}
//                      onClick={handleSetStage.bind(this, "others")}></div>
//               </div>
//             </div>
//           )

//           resultBlock = (
//             <IssueView userPosition={userPosition}
//                        currentView={currentView}
//                        currentIssue={currentIssue}
//                        currentIssueName={currentIssueName}
//                        handleSeeOthers={handleSeeOthers}
//                        handleBackStage={handleBackStage} /> 
//           )
          
//       }
     
//       return (
//         <div>
//             <div className={styles.backStage}
//                  onClick={handleBackStage.bind(null)}>回到上一步 (b)
//             </div>
//             {userPositionBlock}
//             {resultBlock}
//         </div>
//       )
//   }
// }


// class Slides extends Component {
   
//     render(){

//       const styles = require('./Issue.scss');  

//       // 選擇要不要顯示 slides
//       const { handleChooseSlides, handleBackStage, showSlides, stage,
//               currentIssue, handleChoosePosition, handleSetStage, 
//               lines, currentLineIndex } = this.props;

//       console.log("Hello, I'm Slide. showSlides is:"+showSlides);

//       let lineItems = lines.map((value, index)=>{
      
//           let blink = (index === currentLineIndex)? <span className={styles.blinkingCursor}></span> : "";
//           let data = lines[index];
//           let animationClass = styles[`animation${data.length}`] ? styles[`animation${data.length}`] : styles[`animation12`];
//           return(
//             <div>
//               <div className={` ${styles.cssTyping} ${animationClass} `} 
//                    key={index}>
//                    <div className={`${styles.cssText} `}>
//                      {data}
//                    </div>
//                    {blink}
//               </div>
//             </div>
      
//           )
//       });

//       let chooseSlidesBlock = (
//         <div>
//               <div className={styles.backStage}
//                    onClick={handleBackStage.bind(null)}>回到上一步 (b)
//               </div>
//               <div className={styles.storyBlock}>
//                   {lineItems}
//               </div>
//               <div className={styles.actionButtons}>
//                   <div className={styles.actionButton}
//                        onClick={handleChooseSlides.bind(this, true)}>好</div>
//                   <div className={styles.actionButton}
//                        onClick={handleChooseSlides.bind(this, false)}>不要</div>
//               </div>
//          </div>
//       );

//       let afterChooseSlides = (
//         <div>
//               <div className={styles.backStage}
//                    onClick={handleBackStage.bind(null)}>回到上一步 (b)
//               </div>
//               <div className={styles.storyBlock}>
//                   <div className={`${styles.cssTyping} ${ styles[`animation14`] }`}>
//                       以下是{currentIssue.title}的背景資訊
//                       <span className={styles.blinkingCursor}></span>
//                   </div>
//                   <div className={styles.actionButtons}>
//                     <div className={styles.arrowRight}
//                          onClick={ handleSetStage.bind(this, "results")}></div>
//                   </div>
//               </div>
//         </div>
//       );
      
//       let mainItem = (stage === "chooseSlides") ? chooseSlidesBlock : afterChooseSlides;

//       let slideshowBlock;
//       if(showSlides === true){
//         slideshowBlock = <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>
//       }

     

//       return (
//         <div>
//           {mainItem}
//           {slideshowBlock}
//         </div>
//       )
//     }


// }


// class Intro extends Component {
 

//   render(){
//     const styles = require('./Issue.scss');     
//     const { currentIssue, lines, currentLineIndex, handleShowIntro, handleBackStage }  = this.props;
//     const breakLines = [0, 5, 6, 8, 10];
    
//     if(!lines) return <div></div>

//     let lineItems = lines.map((value, index)=>{
        
//         let blink = (index === currentLineIndex)? <span className={styles.blinkingCursor}></span> : "";
//         let data = lines[index];
//         let animationClass = styles[`animation${data.length}`] ? styles[`animation${data.length}`] : styles[`animation12`];
        
//         let paragraphBreaks = (breakLines.indexOf(index)!==-1)? <div><br/></div> : "";
//         return(
//           <div>
//             {paragraphBreaks}
//             <div className={` ${styles.cssTyping} ${animationClass} `} 
//                  key={index}>
//                  <div className={`${styles.cssText} `}>
//                    {data}
//                  </div>
//                  {blink}
//             </div>
//           </div>

//         )
//     });

//     let optionButton = (
//       <div className={styles.actionButtons}>
//         <div className={styles.arrowRight}
//              onClick={handleShowIntro.bind(this)}></div>
//       </div>
//     )

    

//     return( 
//         <div className={styles.withMargin}>
            
//             <AnimatedScript stage={stage}/>
//             <div className={styles.keyboardHint}>
//               （按空白鍵繼續）
//             </div>
            
//         </div>
        
//     )
      
//   }
// }

