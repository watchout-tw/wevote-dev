import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";

import PeopleAvatar from '../../components/PeopleAvatar/PeopleAvatar.js';
import people_name2id from '../../utils/people_name2id';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';

//目前有資料的議題
const IssueList = [
     {
         "id": "marriageEquality",
         "cht": "婚",
         "url": "marriage-equality"
     },
     {
         "id": "recall",
         "cht": "罷",
         "url": "recall"
     },
     {
         "id": "referendum",
         "cht": "公",
         "url": "referendum"
     },
     {
         "id": "nuclearPower",
         "cht": "核",
         "url": "nuclear-power"
     },
     {
         "id": "courseGuide",
         "cht": "課",
         "url": "course-guide"
     },
     {
         "id": "justiceReform",
         "cht": "司",
         "url": "justice-reform"
     }
];

import getData from '../../data/getData';
const {records, legislators, issues} = getData();

export default class LegislatorList extends Component {
  
  constructor(props) { super(props)
      this.state = { 
        userPreference: {
          "marriageEquality" : "none",
          "recall" : "none",
          "referendum" : "none",
          "nuclearPower" : "none",
          "courseGuide" : "none",
          "justiceReform" : "none"
        },
        legislatorPositions: parseToLegislatorPosition(records, issues, legislators)
      }
  }

  _setPref(value,event){
      let currentPref = this.state.userPreference;
      currentPref[value.issue] = value.position;

      this.setState({
        userPreference: currentPref
      })

  }

  render() {
    const styles = require('./LegislatorList.scss');
    const id = this.props.params.peopleId;
    
    const { userPreference, legislatorPositions } = this.state;
    

    let legislatorItems = Object.keys(legislatorPositions).map((legislator, index)=>{
      let shouldReturn = true;
      // //黨團不顯示在此
      // if(legislator.indexOf("黨團")!==-1){
      //     shouldReturn = false;
      // }

      //只顯示相同立場的立委
      Object.keys(userPreference).map((currentIssue, index)=>{
          if(userPreference[currentIssue]!=="none"){

              //如果立委有這個議題的表態
              if(legislatorPositions[legislator].positions[currentIssue]){
                let currentLegislatorPosition = legislatorPositions[legislator].positions[currentIssue].dominantPosition;
              
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
        return <Record data={legislatorPositions[legislator]} 
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

   
    const positions = [
      { title:'我贊成',
        position: 'aye'},
      { title:'無意見',
        position: 'none'},
      { title:'我反對',
        position: 'nay'},
   
    ];

    let matchControlls = IssueList.map((value,index)=>{
        return (
          <div className={styles.matchItem} key={index}>
              {value.cht}
              {
                  positions.map((position, i)=>{
                    let styleIndex = `option_${position.position}`;
                    let activeStyle = (userPreference[value.id] === position.position)? "active" : "";

                    return <div className={` ${styles.matchOption} ${styles[styleIndex]} ${styles[activeStyle]}`} 
                                key={i}
                                onClick={handleSetPref.bind(null,{
                                  issue: value.id,
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

    let issueItems = IssueList.map((currentIssue, index)=>{
        let currentData = data.positions[currentIssue.id];
        //if(!currentData) return "";
        return (
          <Link to={`/people/${id}/records/${currentIssue.url}`}
                className={`${styles.issueCube} ${styles[currentData.dominantPosition]}`}>{currentIssue.cht}</Link>
        )
    });

    return (
      <div className={styles.item}>
      
          <div className={styles.avatar}><PeopleAvatar id={id}/></div>
          <Link to={`/people/${id}/records/`} div className={styles.name}>
              {data.name}
          </Link>
          <div className={styles.issueCubes}>
            {issueItems}
          </div>
     
      </div>
    )
  }

  props = {
    className: ''
  }
}
