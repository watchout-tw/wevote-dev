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
  
  render() {
    const styles = require("./PKer.scss")
    const {data, userChoices, showAnswerSection} = this.props;

    //計算這個人的速配得分
    let points = 0;
    let positionArray = [];
    Object.keys(userChoices).map((k,i)=>{
        if(userChoices[k] === data.positions[k]){
            points++;
        }
        positionArray.push(data.positions[k]);
    })
    //console.log("**"+showAnswerSection)
    let posCardItem ;
    if(showAnswerSection >= 0){
        let currentPos = positionArray[showAnswerSection];
        posCardItem = <div className={`${styles.posCard} ${styles.ans} ${styles[currentPos]}`}>{currentPos}</div>;

    }else{
        posCardItem = <div className={styles.posCard}>???</div>;
    }
    
    return (
        <div className={styles.wrap}>
            {posCardItem}
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
