import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class QAItem extends Component {
  static propTypes = {
      
  }
  constructor(props){ super(props)
      this.state = {
          completed: false
      }
  }
  _onAnswer(choice, e){
    const {data, recordHandler} = this.props;

    this.setState({
        completed: true
    })
    
    recordHandler(data.issueId, data.order, choice);
    this._scrollToAnswer();
  }
  _scrollToAnswer(){
    const {data} = this.props;
    let ansId = `${data.id}-Answer`;
    
    // Scroll to answer section
    let target = document.getElementById(ansId);
    let targetPos = document.body.scrollTop + target.getBoundingClientRect().top;
    
    this._scrollTo(document.body, targetPos, 200);
    
  }
  _scrollToNextQuestion(){
    const {data, currentQAItemIndex, maxIndex, unlockNext} = this.props;
    if(data.order === maxIndex)//it is the last one!
      return;

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
    
        this._scrollTo(document.body, targetPos, 100);

    },timeout)

    
  }
  _scrollTo(element, to, duration) {
      
      if (duration <= 0) return;
      let difference = to - element.scrollTop;
      let perTick = difference / duration * 10;
    
      setTimeout(()=>{
          element.scrollTop = element.scrollTop + perTick;
          if (element.scrollTop == to) return;
          this._scrollTo(element, to, duration - 10);
      }, 10);
  }

  render() {
    const styles = require("./QAItem.scss")
    const {data, currentQAItemIndex, userChoices, candidatePositions, maxIndex} = this.props;
    const {completed} = this.state;

    let qaItemClasses = classnames({
      [styles.QAItem] : true,
      [styles.isActive] : data.order <= currentQAItemIndex
    })

    let toNextItem = "";
    //作答之後才顯示下一題 or 看結果的選項
    if(completed){
       toNextItem = (data.order < maxIndex) ? 
                    <div className={styles.button}
                         onClick={this._scrollToNextQuestion.bind(this)}>下一題</div> :
                    <div className={styles.button}
                         onClick={this._scrollToNextQuestion.bind(this)}>看結果</div> ;
    }

    let userVote = userChoices[data.issueId];

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
            <div className={styles.resultContnet}>
                <Answer completed={completed} 
                        qid={data.id}
                        issueId={data.issueId}
                        userVote={userVote}
                        candidatePositions={candidatePositions}/>
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
class Answer extends Component {
  
  render() {
    const styles = require("./QAItem.scss")
    const {completed, qid, issueId, userVote, candidatePositions} = this.props;
    let answerClasses = classnames({
        [styles.Answer]: true,
        [styles.isCompleted]: completed
    });

    let samePositionTitle = (userVote === "none") ? "跟你一樣沒意見的是～" : "跟你相同立場的是～";
    let samePositions = candidatePositions.map((item, i)=>{
      
        if(item.positions[issueId] === userVote){
            return <div className={styles.samePositionItem}
                        key={`${qid}-${i}`}>{item.name}</div>
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
