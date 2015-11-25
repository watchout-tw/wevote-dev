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

      this.state = {
          qaSet: qaSet,
          currentQAItemIndex: 0,
          userChoices: {
            // Format // "marriage-equality":"aye"
          },
          showAnswerSection: -1,
          progress: 'config', // config->game->result
          completed: false,
          currentRank: [],

          matchData: {}
          
      }
      

  }
  componentDidMount(){
      window.addEventListener('scroll', this._onScroll.bind(this));
      // default set to 以過去紀錄為準
      this.refs.recordFirst.getDOMNode().checked = true;
  }
  componentWillUnmount(){
      window.removeEventListener('scroll', this._onScroll.bind(this));
  }
  _onSetConfig(){
      
      // 使用者選擇要用過去或是承諾
      // update match data
      //prepare party positiom
      const {records, issues, partyPromises} = this.props;
      let partyPositions = parseToPartyPosition(records, issues);
      let recordFirst = this.refs.recordFirst.getDOMNode().checked;
      let matchData = getMatchgamePartyData(partyPositions, partyPromises, recordFirst);
      this.setState({
        progress: 'game',
        matchData: matchData
      })
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
        let currentPeople = matchData[peopleName].positions;

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
      progress: 'result',
      currentRank: currentRank
    });
  }
  _replay(){
    //console.log("*replay")
   
    this.setState({
        currentQAItemIndex: 0,
        userChoices: {},
        showAnswerSection: -1,
        progress: 'config',
        completed: false
    })
    window.scrollTo(-100,0);
  }
  render() {
    const styles = require("./MatchGameParty.scss")
    const {issues} = this.props;
    let {qaSet, currentQAItemIndex, userChoices, showAnswerSection, 
         currentRank, progress, completed, 
         matchData} = this.state;

    let qaItems = qaSet.map((value,index)=>{
        return <QAItem key={`qaitem${index}`}
                       data={value}
                       currentQAItemIndex={currentQAItemIndex}
                       userChoices={userChoices}
                       recordHandler={this._recordUserChoice.bind(this)}
                       matchData={matchData}
                       maxIndex={qaSet.length-1}
                       unlockNext={this._unlockNext.bind(this)}
                       onShowMatchResult={this._onShowMatchResult.bind(this)}
                       completed={completed} />
    })

    // 配對結果
    let BottomSection;

    switch(progress){
      case 'config':
        return (
            <div className={styles.wrap}>
                <section className={styles.configSection}>
                    如果過去四年的立法院紀錄和政黨目前的承諾不同⋯⋯
                    <ul className={styles.list}>
                      <li className={styles.listItem}>
                        <label className={styles.radioLabel}>
                          <input type="radio" className={styles.radio} name="conflictResolver" value="recordFirst" ref="recordFirst" />
                            我選擇以紀錄為準
                        </label>
                      </li>
                      <li className={styles.listItem}>
                        <label className={styles.radioLabel}>
                          <input type="radio" className={styles.radio} name="conflictResolver" value="promiseFirst" />
                            我選擇以承諾為準
                        </label>
                      </li> 
                    </ul>
                    <button onClick={this._onSetConfig.bind(this)}
                            className={styles.button}>開始</button>
                </section>
            </div>
        )
        
      break;

      case 'game':
        return (
            <div className={styles.wrap}>
                {qaItems}
                <CandidatesHoldSigns matchData={matchData}
                                     userChoices={userChoices}
                                     currentQAItemIndex={currentQAItemIndex}
                                     showAnswerSection={showAnswerSection}/>
            </div>
        )
      break;

      case 'result':
        return (
            <div className={styles.wrap}>
                {qaItems}
                <ResultSection currentRank={currentRank}
                               matchData={matchData}
                               userChoices={userChoices}
                               replay={this._replay.bind(this)} />
            </div>
        )
      break;



    }
    
    return (//default
        <div></div>
    );
  }
}

class ResultSection extends Component {

  render(){
    const styles = require("./MatchGameParty.scss")
    const {currentRank, matchData, userChoices, replay} = this.props;

    // Best Fit
    let bestPKers = currentRank.map((party,index)=>{

        if(party.points === currentRank[0].points)
          return <ResultPKer rank={party} 
                             data={matchData[party.name]}
                             userChoices={userChoices} 
                             key={`resultPKer${index}`} />
    })
    
    // Worst Fit
    let lastIndex = currentRank.length-1;
    let worstPKers = currentRank.map((party,index)=>{
        if(party.points === currentRank[lastIndex].points)
          return <ResultPKer rank={party} 
                             data={matchData[party.name]}
                             userChoices={userChoices}
                             key={`resultPKer${index}`} />
    })
    
    // Everyone
    let resultPKers = currentRank.map((party,index)=>{
        return <ResultPKer rank={party} 
                           data={matchData[party.name]}
                           userChoices={userChoices}
                           key={`resultPKer${index}`} />
    })
    
    return (
      <div id="rankResultSection"
           className={styles.rankResultSection}>
          <div className={styles.rankResultWrap}>
              <div className={styles.rankResultTitle}>和你立場最相近的政黨</div>
              {bestPKers}
          </div>
    
          <div className={styles.rankResultWrap}>
              <div className={styles.rankResultTitle}>和你立場最不同的政黨</div>
              {worstPKers}
          </div>

          <div className={styles.replay}
               onClick={replay.bind(null)}>REPLAY</div>
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
