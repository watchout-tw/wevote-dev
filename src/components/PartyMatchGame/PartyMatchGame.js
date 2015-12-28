import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';

import QAItem from '../../components/QAItem/QAItem';
import PKer from '../../components/PKer/PKer';
import PartyFlag from '../../components/PartyFlag/PartyFlag';

import people_name2id from '../../utils/people_name2id';
import eng2party_short from '../../utils/eng2party_short';
import eng2cht from '../../utils/eng2cht';
import url2eng from '../../utils/url2eng';
import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getPartiesMatchgameData from '../../utils/getPartiesMatchgameData';
import scrollTo from '../../utils/scrollTo';

import getData from '../../data/getData';
const {records, legislators, issues, parties, partyPromises, dataMeta} = getData();

export default class PartyMatchGame extends Component {
  constructor(props){ super(props)
      //prepare qa set
      let qaSet = Object.keys(issues).map((issueUrl, index)=>{
        return {
            id: `Question${index}`,
            issueName: url2eng(issueUrl),
            order: index,
            title: issues[issueUrl].title,
            description: issues[issueUrl].question,
            statement: issues[issueUrl].statement,
        }
      })
      this.state = {
          qaSet: qaSet,
          currentQAItemIndex: 0,
          userChoices: {
            // Format // "marriage-equality":"aye"
          },
          progress: 'config', // config->game->result
          completed: false,
          currentRank: [],

          matchData: {},
          recordFirst: ""
      }
  }
  _onSetConfigAndMove(recordFirst, event){
      this._onSetConfig(recordFirst, event);
      setTimeout(()=>{
         // Scroll to 1st question
        let target = document.getElementById("Question0");
        let targetPos = document.body.scrollTop + target.getBoundingClientRect().top;

        scrollTo(document.body, targetPos, 120);

      }, 50)
  }
  _onSetConfig(recordFirst, event){

      // 使用者選擇要用過去或是承諾
      // update match data, prepare party position
      
      // 計算新的比對資料
      let partyPositions = parseToPartyPosition(records, issues);
      let matchData = getPartiesMatchgameData(partyPositions, partyPromises, recordFirst);
      this.setState({
        matchData: matchData
      })

      const {progress} = this.state;
      if(progress !== "config"){
         //如果已經開始作答後又重新選擇 config，重新計算分數
         //必須在設定了新的 matchData 後，再算分數！
         this._onShowMatchResult(matchData);
      }

      let nextProgress = (progress === "config") ? "game" : progress;
      this.setState({
        progress: nextProgress,
        recordFirst: recordFirst
      })

      
  }
  _recordUserChoice(issueName, order, choice) {
      //console.log("record user choice:"+issueName+"-"+choice)

      let currentChoices = this.state.userChoices;

      // if(currentChoices[issueName]){
      //    return;//如果已經回答過，不再重複登記
      // }

      currentChoices[issueName] = choice;

      this.setState({
          userChoices: currentChoices,
          completed: true
      });

      const {progress} = this.state;
      if(progress==="result"){//如果已經算答案，重新計算
         this._onShowMatchResult();
      }
  }
  _unlockNext(){
      let next = this.state.currentQAItemIndex + 1;
      this.setState({
          currentQAItemIndex: next
      });
  }
  _onShowMatchResult(input){
    //console.log("i'm in charge. i'll take care of that. -by MatchGame")

    // 計算 rank
    let currentRank = [];
    let {userChoices} = this.state;
    let matchData = input || this.state.matchData;

    Object.keys(matchData).map((partyId, index)=>{
        let points = 0;
        let samePositionCount = 0;
        let currentParty = matchData[partyId].positions;

        Object.keys(currentParty).map((issueName,k)=>{
            // 如果立場相同，並且使用者選擇的不是「沒意見」，加一分
            if((userChoices[issueName] === currentParty[issueName])&&(userChoices[issueName]!=="none")){
                points++;
                samePositionCount++;
            }
            // 如果立場相反，扣一分
            if(
                (userChoices[issueName] === "aye" && currentParty[issueName] === "nay")||
                (userChoices[issueName] === "nay" && currentParty[issueName] === "aye")
               ){
                points--;
            }

        });

        currentRank.push(
          Object.assign(currentParty, {
            id: partyId,
            points: points,
            samePositionCount: samePositionCount
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
        progress: 'config',
        completed: false
    })
    window.scrollTo(-100,0);
  }
  render() {
    const styles = require("./PartyMatchGame.scss")
    const {onSetStage} = this.props;
    let {qaSet, currentQAItemIndex, userChoices, showAnswerSection,
         currentRank, progress, completed,
         matchData, recordFirst} = this.state;

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

    // config 設定選單
    let configPanel = <ConfigSection onSetConfig={this._onSetConfig.bind(this)}
                                     onSetConfigAndMove={this._onSetConfigAndMove.bind(this)} />

    // 配對結果
    let BottomSection;

    switch(progress){
      case 'config':
        return (
            <div className={styles.wrap}>
                {configPanel}
            </div>
        )

      break;

      case 'game':
        return (
            <div className={styles.wrap}>
                {configPanel}
                {qaItems}
            </div>
        )
      break;

      case 'result':
        return (
            <div className={styles.wrap}>
                {configPanel}
                {qaItems}
                <ResultSection currentRank={currentRank}
                               userChoices={userChoices}
                               replay={this._replay.bind(this)}
                               onSetStage={onSetStage}
                               recordFirst={recordFirst} />
            </div>
        )
      break;

    }

    return (//default
        <div></div>
    );
  }
}

class ConfigSection extends Component {
    componentDidMount(){
      // default set to 以過去紀錄為準
      this.refs.recordFirst.getDOMNode().checked = true;
    }
    _onClick(){
      const {onSetConfig} = this.props;
      let recordFirst = this.refs.recordFirst.getDOMNode().checked;
      onSetConfig(recordFirst);
    }
    _onClickMove(){
      const {onSetConfigAndMove} = this.props;
      let recordFirst = this.refs.recordFirst.getDOMNode().checked;
      onSetConfigAndMove(recordFirst);
    }
    render(){
      const styles = require("./PartyMatchGame.scss")
      return (
        <div>
          <section className={styles.configSection}>
              如果政黨過去紀錄和未來承諾不同，你想要讀取的是⋯⋯
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <label className={styles.radioLabel}>
                    <input type="radio" className={styles.radio} name="conflictResolver" value="recordFirst" ref="recordFirst"
                           onChange={this._onClick.bind(this)} />
                      舊的紀錄
                  </label>
                </li>
                <li className={styles.listItem}>
                  <label className={styles.radioLabel}>
                    <input type="radio" className={styles.radio} name="conflictResolver" value="promiseFirst" 
                           onChange={this._onClick.bind(this)}/>
                      新的承諾
                  </label>
                </li>
              </ul>

          </section>

          <div className={styles.actionButtons}>
              <div onClick={this._onClickMove.bind(this)}
                  className={styles.actionButton}>繼續</div>
          </div>
      </div>
      )
    }
}



class ResultSection extends Component {
  constructor(props){super(props)
    this.state = {
      "focus" : ""
    }
  }
  _setFocus(value, event){
    this.setState({
      "focus" : value
    })
  }
  render(){
    const styles = require("./PartyMatchGame.scss")
    let {currentRank, userChoices, replay, onSetStage, recordFirst} = this.props;
    let {focus} = this.state;

    let resultPKers = {};
    let noData = [];

    //高分 -> 低分 sort
    currentRank.sort((a,b)=>{
      if(b.points !== a.points){
        return b.points - a.points;

      }else{
        // sort by 一樣立場的次數
        if(a.samePositionCount !== b.samePositionCount){
            return b.samePositionCount - a.samePositionCount;

        }else{
            // 然後才是名稱
            if(a.id > b.id) return -1;
            else return 1;

        }

      }
    });

    //最高分的名稱
    let maxPoint = currentRank[0].points;
    let highestPointer = [];
    currentRank.map((party,index)=>{
        if(party.points === maxPoint){
           highestPointer.push(party);
        }
    })

    let highestPointerName = highestPointer.map((party,index)=>{
        if(party.points === maxPoint){
           let separation = (index !== highestPointer.length-1) ? "、" : "";
           return  (
            <span key={`result-text-${party.id}`}>
                <PartyFlag partyId={party.id} />
                { separation }
            </span>)
           ;
        }
    })

    //依照分數分組
    currentRank.map((party,index)=>{
        let point = party.points;
        if(!resultPKers[point]){
          resultPKers[point] = [];
        }
        if(partyPromises[party.id].hasReply || parties[party.id].hasBeenCount > 0){
          //有回覆 或者 第八屆有席次
          resultPKers[point].push(party)
        }else{
          noData.push(party.id);
        }

    })

    //Layout: match 結果
    let array = [];
    for(let i=6;i>=-6;i--){
      array.push(i);
    }

    let resultSpectrum = array.map((i,index)=>{

        let hue = (resultPKers[i] || []).map((v,j)=>{
          let detail;
          if(focus === v.id){
            let partyCht = eng2party_short(v.id);

            let rows = Object.keys(userChoices).map((issueName, i)=>{
                let userPos = userChoices[issueName];
                let issueCht = eng2cht(issueName);
                let partyPos = v[issueName] || "none";

                return (
                  <tr><td className={styles.hoverDetailTableColumn}><div className={`${styles.posIcon} ${styles[userPos]} `}></div></td>
                      <td className={styles.hoverDetailTableColumn}>{issueCht}</td>
                      <td className={styles.hoverDetailTableColumn}><div className={`${styles.posIcon} ${styles[partyPos]} `}></div></td></tr>
                  );
            })
            detail = (
              <table className={styles.hoverDetailTable}>
                <thead><tr><td className={styles.hoverDetailTableColumn}>你</td>
                           <td className={styles.hoverDetailTableColumn}>議題</td>
                           <td className={styles.hoverDetailTableColumn}>{partyCht}</td></tr></thead>
                {rows}
              </table>
            )
          }

          return (
              <div className={styles.hueItem}
                   key={`hue-${i}-${j}-${recordFirst}`}
                   onClick={this._setFocus.bind(this, v.id)}
                   onMouseEnter={this._setFocus.bind(this, v.id)}
                   onMouseLeave={this._setFocus.bind(this, "")}>
                  {detail}
                  <PKer id={v.id} />
              </div>
          )
        })
        let hueClasses = classnames({
          [styles.hue]: true,
          [styles.empty] : !resultPKers[i]
        })

        let label;
        if(Number(i) === currentRank[0].points){
          label = <div className={`${styles.positionTitle}`}>與你立場最相同</div>;
        }
        let last = currentRank.length-1;
        if(Number(i) === currentRank[last].points){
          label = <div className={`${styles.positionTitle}`}>與你立場最不同</div>;
        }

        return (
            <div className={hueClasses}>
                {label}

                <div className={styles.huePoint}>
                  <span className={styles.huePointLable}>總分</span>
                  {i}
                </div>

                <div className={styles.hueItemBlock}>{hue}</div>
            </div>
        );
    })

    //Layout: 沒資料的結果
    let noDataItems = noData.map((partyId, i)=>{
      return (
        <div className={styles.noDataItem}
             key={`no-data-${i}`}>
             <PKer id={partyId} />
        </div>
      )
    })

    return (
      <div id="rankResultSection">
          
          <div className={styles.resultInfo}>

              <h2>跟你立場最接近的是</h2>
              { highestPointerName }
            
              <div className={styles.goBlock}>
                  <div className={styles.goWrap}>
                      <div className={styles.goText}>還無法決定嗎？</div>
                      <div className={styles.goButton}
                           onClick={onSetStage.bind(null, "bill")}>看黨團未來戰鬥目標</div>
                  </div>
                  <div className={styles.goWrap}>
                      <div className={styles.goTable}
                          onClick={replay.bind(null)}>再玩一次</div>
                  </div>
              </div>
          </div>

          <div className={styles.rankResultSection}>
              <div className={styles.figHeader}>
                  <p>立場配對分數表</p>
                  <div className={styles.figDes}>{dataMeta['matchgame-position']}</div>
              </div>
              <div className={styles.spectrum}>
                  {resultSpectrum}
              </div>

              <div className={styles.noDataBlock}>
                  <div className={`${styles.positionTitle} ${styles.left}`}>無資料</div>
                  <div className={styles.noDataItems}>{noDataItems}</div>
              </div>
         
          </div>

          

      </div>
    )
  }
}
