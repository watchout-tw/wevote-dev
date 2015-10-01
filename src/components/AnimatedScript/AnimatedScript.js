import React, {Component, PropTypes} from 'react';

const issueOrder = ['婚姻平權','罷免','公投','核四'];
const chapterOrder = ['一','二','三','四'];


export default class AnimatedScript extends Component {
 
  constructor(props) { super(props)   
    const {issue} = this.props;
    
    this.state = {
        preservedLines : [],
        currentLineIndex: 0,
        lines : [],
        firstLine: "",
        currentScript: {
          "scripts": "",
          "timedOutCount": 0
        },
        scriptRolled: false
    }
     
  
  }
  _clearTimeoutScript(){
    console.log("CLEAR TIMEOUT SCRIPT")
    const {currentScript} = this.state;
    if(currentScript.scripts){
        currentScript.scripts.map((script, index)=>{
          clearTimeout(script);
        })
    }
  }
  _runScript(data){
    
    console.log("RUN SCRIPT-")
    
    //clear timeout script and previous lines
    this._clearTimeoutScript();
    this.setState({
        breakLines: data.breakLines
    });


    // set new timeout script
    let currentLineIndex = 0, lines = [];
    let newScript = [];

    let callback = ()=>{
      this.setState({
        currentScript:{
          scripts: this.state.currentScript.scripts,
          timedOutCount: this.state.currentScript.timedOutCount + 1
        }
      })
    }

    data.preservedLines.map((value,index)=>{
        
        let script = setTimeout(()=>{
          
            console.log(">"+value) 

            lines.push(value);
            this.setState({
              lines: lines,
              currentLineIndex: this.state.currentLineIndex+1
            });
  
        }, 500*index, callback);

        newScript.push(script);
    });

    this.setState({
        currentScript: {
          scripts: newScript,
          timedOutCount: 0
        }
    });

  }
  
  _handleNext(){
     const {stage, shouldAnimated, issue, handleSetStageForward} = this.props;
     const {scriptRolled} = this.state;
     console.log("[ handle next ], shouldAnimated="+shouldAnimated)

     // switch(stage){
     //      case 'intro':
     //        //if(shouldAnimated){
     //          // Roll the script
     //          // let data = this._generateIntroLines(issue);
     //          // this._runScript(data);
     //          // this.setState({
     //          //     scriptRolled: true
     //          // })
     //          handleSetStageForward("introStory");
     //          break;

     //      case 'introStory':
     //        //}else{
     //          // Go to next stage
     //          console.log("- Go to next stage")
     //          //Reset
     //          this.setState({
     //              firstLine: "",
     //              currentLineIndex: 0,
     //              lines: [],
     //              preservedLines: [],
     //              scriptRolled: false
     //          })
     //          handleSetStageForward("chooseSlides");

            
     //      break;
     // }
  }
  _setStage(props){
    const {stage, shouldAnimated, issue} = props;
    const {currentScript} = this.state;
    console.log("[set stage]");
    let data;
    switch(stage){
       case 'intro':
          console.log("-intro")
          data = this._generateIntroLines(issue)
          this.setState({
              firstLine: data.firstLine,
              lines: []
          })
          break;

      case 'introStory':
          // Roll the script
          let data = this._generateIntroLines(issue);
          if(shouldAnimated){
            this._runScript(data);

          }else{
            let allTimedOut = true;
            if(currentScript.scripts.length > currentScript.timedOutCount)
               allTimedOut = false;
             
            if(allTimedOut === false){
              console.log("!stop - [stop current script]")
              this._clearTimeoutScript();
              this.setState({
                lines: data.preservedLines,
                currentLineIndex: data.preservedLines.length-1
              })

            }
            

          }
          break;

      case 'chooseSlides':
          console.log("-chooseSlides")
          data = this._generateSlidesLines();
          this._runScript(data);
          
          
          break;

      default:
          console.log("-default x")

    }
  }
  componentWillMount(){
     this._setStage(this.props); 
  }
  componentWillReceiveProps(nextProps){
     if(this.props.issue !== nextProps.issue){
        this._clearTimeoutScript();
     }
     this._setStage(nextProps);  
  }
  render(){
    const styles = require('./AnimatedScript.scss');     
    const { lines, currentLineIndex, firstLine, breakLines }  = this.state;
    const { shouldAnimated, showNext, stage, handleNext } = this.props;
    
    console.log("=== render ====")
    console.log("firstLine > "+firstLine)
    console.log("stage > "+stage)
    
    let firstLineItem;
    if(firstLine){
        
        let blink = (lines.length===0)? <span className={styles.blinkingCursor}></span> : "";

        firstLineItem = (
            <div className={` ${styles.cssTyping} ${styles[`animation12`]} `} >
               <div className={`${styles.cssText} `}>{firstLine}</div>
               {blink}
            </div>
        );

        
    }
    let lineItems = lines.map((value, index)=>{
        
        let blink;
        if(shouldAnimated){
          blink = (index+1 === currentLineIndex) ? <span className={styles.blinkingCursor}></span> : "";
        }else{
          blink = (index+1 === lines.length) ? <span className={styles.blinkingCursor}></span> : "";
        }

        let data = lines[index];
        let animationClass = styles[`animation${data.length}`] ? styles[`animation${data.length}`] : styles[`animation12`];
        
        let paragraphBreaks;
        if(breakLines)
          paragraphBreaks = (breakLines.indexOf(index)!==-1)? <div><br/></div> : "";
        
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
    let optionButton = (showNext) ? (
      <div className={styles.actionButtons}>
        <div className={styles.arrowRight}
             onClick={handleNext.bind(null)}></div>
      </div>
    ): "";

    // //first line
    // const index = issueOrder.indexOf(currentIssue.title);
    // const chapter = chapterOrder[index];
    // let firstLine = `任務${chapter}：${currentIssue.title}城堡`;

    return( 
        <div className={styles.storyBlock}>
            {firstLineItem}
            {lineItems}
            {optionButton}
        </div>
       
        
    )
      
  }
  _generateIntroLines(issue){
    //first line
    const index = issueOrder.indexOf(issue.title);
    const chapter = chapterOrder[index];

    return {
        firstLine: `任務${chapter}：${issue.title}城堡`,
        preservedLines: [
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
      ],
      breakLines: [0, 5, 6, 8, 10]
    };

  }
  _generateSlidesLines(){
      return {
        firstLine:"",
        preservedLines: [
        `身為島嶼主人的你，在決定要選任哪一方的勇士前，`,
        `要先看看戰役簡介嗎？（Y/n）`
        ],
        breakLines:[]
      };
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

      if(userPosition){
          return { 
            firstLine:"",
            preservedLines: [
              positionChoice1,
              positionChoice2,
              `Fighto!!!`,
              `這是雙方過去的交戰紀錄：`
            ],
            breakLines:[] 
          }

      }else{
          return {
            firstLine:"",
            preservedLines: [
              `這是雙方過去的交戰紀錄：`
            ],
            breakLines:[]
          }

      }   
  }
}



