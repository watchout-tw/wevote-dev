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
  
  componentWillMount(){
      const { getAllCandidates } = this.props;
      getAllCandidates();
  }
  
  render() {
    const styles = require('./CandidateList.scss');
    const id = this.props.params.candidateId;
    const { candidatePositions} = this.props;
    

    let legislatorItems = Object.keys(candidatePositions.data).map((legislator, index)=>{
      //黨團不顯示在此
      if(legislator!=="台灣團結聯盟黨團"){
        
        return <Record data={candidatePositions.data[legislator]} 
                       id={candidates_name2id(legislator)}
                       key={index}/>
      
      }
    })

    return (
      <div className={styles.wrap}>
          <div>Match your position / 誰跟你相同立場？</div>
          <div>{legislatorItems}</div>
          
      </div>
    );
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
