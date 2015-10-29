import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import QAItem from '../../components/QAItem/QAItem';
import CandidatesHoldSigns from '../../components/CandidatesHoldSigns/CandidatesHoldSigns';

const fakeData = [
  {
    "name" : "蔣乃辛",
    "positions" : {
        "marriage-equality":"none",
        "recall":"none",
        "referendum":"none",
        "nuclear-power":"nay"
    }
  },
  {
    "name" : "范雲",
    "positions" : {
        "marriage-equality":"aye",
        "recall":"aye",
        "referendum":"aye",
        "nuclear-power":"aye"
    }
  },
  {
    "name" : "陳家宏",
    "positions" : {
        "marriage-equality":"none",
        "recall":"none",
        "referendum":"none",
        "nuclear-power":"nay"
    }
  },
  {
    "name" : "吳旭智",
    "positions" : {
        "marriage-equality":"none",
        "recall":"aye",
        "referendum":"aye",
        "nuclear-power":"nay"
    }
  },
  {
    "name" : "曾獻瑩",
    "positions" : {
        "marriage-equality":"aye",
        "recall":"nay",
        "referendum":"none",
        "nuclear-power":"nay"
    }
  },
  {
    "name" : "林珍妤",
    "positions" : {
        "marriage-equality":"nay",
        "recall":"aye",
        "referendum":"none",
        "nuclear-power":"nay"
    }
  },
  {
    "name" : "龎維良",
    "positions" : {
        "marriage-equality":"nay",
        "recall":"aye",
        "referendum":"aye",
        "nuclear-power":"aye"
    }
  },
  {
    "name" : "周芳如",
    "positions" : {
        "marriage-equality":"none",
        "recall":"nay",
        "referendum":"nay",
        "nuclear-power":"nay"
    }
  }
]

@connect(
    state => ({issues: state.issues}),
    dispatch => bindActionCreators({}, dispatch))

export default class MatchGame extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      let qaSet = Object.keys(props.issues).map((issueId, index)=>{
        return {
            id: `Question${index}`,
            issueId: issueId,
            order: index,
            title: props.issues[issueId].title,
            description: props.issues[issueId].question
        }
      })

      this.state = {
          qaSet: qaSet,
          currentQAItemIndex: 0,
          userChoices: {
            // Format // "marriage-equality":"aye"
          },
          showAnswerSection: -1
      }
  }
  componentDidMount(){
      window.addEventListener('scroll', this._onScroll.bind(this));
  }
  componentWillUnmount(){
      window.removeEventListener('scroll', this._onScroll.bind(this));
  }
  _onScroll(){
      const {qaSet, currentQAItemIndex} = this.state;
      let showAnswerSection = -1;
      let scrollTop = document.body.scrollTop;
      console.log(currentQAItemIndex)
      //check each Answer's scrollTop
      qaSet.map((v,i)=>{
        
        if(i <= currentQAItemIndex){
            let ansId = `Question${i}-Answer`;
            let node = document.getElementById(ansId);
            let nodePos = document.body.scrollTop + node.getBoundingClientRect().top;
            console.log(i+"*"+nodePos);

            let viewHeight = window.innerHeight;
            let viewWidth = window.innerWidth;
            let topBorder, bottomBorder; 

            console.log("viewHeight:"+viewHeight)
            if(viewHeight < 700){
                
                // mobile version
                // 答案在畫面的上方 80%
                topBorder = (scrollTop + 0);
                bottomBorder = (scrollTop + viewHeight - viewHeight*0.2);

            }else if(viewHeight >= 700){
                // web version
                // 答案全部都在目前畫面的中間 80%
                topBorder = (scrollTop + 0) + viewHeight*0.1;
                bottomBorder = (scrollTop + viewHeight - viewHeight*0.1);
            }

            console.log("top:"+topBorder)
            console.log("bottom:"+bottomBorder)
            
            if(nodePos > topBorder && nodePos < bottomBorder){//top border in
                let objectHeight = 250;
                if(nodePos + objectHeight > topBorder && nodePos + objectHeight < bottomBorder){//bottom border in
                  console.log("======"+i+"=======")
                  showAnswerSection = i;
               } 
            }


        }
      });
      //console.log("-> to be:"+showAnswerSection)

      this.setState({
        showAnswerSection: showAnswerSection
      })

      console.log(scrollTop);
      //console.log(this.state.showAnswerSection)
  }
  _recordUserChoice(issueId, order, choice) {

      let currentChoices = this.state.userChoices;
      // if(currentChoices[issueId]){
      //    return;//如果已經回答過，不再重複登記
      // }

      currentChoices[issueId] = choice;
      this.setState({
          userChoices: currentChoices
      });

  }
  _unlockNext(){
      this.setState({
          currentQAItemIndex: this.state.currentQAItemIndex+1
      });

  }
  render() {
    const styles = require("./MatchGame.scss")
    const {issues} = this.props;
    const {qaSet, currentQAItemIndex, userChoices, showAnswerSection} = this.state;

    let qaItems = qaSet.map((value,index)=>{
        return <QAItem key={`qaitem${index}`}
                       data={value}
                       currentQAItemIndex={currentQAItemIndex}
                       userChoices={userChoices}
                       recordHandler={this._recordUserChoice.bind(this)}
                       candidatePositions={fakeData}
                       maxIndex={qaSet.length-1}
                       unlockNext={this._unlockNext.bind(this)} />
    })
    return (
        <div className={styles.wrap}>
            {qaItems}
            <CandidatesHoldSigns data={fakeData}
                                 userChoices={userChoices}
                                 currentQAItemIndex={currentQAItemIndex}
                                 showAnswerSection={showAnswerSection}/>
        </div>
    );
  }
}
