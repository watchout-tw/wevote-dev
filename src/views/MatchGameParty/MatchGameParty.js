import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import QAItem from '../../components/QAItem/QAItem';
import CandidatesHoldSigns from '../../components/CandidatesHoldSigns/CandidatesHoldSigns';
import PeopleAvatar from '../../components/PeopleAvatar/PeopleAvatar';

import people_name2id from '../../utils/people_name2id';
import eng2cht from '../../utils/eng2cht';
import url2eng from '../../utils/url2eng';
import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getMatchgamePartyData from '../../utils/getMatchgamePartyData';

@connect(
    state => ({
      legislators: state.legislators,
      records: state.records,
      issues: state.issues,
      partyPromises: state.partyPromises
    }),
    dispatch => bindActionCreators({}, dispatch))

export default class MatchGameParty extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      //prepare qa set
      let qaSet = Object.keys(props.issues).map((issueUrl, index)=>{
        return {
            id: `Question${index}`,
            issueName: url2eng(issueUrl),
            order: index,
            title: props.issues[issueUrl].title,
            description: props.issues[issueUrl].question,
            statement: props.issues[issueUrl].statement,
        }
      })

      //prepare party positiom
      let partyPositions = parseToPartyPosition(props.records, props.issues);
      let parsed = getMatchgamePartyData(partyPositions, props.partyPromises);

      this.state = {
          qaSet: qaSet,
          currentQAItemIndex: 0,
          userChoices: {
            // Format // "marriage-equality":"aye"
          },
          showAnswerSection: -1,
          showRank: false,
          completed: false,
          currentRank: [],

          positionData: parsed.positionData,
          matchData: parsed.matchData//used for match, because position might conflicts"
          
      }
      console.log("end of constructor")

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
  _onChooseConflict(name, issueName, pos){
      // console.log("* onChooseConflict")
      // console.log(`決定 ${name} 在 ${issueName} 的立場是 ${pos}`);

      // 更新 matchData
      let {matchData} = this.state;
      matchData[name][issueName] = pos;
      this.setState({
          matchData: matchData
      })

      /*
        // matchData format
        "KMT": {
          "marriage-equality": "aye",
          "recall" : "nay"
        },
        
      */
  }
  _recordUserChoice(issueName, order, choice) {
      //console.log("record user choice:"+issueName+"-"+choice)
      
      let currentChoices = this.state.userChoices;

      // if(currentChoices[issueName]){
      //    return;//如果已經回答過，不再重複登記
      // }


      if(this.state.completed === false){// 開始作答了
        this.setState({
          completed: true
        })
      }
      currentChoices[issueName] = choice;

      this.setState({
          userChoices: currentChoices
      });

      const {showRank} = this.state;
      if(showRank){
         this._onShowMatchResult();
        //如果已經算答案，重新計算
      }
  }
  _unlockNext(){
      this.setState({
          currentQAItemIndex: this.state.currentQAItemIndex+1
      });
  }
  _onShowMatchResult(){
    //console.log("i'm in charge. i'll take care of that. -by MatchGame")
    
    // 計算 rank
    let currentRank = [];
    let {matchData, userChoices} = this.state;

    Object.keys(matchData).map((peopleName, index)=>{
        let points = 0;
        let samePositionCount = 0;
        let currentPeople = matchData[peopleName];

        Object.keys(currentPeople).map((issueName,k)=>{
            // 如果立場相同，並且使用者選擇的不是「沒意見」，加一分
            if((userChoices[issueName] === currentPeople[issueName])&&(userChoices[issueName]!=="none")){
                points++;
                samePositionCount++;
            }  
            // 如果立場相反，扣一分
            if(
                (userChoices[issueName] === "aye" && currentPeople[issueName] === "nay")||
                (userChoices[issueName] === "nay" && currentPeople[issueName] === "aye")
               ){
                points--;
            }
            
        });

        currentRank.push(
          Object.assign(currentPeople, {
            name: peopleName,
            points: points
          })
        ) 

    })
   
    currentRank.sort((a,b)=>{
      if(b.points === a.points){
        return b.samePositionCount - a.samePositionCount;

      }else{
        return b.points - a.points;
      }
    })
    this.setState({
      showRank: true,
      currentRank: currentRank
    });

  }
  _replay(){
    //console.log("*replay")
   
    this.setState({
        currentQAItemIndex: 0,
        userChoices: {},
        showAnswerSection: -1,
        showRank: false,
        completed: false
    })
    window.scrollTo(-100,0);
    
  }
  render() {
    const styles = require("./MatchGameParty.scss")
    const {issues} = this.props;
    let {qaSet, currentQAItemIndex, userChoices, showAnswerSection, 
         currentRank, showRank, completed, 
         matchData, positionData} = this.state;

    let qaItems = qaSet.map((value,index)=>{
        return <QAItem key={`qaitem${index}`}
                       data={value}
                       currentQAItemIndex={currentQAItemIndex}
                       userChoices={userChoices}
                       conflictHandler={this._onChooseConflict.bind(this)}
                       recordHandler={this._recordUserChoice.bind(this)}
                       candidatePositions={positionData}
                       matchData={matchData}
                       maxIndex={qaSet.length-1}
                       unlockNext={this._unlockNext.bind(this)}
                       onShowMatchResult={this._onShowMatchResult.bind(this)}
                       completed={completed} />
    })

    // 配對結果
    let BottomSection;

    // 看結果：顯示結果
    if(showRank){
        BottomSection = (
            <ResultSection currentRank={currentRank}
                           positionData={positionData}
                           userChoices={userChoices} />
        )
    
    }else{
    //還沒看結果，顯示底部計分
        BottomSection =(
            <CandidatesHoldSigns matchData={matchData}
                                 positionData={positionData} 
                                 userChoices={userChoices}
                                 currentQAItemIndex={currentQAItemIndex}
                                 showAnswerSection={showAnswerSection}/>
        );
    }

    return (
        <div className={styles.wrap}>
            {qaItems}
            {BottomSection} 
        </div>
    );
  }
}
class ResultSection extends Component {

