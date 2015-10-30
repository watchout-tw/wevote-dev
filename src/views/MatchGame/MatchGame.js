import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import QAItem from '../../components/QAItem/QAItem';
import CandidatesHoldSigns from '../../components/CandidatesHoldSigns/CandidatesHoldSigns';
import PeopleAvatar from '../../components/PeopleAvatar/PeopleAvatar';

import people_name2id from '../../utils/people_name2id';
import eng2cht from '../../utils/eng2cht';

const fakeData = {
  "蔣乃辛": {
      "marriage-equality": {
          "record" : { "position": "none" },
          "promise" : { 
            "position": "aye",
            "statement": "我理解到人權的重要，未來將以行動支持同性婚姻合法化。"
          }
      },
      "recall": {
          "record" : { "position": "none" },
          "promise" : { 
            "position": "none",
            "statement": "罷免這個議題很複雜，牽涉到很多相關的機制，無法簡單的說贊成或反對。"
          }
      },
      "referendum": {
          "record" : { "position": "none" },
          "promise" : { 
            "position": "aye",
            "statement": ""
          }
      },
      "nuclear-power": {
          "record" : { "position": "nay" },
          "promise" : { 
            "position": "aye",
            "statement": "因為國民黨後來贊成停建了，所以我也決定遵從黨的意志。"
          }
      },
  },
  "范雲" : {
      "marriage-equality": {
          "promise" : {
            "position": "aye",
            "statement": "社民黨支持同性婚姻合法化。"
          } 
      },
      "recall": {
          "promise" : {
              "position": "aye",
              "statement": ""
          } 
      },
      "referendum": {
          "promise" : {
              "position": "aye",
              "statement": ""
          }
      },
      "nuclear-power": {
          "record" : { "position": "none" },
          "promise" : {
              "position": "aye",
              "statement": ""
          } 
      }
  },
  "陳家宏" : {

      "marriage-equality": {
          "promise" : {
            "position": "nay",
            "statement": ""
          } 
      },
      "recall": {
          "promise" : {
              "position": "none",
              "statement": ""
          } 
      },
      "referendum": {
          "promise" : {
              "position": "none",
              "statement": ""
          }
      },
      "nuclear-power": {
          "promise" : {
              "position": "aye",
              "statement": ""
          } 
      }
  },
  "吳旭智" : {
    
      "marriage-equality": {
          "promise" : {
            "position": "none",
            "statement": "需要社會共識"
          } 
      },
      "recall": {
          "promise" : {
              "position": "aye",
              "statement": ""
          } 
      },
      "referendum": {
          "promise" : {
              "position": "aye",
              "statement": ""
          }
      },
      "nuclear-power": {
          "promise" : {
              "position": "nay",
              "statement": ""
          } 
      }
   
  },
  "曾獻瑩": {
    
      "marriage-equality": {
          "promise" : {
            "position": "aye",
            "statement": ""
          } 
      },
      "recall": {
          "promise" : {
              "position": "nay",
              "statement": ""
          } 
      },
      "referendum": {
          "promise" : {
              "position": "none",
              "statement": ""
          }
      },
      "nuclear-power": {
          "promise" : {
              "position": "nay",
              "statement": ""
          } 
      }
  },
  "林珍妤" : {

      "marriage-equality": {
          "promise" : {
            "position": "nay",
            "statement": ""
          } 
      },
      "recall": {
          "promise" : {
              "position": "aye",
              "statement": ""
          } 
      },
      "referendum": {
          "promise" : {
              "position": "none",
              "statement": ""
          }
      },
      "nuclear-power": {
          "promise" : {
              "position": "nay",
              "statement": ""
          } 
      }
  },
  "龎維良" : {

      "marriage-equality": {
          "promise" : {
            "position": "nay",
            "statement": ""
          } 
      },
      "recall": {
          "promise" : {
              "position": "aye",
              "statement": ""
          } 
      },
      "referendum": {
          "promise" : {
              "position": "aye",
              "statement": ""
          }
      },
      "nuclear-power": {
          "promise" : {
              "position": "aye",
              "statement": ""
          } 
      }
    
  },
  "周芳如" : {
      "marriage-equality": {
          "promise" : {
            "position": "none",
            "statement": ""
          } 
      },
      "recall": {
          "promise" : {
              "position": "none",
              "statement": ""
          } 
      },
      "referendum": {
          "promise" : {
              "position": "none",
              "statement": ""
          }
      },
      "nuclear-power": {
          "promise" : {
              "position": "aye",
              "statement": ""
          } 
      }
  }
}

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
            description: props.issues[issueId].question,
            statement: props.issues[issueId].statement,
        }
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
      let matchData = {};
      Object.keys(fakeData).map((peopleName,i)=>{
          matchData[peopleName] = {};
          let currentData = fakeData[peopleName];

          Object.keys(currentData).map((issueId, k)=>{
              
              matchData[peopleName] [issueId] = currentData[issueId].promise.position;
              if(currentData[issueId].record){
                matchData[peopleName][issueId] = currentData[issueId].record.position;
              }
          })
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
          matchData: matchData//used for match, because position might conflicts

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
  _onChooseConflict(name, issueId, pos){
      // console.log("* onChooseConflict")
      // console.log(`決定 ${name} 在 ${issueId} 的立場是 ${pos}`);

      // 更新 matchData
      let {matchData} = this.state;
      matchData[name][issueId] = pos;
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
  _recordUserChoice(issueId, order, choice) {
      //console.log("record user choice:"+issueId+"-"+choice)
      
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

      this.setState({
          userChoices: currentChoices
      });
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

        Object.keys(currentPeople).map((issueId,k)=>{
            // 如果立場相同，並且使用者選擇的不是「沒意見」，加一分
            if((userChoices[issueId] === currentPeople[issueId])&&(userChoices[issueId]!=="none")){
                points++;
            }  
            // 如果立場相反，扣一分
            if(
                (userChoices[issueId] === "aye" && currentPeople[issueId] === "nay")||
                (userChoices[issueId] === "nay" && currentPeople[issueId] === "aye")
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
         currentRank, showRank, completed, matchData} = this.state;

    let qaItems = qaSet.map((value,index)=>{
        return <QAItem key={`qaitem${index}`}
                       data={value}
                       currentQAItemIndex={currentQAItemIndex}
                       userChoices={userChoices}
                       conflictHandler={this._onChooseConflict.bind(this)}
                       recordHandler={this._recordUserChoice.bind(this)}
                       candidatePositions={fakeData}
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

    Object.keys(data).map((issueId,i)=>{
      
      if(data[issueId] === userChoices[issueId] && userChoices[issueId] !== "none"){
          sameOpinions.push(issueId);
      }

      if(
       (data[issueId] === "aye" && userChoices[issueId] === "nay")||
       (data[issueId] === "nay" && userChoices[issueId] === "aye")
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
