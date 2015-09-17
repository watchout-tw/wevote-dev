import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {getAllLegislators} from '../../ducks/legislatorPositions';

import PeopleAvatar from '../../components/PeopleAvatar/PeopleAvatar.js';

import people_name2id from '../../utils/people_name2id';

@connect(
    state => ({legislatorPositions: state.legislatorPositions
               }),
    dispatch => bindActionCreators({getAllLegislators}, dispatch))

export default class LegislatorList extends Component {
  static propTypes = {
      legislatorPositions: PropTypes.object.isRequired,
      getAllLegislators: PropTypes.func.isRequired
  }

  constructor(props) { super(props)
      this.state = { 
        userPreference: {
          "marriageEquality" : "none",
          "recall" : "none",
          "referendum" : "none"
        }
      }
  }

  _setPref(value,event){
      let currentPref = this.state.userPreference;
      currentPref[value.issue] = value.position;

      this.setState({
        userPreference: currentPref
      })

  }


  componentWillMount(){
      const { getAllLegislators } = this.props;
      getAllLegislators();
  }
  
  render() {
    const styles = require('./LegislatorList.scss');
    const id = this.props.params.peopleId;
    const { legislatorPositions} = this.props;
    const { userPreference } = this.state;
    

    let legislatorItems = Object.keys(legislatorPositions.data).map((legislator, index)=>{
      let shouldReturn = true;
      //黨團不顯示在此
      if(legislator==="台灣團結聯盟黨團"){
          shouldReturn = false;

      }

      //只顯示相同立場的立委
      Object.keys(userPreference).map((currentIssue, index)=>{
          if(userPreference[currentIssue]!=="none"){

              //如果立委有這個議題的表態
              if(legislatorPositions.data[legislator].positions[currentIssue]){
                let currentLegislatorPosition = legislatorPositions.data[legislator].positions[currentIssue].dominantPosition;
              
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
        return <Record data={legislatorPositions.data[legislator]} 
                       id={people_name2id(legislator)}
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
    const styles = require('./LegislatorList.scss');
    
    const {handleSetPref, userPreference} = this.props;

    const issues = [{ title:'婚', issue:'marriageEquality'},
                    { title:'罷', issue:'recall'},
                    { title:'公', issue:'referendum'}];
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
    const styles = require('./LegislatorList.scss');
    const {data, id} = this.props;
    
    if(!data.positions) return <div></div>

    //目前有資料的議題
    const IssueList = [
         {
             "id": "marriageEquality",
             "cht": "婚"
         },
         {
             "id": "recall",
             "cht": "罷"
         },
         {
             "id": "referendum",
             "cht": "公"
         }
    ]
  
    let issueItems = IssueList.map((currentIssue, index)=>{
        let currentData = data.positions[currentIssue.id];
        //if(!currentData) return "";
        return (
          <div className={`${styles.issueCubeLast} ${styles[currentData.dominantPosition]}`}>{currentIssue.cht}</div>
        )
    });

    return (
      <div className={styles.item}>
      <Link to={`/people/${id}`} className={styles.link}>
          <PeopleAvatar id={id}/>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.issueCubes}>
            {issueItems}
          </div>
      </Link>
      </div>
    )
  }

  props = {
    className: ''
  }
}
