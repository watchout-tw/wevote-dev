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

import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import getDistrictCandidates from '../../utils/getDistrictCandidates';
import getMatchgameData from '../../utils/getMatchgameData';
import parseDynamicData from '../../utils/parseDynamicData';

import {load} from '../../ducks/candidateDynamicData.js';

@connect(
    state => ({
      legislators: state.legislators,
      candidates: state.candidates,
      records: state.records,
      issues: state.issues,
      candidateDynamicData: state.candidateDynamicData.data
    }),
    dispatch => bindActionCreators({load}, dispatch))

export default class MatchGame extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
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

          candidateDynamicLoad: "",
          matchData: "",//used for match, because position might conflicts"
          positionData: ""

      }
  }
  componentWillMount(){
      this.props.load();
  }
  componentDidMount(){
      window.addEventListener('scroll', this._onScroll.bind(this));
  }
  componentWillReceiveProps(nextProps){
    console.log("will receive")
    //拿到 api 的資料了，可以開始計算 matchData
    if(nextProps.candidateDynamicData){
      console.log("calculating...")
     
      const {records, issues, legislators, candidates} = nextProps;
      const {area, areaNo} = nextProps.params;

      // 現任立委的歷史表態資料
      let legislatorPositions = parseToLegislatorPosition(records, issues, legislators);

      console.log(area + ", " + areaNo)

      // 這個選區有哪些候選人的清單  
      let candidateList = getDistrictCandidates(candidates, area, areaNo);
      
      // 候選人動態資料，包括承諾、要推動的法案
      let candidateDynamicData = parseDynamicData(nextProps.candidateDynamicData.value);
      
      
      // 候選人過去跟未來的表態資料
      let combinedPositionData = getMatchgameData(legislatorPositions, candidateList, candidateDynamicData, area, areaNo);

      // default 單一立場，如有過去，選過去。matchgame 進行後，會依照使用者選擇的更新
      let matchData = {};
      Object.keys(combinedPositionData).map((peopleName,i)=>{
          matchData[peopleName] = {};
          let currentData = combinedPositionData[peopleName];
         
          
          Object.keys(currentData).map((issueName, k)=>{
              
              matchData[peopleName][issueName] = currentData[issueName].promise.position;
              
              if(currentData[issueName].record){
                  matchData[peopleName][issueName] = currentData[issueName].record.position;
              }
          })
      });

      this.setState({
          candidateDynamicLoad: candidateDynamicData,
          positionData: combinedPositionData,
          matchData: matchData
      })




    }
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
        "蔣乃辛": {
          "marriage-equality": "aye",
          "recall" : "nay"
        },
        "范雲": {
          "marriage-equality": "aye",
          "recall" : "nay"
        }
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
        let currentPeople = matchData[peopleName];

        Object.keys(currentPeople).map((issueName,k)=>{
            // 如果立場相同，並且使用者選擇的不是「沒意見」，加一分
            if((userChoices[issueName] === currentPeople[issueName])&&(userChoices[issueName]!=="none")){
                points++;
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
      return b.points - a.points;
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
    const styles = require("./MatchGame.scss")
    const {issues} = this.props;
    let {qaSet, currentQAItemIndex, userChoices, showAnswerSection, 
         currentRank, showRank, completed, 
         matchData, positionData} = this.state;

    if(!matchData) return <div>Processing...</div>

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
            <CandidatesHoldSigns data={matchData}
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

    Object.keys(data).map((issueName,i)=>{
      
      if(data[issueName] === userChoices[issueName] && userChoices[issueName] !== "none"){
          sameOpinions.push(issueName);
      }

      if(
       (data[issueName] === "aye" && userChoices[issueName] === "nay")||
       (data[issueName] === "nay" && userChoices[issueName] === "aye")
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
                <div className={styles.avatarImg}><PeopleAvatar id={people_name2id(data.name)} /></div>
                <div className={styles.avatarName}>{data.name}</div>
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
