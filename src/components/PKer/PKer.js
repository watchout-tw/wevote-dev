import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import people_name2id from '../../utils/people_name2id';
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
    Object.keys(props.data.positions).map((k,i)=>{
        positionArray.push(props.data.positions[k]);

    })

    this.state = {
      positionArray: positionArray,
      indexToIssueId: Object.keys(props.data.positions)
    }

  }
  
  render() {
    const styles = require("./PKer.scss")
    const {data, userChoices, showAnswerSection} = this.props;
    const {positionArray, indexToIssueId} = this.state;

    //計算這個人的速配得分
    let points = 0;
    Object.keys(userChoices).map((k,i)=>{
        if(userChoices[k] === data.positions[k]){
            points++;
        }  
    })

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
    
    return (
        <div className={`${styles.wrap} ${showBackClass}`}>
            
            <div className={`${styles.cardWrap}`}>
                <div className={`${styles.posCard} ${styles.front}`}>？</div>
                <div className={`${styles.posCard} ${styles.back} ${styles.ans} ${styles[currentPos]}`}>{currentPos}</div>
            </div>
            <div className={styles.avatarImg}>
                <PeopleAvatar id={people_name2id(data.name)} />
            </div>
            <div className={styles.name}>{data.name}</div>
            <div className={styles.points}>
                {points}  
            </div>
        </div>
    );
  }
}
