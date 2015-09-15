import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {getAllParties} from '../../ducks/partyPositions';


@connect(
    state => ({partyPositions: state.partyPositions
               }),
    dispatch => bindActionCreators({getAllParties}, dispatch))

export default class PartyList extends Component {
  static propTypes = {
      partyPositions: PropTypes.object.isRequired,
      getAllParties: PropTypes.func.isRequired
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
      const { getAllParties } = this.props;
      getAllParties();
  }
  
  render() {
    const styles = require('./PartyList.scss');
    const id = this.props.params.candidateId;
    const { partyPositions} = this.props;
    const { userPreference } = this.state;
    

    let partyItems = Object.keys(partyPositions.data).map((party, index)=>{
      let shouldReturn = true;
      

      //只顯示相同立場的政黨
      Object.keys(userPreference).map((currentIssue, index)=>{
          if(userPreference[currentIssue]!=="none"){

              //如果立委有這個議題的表態
              if(partyPositions.data[party].positions[currentIssue]){
                let currentPartyPosition = partyPositions.data[party].positions[currentIssue].dominantPosition;
              
                //檢查兩者意見是否相同
                if(userPreference[currentIssue] !== currentPartyPosition)
                   shouldReturn = false;

              
              }else{
                //沒有在這個議題表態的立委也不符合需求
                shouldReturn = false;
              }
          }
      })

      if(shouldReturn){
        return <Record data={partyPositions.data[party]} 
                       name={partyPositions.data[party].name}
                       id={party}
                       key={index}/>
      }
    })

    return (
      <div className={styles.wrap}>
          <div className={styles.title}>Match your position / 哪個政黨跟你相同立場？</div>
          <Matcher handleSetPref={this._setPref.bind(this)}
                   userPreference={userPreference}/>
          <div>{partyItems}</div>
          
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
    const styles = require('./PartyList.scss');
    
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
    const styles = require('./PartyList.scss');
    const {data, id, name} = this.props;
    
    console.log(this.props);
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
          <Link to={`/parties/${id}`} className={styles.link}>
              
              <div className={styles.name}>{name}</div>
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
