import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import eng2cht from '../../utils/eng2cht'
import eng2party_short from '../../utils/eng2party_short'
import PeopleAvatar from '../PeopleAvatar/PeopleAvatar';

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class PKer extends Component {
  static propTypes = {
  }
  constructor(props){super(props)
     //把候選人的資料 array 化
    let positionArray = [];
    Object.keys(props.matchData).map((k,i)=>{
        positionArray.push(props.matchData[k]);

    })
    
    this.state = {
      positionArray: positionArray,
      indexToIssueId: Object.keys(props.matchData),
      points: 0, 
      diff: 0
    }

  }
  componentWillReceiveProps(nextProps){
    let {matchData, userChoices} = nextProps;
    let {points, userChoiceArray} = this.state;
   
    // console.log("count points")
    // console.log(data)

    //更新 positionArray
    let positionArray = [];
    Object.keys(matchData).map((k,i)=>{
        positionArray.push(matchData[k]);
    })

    //計算這個人的速配得分
    let newPoints = 0;
    Object.keys(userChoices).map((k,i)=>{
        //如果立場相同，並且使用者選擇的不是「沒意見」，加一分
        if((userChoices[k] === matchData[k])&&(userChoices[k]!=="none")){
            newPoints++;
        }  
        //如果立場相反，扣一分
        if(
            (userChoices[k] === "aye" && matchData[k] === "nay")||
            (userChoices[k] === "nay" && matchData[k] === "aye")
           ){
            newPoints--;
        } 
    })
    
    this.setState({
        points: newPoints,
        positionArray: positionArray,
        diff: newPoints - points
    })
  }

  render() {
    const styles = require("./PKer.scss")
    let {peopleName, matchData, positionData, userChoices, showAnswerSection} = this.props;
    let {positionArray, indexToIssueId, points, diff} = this.state;
    
    //依照 window 所在位置決定要放答案 or ???
    //如果在 window 內並且使用者已經選擇過答案才顯示
    let keyName = indexToIssueId[showAnswerSection];

    let showBackClass, currentPos;
    if((showAnswerSection >= 0)&&(userChoices[keyName])){
        //show back: 各人立場
        showBackClass = styles.showBack;
        currentPos = positionArray[showAnswerSection];
        
    }else{
        //show front: ???
        showBackClass = styles.showFront;
    }

    let animatePointDiffClass = (diff !== 0) ? styles.animate : styles.hide;
    let diffText = (diff > 0) ? `+${diff}`: diff;
    
    return (
        <div className={`${styles.wrap} ${showBackClass}`}>
            <div className={` ${styles.pointDiff} ${animatePointDiffClass} `}>{diffText}</div>
            <div className={styles.container}>
                <div className={`${styles.cardWrap}`}>
                    <div className={`${styles.posCard} ${styles.front}`}>？</div>
                    <div className={`${styles.posCard} ${styles.back} ${styles.ans} ${styles[currentPos]}`}>{handleCardPos(currentPos)}</div>
                </div>
                <div className={styles.avatarImg}>
                    <div className={`${styles.partyFlag} ${styles.small} ${styles[positionData.id]}`}></div>
                </div>
                <div className={styles.name}>{eng2party_short(positionData.id)}</div>
                <div className={styles.points}>
                    {points}  
                </div>
            </div>
        </div>
    );
  }
}
function handleCardPos(pos){
    if(pos==="none"){
        return "未表態"
    }else{
        return eng2cht(pos)
    }
}