  render(){
    const styles = require("./MatchGameParty.scss")
    const {currentRank, positionData, userChoices} = this.props;

    // Best Fit
    let bestPKers = currentRank.map((people,index)=>{

        if(people.points === currentRank[0].points)
          return <ResultPKer rank={people} 
                             data={positionData[people.name]}
                             userChoices={userChoices} 
                             key={`resultPKer${index}`} />
    })
    
    // Worst Fit
    let lastIndex = currentRank.length-1;
    let worstPKers = currentRank.map((people,index)=>{
        if(people.points === currentRank[lastIndex].points)
          return <ResultPKer rank={people} 
                             data={positionData[people.name]}
                             userChoices={userChoices}
                             key={`resultPKer${index}`} />
    })
    
    // Everyone
    let resultPKers = currentRank.map((people,index)=>{
        return <ResultPKer rank={people} 
                           data={positionData[people.name]}
                           userChoices={userChoices}
                           key={`resultPKer${index}`} />
    })
    
    return (
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
  }
}
class ResultPKer extends Component {
  
  render() {
    const styles = require("./MatchGameParty.scss")
    const {rank, data, userChoices} = this.props;
    let sameOpinions = [];
    let oppositeOpinions = [];

    Object.keys(rank).map((issueName,i)=>{
      
      if(rank[issueName] === userChoices[issueName] && userChoices[issueName] !== "none"){
          sameOpinions.push(issueName);
      }

      if(
       (rank[issueName] === "aye" && userChoices[issueName] === "nay")||
       (rank[issueName] === "nay" && userChoices[issueName] === "aye")
      ){
          oppositeOpinions.push(issueName);       
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
            
            <div className={styles.peopleInfo}>
                <div className={styles.avatarImg}>
                    <div className={`${styles.partyFlag} ${styles.large} ${styles[data.id]}`}></div>
                </div>
                <div className={styles.avatarName}>{data.name}</div>
                <div className={styles.totalPoints}>總分：{rank.points}</div>
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
