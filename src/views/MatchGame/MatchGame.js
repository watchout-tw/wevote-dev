import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import QAItem from '../../components/QAItem/QAItem';
import CandidatesHoldSigns from '../../components/CandidatesHoldSigns/CandidatesHoldSigns';
import PeopleAvatar from '../../components/PeopleAvatar/PeopleAvatar';

import people_name2id from '../../utils/people_name2id';
import eng2cht from '../../utils/eng2cht';

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

      // 不然會連動，可是我不要 fakeData 被排序
      let currentRank = [];
      fakeData.map((v,i)=>{
        currentRank.push(v)
      })

      this.state = {
          qaSet: qaSet,
          currentQAItemIndex: 0,
          userChoices: {
            // Format // "marriage-equality":"aye"
          },
          showAnswerSection: -1,
          currentRank: currentRank,
          showRank: false,
          completed: false
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
      
      //check each Answer's scrollTop
      qaSet.map((v,i)=>{
        
        if(i <= currentQAItemIndex){
            let ansId = `Question${i}-Answer`;
            let node = document.getElementById(ansId);
            let nodePos = document.body.scrollTop + node.getBoundingClientRect().top;
            
            let viewHeight = window.innerHeight;
            let viewWidth = window.innerWidth;
            let topBorder, bottomBorder; 

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

            // console.log(i+"*"+nodePos);
            // console.log("viewHeight:"+viewHeight)
            // console.log("top:"+topBorder)
            // console.log("bottom:"+bottomBorder)
            
            if(nodePos > topBorder && nodePos < bottomBorder){//top border in
                let objectHeight = 250;
                if(nodePos + objectHeight > topBorder && nodePos + objectHeight < bottomBorder){//bottom border in
                  //console.log("======"+i+"=======")
                  showAnswerSection = i;
               } 
            }


        }
      });
      //console.log("-> to be:"+showAnswerSection)

      this.setState({
        showAnswerSection: showAnswerSection
      })

      //console.log(scrollTop);
      //console.log(this.state.showAnswerSection)
  }
  _recordUserChoice(issueId, order, choice) {
      console.log("record user choice:"+issueId+"-"+choice)
      let currentChoices = this.state.userChoices;
      // if(currentChoices[issueId]){
      //    return;//如果已經回答過，不再重複登記
      // }

      if(this.state.completed === false){// 開始作答了
        this.setState({
          completed: true
        })
      }
      currentChoices[issueId] = choice;


      //計算新的 rank
      let currentRank = this.state.currentRank;
      currentRank.map((people,index)=>{
          let points = 0;
          Object.keys(people.positions).map((issueId,k)=>{
              //如果立場相同，並且使用者選擇的不是「沒意見」，加一分
              if((currentChoices[issueId] === people.positions[issueId])&&(currentChoices[issueId]!=="none")){
                  points++;
              }  
              //如果立場相反，扣一分
              if(
                  (currentChoices[issueId] === "aye" && people.positions[issueId] === "nay")||
                  (currentChoices[issueId] === "nay" && people.positions[issueId] === "aye")
                 ){
                  points--;
              } 
          });
          people.points = points;
      })
      currentRank.sort((a,b)=>{
        return b.points - a.points;
      })

      this.setState({
          userChoices: currentChoices,
          currentRank: currentRank
      });
  }
  _unlockNext(){
      this.setState({
          currentQAItemIndex: this.state.currentQAItemIndex+1
      });
  }
  _onShowMatchResult(){
    console.log("i'm in charge. i'll take care of that. -by MatchGame")
    this.setState({
      showRank: true
    });

  }
  _replay(){
    console.log("*replay")
    // 不然會連動，可是我不要 fakeData 被排序
    let currentRank = [];
    fakeData.map((v,i)=>{
      currentRank.push(v)
    })

    this.setState({
        currentQAItemIndex: 0,
        userChoices: {},
        showAnswerSection: -1,
        currentRank: currentRank,
        showRank: false,
        completed: false
    })
    window.scrollTo(-100,0);
    
  }
  render() {
    const styles = require("./MatchGame.scss")
    const {issues} = this.props;
    let {qaSet, currentQAItemIndex, userChoices, showAnswerSection, 
         currentRank, showRank, completed} = this.state;

    let qaItems = qaSet.map((value,index)=>{
        return <QAItem key={`qaitem${index}`}
                       data={value}
                       currentQAItemIndex={currentQAItemIndex}
                       userChoices={userChoices}
                       recordHandler={this._recordUserChoice.bind(this)}
                       candidatePositions={fakeData}
                       maxIndex={qaSet.length-1}
                       unlockNext={this._unlockNext.bind(this)}
                       onShowMatchResult={this._onShowMatchResult.bind(this)}
                       completed={completed} />
    })

    let userChoiceArray = Object.keys(userChoices).map((k,i)=>{
        return `${userChoices[k]}-`
    })

   
    // 配對結果
    let rankResultSection, CandidatesHoldSignsSection;

    // 看結果：顯示結果
    if(showRank){
        
        // Best Fit
        let bestPKers = currentRank.map((people,index)=>{
            if(people.points === currentRank[0].points)
              return <ResultPKer data={people} 
                                 userChoices={userChoices} 
                                 key={`resultPKer${index}`} />
        })
    
        // Worst Fit
        let lastIndex = currentRank.length-1;
        let worstPKers = currentRank.map((people,index)=>{
            if(people.points === currentRank[lastIndex].points)
              return <ResultPKer data={people} 
                                 userChoices={userChoices}
                                 key={`resultPKer${index}`} />
        })
    
        // Everyone
        let resultPKers = currentRank.map((people,index)=>{
            return <ResultPKer data={people} 
                               userChoices={userChoices}
                               key={`resultPKer${index}`} />
        })
    
        rankResultSection = (
          <div id="rankResultSection"
               className={styles.rankResultSection}>
              <div className={styles.rankResultWrap}>
                  <div className={styles.rankResultTitle}>和你立場最相近的候選人</div>
                  {bestPKers}
              </div>
    
              <div className={styles.rankResultWrap}>
                  <div className={styles.rankResultTitle}>和你立場最不同的候選人</div>
                  {worstPKers}
              </div>

              <div className={styles.replay}
                   onClick={this._replay.bind(this)}>REPLAY</div>
          </div>
          )
    
    }else{
        CandidatesHoldSignsSection =(
            <CandidatesHoldSigns data={fakeData}
                                 userChoices={userChoices}
                                 currentQAItemIndex={currentQAItemIndex}
                                 showAnswerSection={showAnswerSection}/>
        );

    }

    return (
        <div className={styles.wrap}>
            {qaItems}
            {rankResultSection}
            {CandidatesHoldSignsSection} 
        </div>
    );
  }
}
class ResultPKer extends Component {
  
