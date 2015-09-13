import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {getAllCandidates} from '../../ducks/candidatePositions';

import CandidateAvatar from '../../components/CandidateAvatar/CandidateAvatar.js';

import candidates_name2id from '../../utils/candidates_name2id';

@connect(
    state => ({candidatePositions: state.candidatePositions
               }),
    dispatch => bindActionCreators({getAllCandidates}, dispatch))

export default class CandidateList extends Component {
  static propTypes = {
      candidatePositions: PropTypes.object.isRequired,
      getAllCandidates: PropTypes.func.isRequired
  }

  constructor(props) { super(props)
      this.state = { 
        userPreference: {
          "marriageEquality" : "none",
          "recall" : "none"
        }
      }
  }

  _setPref(value,event){
      let currentPref = this.state.userPreference;
      currentPref[value.issue] = value.position;

      console.log(value)
      this.setState({
        userPreference: currentPref
      })

  }


  componentWillMount(){
      const { getAllCandidates } = this.props;
      getAllCandidates();
  }
  
  render() {
    const styles = require('./CandidateList.scss');
    const id = this.props.params.candidateId;
    const { candidatePositions} = this.props;
    const { userPreference } = this.state;
    

    let legislatorItems = Object.keys(candidatePositions.data).map((legislator, index)=>{
      let shouldReturn = true;
      //黨團不顯示在此
      if(legislator==="台灣團結聯盟黨團"){
          shouldReturn = false;

      }

      //只顯示相同立場的立委
      Object.keys(userPreference).map((currentIssue, index)=>{
          if(userPreference[currentIssue]!=="none"){

              //如果立委有這個議題的表態
              if(candidatePositions.data[legislator].positions[currentIssue]){
                let currentLegislatorPosition = candidatePositions.data[legislator].positions[currentIssue].dominantPosition;
              
                //檢查兩者意見是否相同
                if(userPreference[currentIssue] !== currentLegislatorPosition)
                   shouldReturn = false;

              
              }else{
                //沒有在這個議題表態的立委也不符合需求
                shouldReturn = false;
              }
          }
      })



      if(shouldReturn){
        return <Record data={candidatePositions.data[legislator]} 
                       id={candidates_name2id(legislator)}
                       key={index}/>
      }
    })

    return (
      <div className={styles.wrap}>
          <div className={styles.title}>Match your position / 誰跟你相同立場？</div>
          <Matcher handleSetPref={this._setPref.bind(this)}
                   userPreference={userPreference}/>
          <div>{legislatorItems}</div>
          
      </div>
    );
  }
}
class Matcher extends Component {
  static propTypes = {
      handleSetPref: PropTypes.func.isRequired,
      userPreference: PropTypes.object.isRequired
  }

  //設定 initial state
  constructor(props) { super(props)
      this.state = { active: false}
  }
  
  render() {
    const styles = require('./CandidateList.scss');
    
    const {handleSetPref, userPreference} = this.props;

    const issues = [{ title:'婚', issue:'marriageEquality'},
                    { title:'罷', issue:'recall'}];
    const positions = [
      { title:'我贊成',
        position: 'aye'},
      { title:'無意見',
        position: 'none'},
      { title:'我反對',
        position: 'nay'},
   
    ];

    let matchControlls = issues.map((value,index)=>{
        return (
          <div className={styles.matchItem} key={index}>
              {value.title}
              {
                  positions.map((position, i)=>{
                    let styleIndex = `option_${position.position}`;
                    let activeStyle = (userPreference[value.issue] === position.position)? "active" : "";

                    return <div className={` ${styles.matchOption} ${styles[styleIndex]} ${styles[activeStyle]}`} 
                                key={i}
                                onClick={handleSetPref.bind(null,{
                                  issue: value.issue,
                                  position: position.position
                                })}>
                                {position.title}
                           </div>
                  })
              }
          </div>
        )
    })
    return (
      <div className={styles.matcher}>
        {matchControlls}
      </div>
    )
  }

  props = {
    className: ''
  }
}
class Record extends Component {
  static propTypes = {
    data : PropTypes.object.isRequired, 
    id : PropTypes.number
  }

  // //設定 initial state
  constructor(props) { super(props)
      this.state = { active: false}
  }
  
  _setActive(value, event){
    this.setState({ active: true });
  }

  _setInactive(){  
    this.setState({ active: false });
  }

  render() {
    const styles = require('./CandidateList.scss');
    const {data, id} = this.props;
    
    if(!data.positions) return <div></div>

    const {marriageEquality, recall} = data.positions;

    let marriageEqualityItem = (marriageEquality)?(
      <div className={`${styles.issueCube} ${styles[marriageEquality.dominantPosition]}`}>婚</div>
    ):<div className={`${styles.issueCube} ${styles.none}`}>婚</div>;

    let recallItem = (recall)?(
      <div className={`${styles.issueCubeLast} ${styles[recall.dominantPosition]}`}>罷</div>
    ):<div className={`${styles.issueCubeLast} ${styles.none}`}>罷</div>;


    return (
      <div className={styles.item}>
      <Link to={`/candidates/${id}`} className={styles.link}>
          <CandidateAvatar id={id}/>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.issueCubes}>
            {marriageEqualityItem}
            {recallItem}
          </div>
      </Link>
      </div>
    )
  }

  props = {
    className: ''
  }
}
