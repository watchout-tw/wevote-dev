import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import eng2cht from '../../utils/eng2cht';

function scrollTo(element, to, duration){ 
    if (duration <= 0) return;
    let difference = to - element.scrollTop;
    let perTick = difference / duration * 10;
    
    setTimeout(()=>{
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop == to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class QAItem extends Component {
  static propTypes = {   
  }
  constructor(props){ super(props)
      let completed = (props.completed) ? "answer" : "question";//question -> conflict -> anwser
      let shouldReset = (props.completed) ? false : true;
      const {candidatePositions, data} = props;

      //拿到資料的時候就知道誰是 conflict，先記下來，從成 conflictPeople，直接丟給 conflict 去 render
      let conflictPeople = {};
      Object.keys(candidatePositions).map((peopleName, i)=>{
        
        let currentPeople = candidatePositions[peopleName];
        //both have data
        if(currentPeople[data.issueName].record && currentPeople[data.issueName].promise){
            //需要處理 ["none","unknown","evading"] 都是未表態
            //position not the same

            let recordPosition = currentPeople[data.issueName].record.position;
            if(["none","unknown","evading"].indexOf(recordPosition) !== -1){
                recordPosition = "none";
            }
            let promisePosition = currentPeople[data.issueName].promise.position;
            if(["none","unknown","evading"].indexOf(promisePosition) !== -1){
                promisePosition = "none";
            }

            if( recordPosition !== promisePosition){
                conflictPeople[peopleName] = candidatePositions[peopleName];
            }
        }
      })

      this.state = {
          completed: completed,
          conflictPeople: conflictPeople,
          resolvedConflicts: {},
          shouldReset: shouldReset
      }
      //存一個 conflict object, 形式 {"蔣乃辛":"position"}，全部都填滿代表 all the conflict resolve
  }
  _onAnswer(choice, e){
    const {data, recordHandler} = this.props;
    const {conflictPeople} = this.state;

    let conflictCount = Object.keys(conflictPeople).length;
    if(conflictCount > 0){
        //如果有 conflict, 顯示 conflict
        this.setState({
          completed: "conflict",
          shouldReset: false
        })
         //console.log("滑到第一個 conflict")
         // 需要等 timeout 一小段時間，讓 obj 先出現，才能抓到對應位置，知道要滑到哪裡去
         setTimeout(()=>{
            let nextConflictId = `${data.id}-Conflict-0`;
            
            // Scroll to next conflict
            let target = document.getElementById(nextConflictId);
            let targetPos = document.body.scrollTop + target.getBoundingClientRect().top;
         
            scrollTo(document.body, targetPos, 100);
   
         }, 50)


    }else{
        //如果沒有, 到 answer
        this.setState({
          completed: "answer",
          shouldReset: false
        })

    }
 
    recordHandler(data.issueName, data.order, choice);
    this._scrollToAnswer();
  }
  _onShowAnser(){
    this.setState({
      completed: "answer"
    })
    this._scrollToAnswer();
  }
  _scrollToAnswer(){
    const {data} = this.props;
    let ansId = `${data.id}-Answer`;
    
    // Scroll to answer section
    let target = document.getElementById(ansId);
    let targetPos = document.body.scrollTop + target.getBoundingClientRect().top;
    
    scrollTo(document.body, targetPos, 120);  
  }
  _scrollToNextQuestion(){
    const {data, currentQAItemIndex, maxIndex, unlockNext, onShowMatchResult} = this.props;
    if(data.order === maxIndex){
      
      //it is the last one! 回報給上頭
      onShowMatchResult();

      //scroll to id = rankResultSection
      // 需要等 timeout 一小段時間，讓 obj 先出現，才能抓到對應位置，知道要滑到哪裡去
      setTimeout(()=>{
          
          // Scroll to answer section
          let target = document.getElementById("rankResultSection");
          let targetPos = document.body.scrollTop + target.getBoundingClientRect().top;
      
          scrollTo(document.body, targetPos, 120);

      }, 50)

      return;
    }
    let timeout = 0;
    if(data.order === currentQAItemIndex){
      unlockNext();
      timeout = 50;
    }

    // 需要等 timeout 一小段時間，讓 obj 先出現，才能抓到對應位置，知道要滑到哪裡去
    setTimeout(()=>{
        let nextqId = `Question${data.order+1}`;
    
        // Scroll to answer section
        let target = document.getElementById(nextqId);
        let targetPos = document.body.scrollTop + target.getBoundingClientRect().top;
    
        scrollTo(document.body, targetPos, 120);

    },timeout)
  }
  
  componentWillReceiveProps(nextProps){
    //reset
    if(nextProps.completed === false){
      this.setState({
        completed: "question",
        shouldReset: true
      })
    }
  }

  render() {
    const styles = require("./QAItem.scss")
    const {data, currentQAItemIndex, userChoices, candidatePositions, matchData, maxIndex, conflictHandler} = this.props;
    const {completed, conflictPeople, shouldReset} = this.state;
    //console.log(data.order+":"+completed)

    let qaItemClasses = classnames({
      [styles.QAItem] : true,
      [styles.isActive] : data.order <= currentQAItemIndex
    })

    let toNextItem = "";
    //作答之後才顯示下一題 or 看結果的選項
    if(completed === "answer"){
       toNextItem = (data.order < maxIndex) ? 
                    <div className={styles.button}
                         onClick={this._scrollToNextQuestion.bind(this)}>下一題</div> :
                    <div className={styles.button}
                         onClick={this._scrollToNextQuestion.bind(this)}>看結果</div> ;
    }

    let userVote = userChoices[data.issueName];

    return (
        <div className={qaItemClasses}
             id={data.id}>
            <div className={styles.questionContent}>
                <div className={styles.questionTitle}>{data.order+1}. {data.title}</div>
                <div className={styles.questionDescription}>{data.description}</div>
                <div className={styles.optionSection}>
                    <OptionItem value="aye"  title="贊成"  isUserVote={userVote==='aye'} 
                                onAnswerHandler={this._onAnswer.bind(this)}/>
                    <OptionItem value="nay"  title="反對"  isUserVote={userVote==='nay'} 
                                onAnswerHandler={this._onAnswer.bind(this)}/>
                    <OptionItem value="none" title="沒意見" isUserVote={userVote==='none'} 
                                onAnswerHandler={this._onAnswer.bind(this)}/>
                </div>
            </div>
            <Conflict conflictPeople={conflictPeople}
                      qid={data.id}
                      issueName={data.issueName}
                      statement={data.statement}
                      conflictHandler={conflictHandler}
                      completed={completed}
                      showAnswerHandler={this._onShowAnser.bind(this)}
                      shouldReset={shouldReset}/>
            <div className={styles.resultContnet}>
                <Answer completed={completed} 
                        qid={data.id}
                        issueName={data.issueName}
                        userVote={userVote}
                        matchData={matchData}/>
                {toNextItem}
            </div>
        </div>
    );
  }
}
class OptionItem extends Component {
  
  render() {
    const styles = require("./QAItem.scss")
    const {value, title, isUserVote, onAnswerHandler} = this.props;
    let optionClasses = classnames({
        [styles.optionItem]: true,
        [styles.isChoosed]: isUserVote
    });

    return (
        <div className={`${optionClasses} ${styles[value]}`}
             onClick={onAnswerHandler.bind(null, value)}>{title}</div>
    );
  }
}
class Subconflict extends Component {
  _engPos2choice(engPos){
    if(["none","unknown","evading"].indexOf(engPos)!==-1){
        return "未表態";

    }else if(engPos === "aye"){
        return "贊成";

    }else if(engPos === "nay"){
        return "反對";

    }else{
        return "";
    }
  
  }
  render(){
      const styles = require("./QAItem.scss")
      const {currentPeople, peopleName, conflictChoose, issueName, statement, resolvedConflicts, index, qid} = this.props;
      
      let recordPosition = currentPeople[issueName].record.position;//過去立場
      let promisePosition = currentPeople[issueName].promise.position;//現在承諾
      
      //未表態有三種可能
      let recordIsNone = ["none","unknown","evading"].indexOf(recordPosition)!== -1;
      let promiseIsNone = ["none","unknown","evading"].indexOf(promisePosition)!== -1;
    
      //說明的台詞
      let positionStatement = (recordIsNone === true) ? `並未在「${statement}」上表態` : `${eng2cht(recordPosition)}「${statement}」`;
      let futureStatement = (promiseIsNone === true) ? `但他針對未來立場並未明確承諾` : `但他承諾未來將${eng2cht(promisePosition)}`;
      let additionalStatement = (currentPeople[issueName].promise.statement) ? `同時表示：「${currentPeople[issueName].promise.statement}」` : "";

      //選擇按鈕的樣式，因為要顯示使用者選了哪一個
      let recordClasses = classnames({
        [styles.conflictButton] : true,
        [styles.isActive] : resolvedConflicts[peopleName] === recordPosition 
      })
      let promiseClasses = classnames({
        [styles.conflictButton] : true,
        [styles.isActive] : resolvedConflicts[peopleName] === promisePosition 
      })
      return (
          <div className={styles.conflictItem}
               id={`${qid}-Conflict-${index}`}>
              <div className={styles.conflictContent}>
                  <p>
                      <b>{peopleName}</b>
                      過去在立法院的表態紀錄顯示他{positionStatement}。
                  </p>
                  <p>
                      {futureStatement}，
                      {additionalStatement}
                  </p>
                  <p>請問你選擇採取他的哪一個立場？</p>
              </div>
              <div className={styles.conflictActions}>
                  <div className={recordClasses}
                       onClick={conflictChoose.bind(this,peopleName, issueName, recordPosition, index)}>
                       {`過去紀錄：${this._engPos2choice(recordPosition)}`}
                  </div>
                  <div className={promiseClasses}
                       onClick={conflictChoose.bind(this,peopleName, issueName, promisePosition, index)}>
                       {`未來承諾：${this._engPos2choice(promisePosition)}`}
                  </div>
              </div>
          </div>
      )
           
    
  }
}
class Conflict extends Component {
  
  constructor(props){ super(props)
    this.state = {
      resolvedConflicts: {}
    }

  }
  componentWillReceiveProps(nextProps){
    if(nextProps.shouldReset === true){
      this.setState({
        resolvedConflicts: {}
      })
    }
  }
  _conflictChoose(name, issueName, pos, currentIndex){
    const { conflictPeople, conflictHandler, showAnswerHandler, qid} = this.props;
    
    // console.log("------ onChooseConflict")
    // console.log(`決定 ${name} 在 ${issueName} 的立場是 ${pos}`);
    
    //回報給 MatchGame
    conflictHandler(name, issueName, pos)
    
    //自己記錄這一題的 conflict
    let {resolvedConflicts} = this.state;
    resolvedConflicts[name] = pos;
    this.setState({
      resolvedConflicts: resolvedConflicts
    })

    

    //如果都解決了，那就看答案吧
    if(Object.keys(resolvedConflicts).length === Object.keys(conflictPeople).length){
       showAnswerHandler();

    }else{
       //如果還沒解決，滑到下一個 conflict
       // 需要等 timeout 一小段時間，讓 obj 先出現，才能抓到對應位置，知道要滑到哪裡去
       setTimeout(()=>{
           let nextConflictId = `${qid}-Conflict-${currentIndex+1}`;
       
           // Scroll to answer section
           let target = document.getElementById(nextConflictId);
           let targetPos = document.body.scrollTop + target.getBoundingClientRect().top;
       
           scrollTo(document.body, targetPos, 100);
   
       }, 50)

    }
  }
  render() {
    const styles = require("./QAItem.scss")
    let {conflictPeople, issueName, statement, completed, qid} = this.props;
    let {resolvedConflicts} = this.state;

    let conflictClasses = classnames({
        [styles.Conflict]: true,
        [styles.isConflict]: Object.keys(conflictPeople).length > 0 && completed !== "question"
    });

    //conflict 一個一個丟出去
    let found = false;
    let conflictItems = Object.keys(conflictPeople).map((peopleName, index)=>{
        if(resolvedConflicts[peopleName]){
           //過去已經回答過的
           return <Subconflict peopleName={peopleName}
                               currentPeople={conflictPeople[peopleName]}
                               issueName={issueName}
                               statement={statement}
                               conflictChoose={this._conflictChoose.bind(this)}
                               resolvedConflicts={resolvedConflicts}
                               index={index}
                               qid={qid}/>
        }else if(!resolvedConflicts[peopleName] && found===false){
            //現在要回答的
            found = true;
            return <Subconflict peopleName={peopleName}
                                currentPeople={conflictPeople[peopleName]}
                                issueName={issueName}
                                statement={statement}
                                conflictChoose={this._conflictChoose.bind(this)}
                                resolvedConflicts={resolvedConflicts}
                                index={index}
                                qid={qid}/>
        } 
    })

    return (
        <div className={conflictClasses}>
            {conflictItems}
        </div>
    )
  }
  
}
class Answer extends Component {
  
  render() {
    const styles = require("./QAItem.scss")
    const {completed, qid, issueName, userVote, matchData} = this.props;
    let answerClasses = classnames({
        [styles.Answer]: true,
        [styles.isCompleted]: completed === "answer"
    });

    let samePositionTitle = (userVote === "none") ? "跟你一樣沒意見的是～" : "跟你相同立場的是～";
    let samePositions = Object.keys(matchData).map((peopleName, i)=>{
      
        if(matchData[peopleName][issueName] === userVote){
            return <div className={styles.samePositionItem}
                        key={`${qid}-${i}`}>{peopleName}</div>
        }
    })

    return (
        <div className={answerClasses}
             id={`${qid}-Answer`}>
            <div>{samePositionTitle}</div>
            {samePositions}
        </div>
    )
  }
}
