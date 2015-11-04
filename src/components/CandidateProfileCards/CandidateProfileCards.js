import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {load} from '../../ducks/candidateDynamicData.js';

import people_name2id from '../../utils/people_name2id';
import getDistrictCandidates from '../../utils/getDistrictCandidates';
import parseDynamicData from '../../utils/parseDynamicData';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';

@connect(
    state => ({
      candidateDynamicData: state.candidateDynamicData.data,
      candidates: state.candidates
    }),
    dispatch => bindActionCreators({load}, dispatch))

export default class CandidateProfileCards extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
    this.state = {
      candidateDynamicLoad: ""
    }
  }
  componentWillMount(){
    this.props.load();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.candidateDynamicData){
      this.setState({
        candidateDynamicLoad: parseDynamicData(nextProps.candidateDynamicData.value)
      })
    }
  }
  
  render() {
    const styles = require("./CandidateProfileCards.scss")
    const {candidates, area, areaNo} = this.props;
    const {candidateDynamicLoad} = this.state;
    
    let candidateList = getDistrictCandidates(candidates, area, areaNo);
    let candidateCardItems = candidateList.map((value, index)=>{
        let goals;
        if(candidateDynamicLoad[value.name])
            goals = candidateDynamicLoad[value.name].goals

        return <Card candidates={candidates} 
                     id={value.id}
                     goals={goals}
                     key={`candiate-card-${index}`} />
    })


    return (
        <div className={styles.wrap}>
            <div className={styles.cardItems}>{candidateCardItems}</div>
        </div>
    );
  }
}

class Card extends Component {
  render() {
    const styles = require("./CandidateProfileCards.scss")
    const {id, candidates, goals} = this.props;
    const people = candidates[id];
    if(!people) return <div></div>

    let goalItems = (goals||[]).map((value, index)=>{
        return (
            <li key={`${id}-${index}`}>{value.goal}</li>
        )
    })

    return (
        <div className={`${styles.cardItem} ${styles.reflectBelow}`}>
            <div className={styles.partyItem}>
              <div className={`${styles.partyFlag} ${styles.small} ${styles[people.party]}`}></div>
            </div>
            <div className={styles.name}>{people.name}</div>
            <div className={styles.peoplePhoto}><PeoplePhoto id={id}/></div>
            <div className={styles.goalSection}>
                <div className={styles.goalTitle}>戰鬥目標</div>
                <ul className={styles.goalList}>{goalItems}</ul>
            </div>
        </div>
    );
  }

}