  render() {
    const styles = require("./MatchGame.scss")
    const {data, userChoices} = this.props;
    let sameOpinions = [];
    let oppositeOpinions = [];

    Object.keys(data.positions).map((issueId,i)=>{
      
      if(data.positions[issueId] === userChoices[issueId] && userChoices[issueId] !== "none"){
          sameOpinions.push(issueId);
      }

      if(
       (data.positions[issueId] === "aye" && userChoices[issueId] === "nay")||
       (data.positions[issueId] === "nay" && userChoices[issueId] === "aye")
      ){
          oppositeOpinions.push(issueId);       
      } 

    })

    //相同意見
    let sameOpinionItems = sameOpinions.map((id, index)=>{
        return <div className={styles.issueCircle}>{eng2cht(id)}</div>
    })
    
    //相反意見
    let oppositeOpinionItems = oppositeOpinions.map((id, index)=>{
        return <div className={styles.issueCircle}>{eng2cht(id)}</div>
    })

    return (
        <div className={styles.resultPKer}>
            
            <div className={styles.avatarImg}>
                <PeopleAvatar id={people_name2id(data.name)} />
                {data.name}
            </div>

            <div className={styles.opinionGroups}>
                <div className={styles.opinionGroup}>
                    <div className={styles.circleCount}>
                        <div className={styles.opinionCount}>{sameOpinions.length}</div>
                        <div>個意見相同</div>
                    </div>
                    <div className={styles.issueCircles}>{sameOpinionItems}</div>
                </div>
                <div className={styles.opinionGroup}>
                    <div className={styles.circleCount}>
                        <div className={styles.opinionCount}>{oppositeOpinions.length}</div>
                        <div>個意見不同</div>
                    </div>
                    <div className={styles.issueCircles}>{oppositeOpinionItems}</div>
                </div>
            </div>

        </div>
    )
  }
}
