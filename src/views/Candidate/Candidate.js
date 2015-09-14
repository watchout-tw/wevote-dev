import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {setCandidateFilter} from '../../ducks/candidatePositions';

import CandidateProfile from '../../components/CandidateProfile/CandidateProfile.js';
import CandidateIssueGroup from '../../components/CandidateIssueGroup/CandidateIssueGroup.js';

import eng2url from '../../utils/eng2url';

@connect(
    state => ({candidates: state.candidates,
               candidatePositions: state.candidatePositions
               }),
    dispatch => bindActionCreators({setCandidateFilter}, dispatch))

export default class Candidate extends Component {
  static propTypes = {
      setCandidateFilter: PropTypes.func.isRequired,
      candidatePositions: PropTypes.object.isRequired
  }
  componentWillMount(){
      const { candidates, setCandidateFilter } = this.props;
      const id = this.props.params.candidateId;
      const name = candidates[id].name;
      setCandidateFilter(name);
  }
  componentWillReceiveProps(nextProps){
      
      const id = this.props.params.candidateId;
      const nextId = nextProps.params.candidateId;

      if(id !== nextId){
          const { candidates, setCandidateFilter } = this.props;
          const name = candidates[id].name;
          setCandidateFilter(name);
      }

  }
  render() {
    const styles = require('./Candidate.scss');
    const id = this.props.params.candidateId;
    const {candidatePositions} = this.props;

    //console.log(candidatePositions.data)

    const positions = candidatePositions.data.positions || {};
    
    let issueGroups = Object.keys(positions).map((currentIssue, index)=>{
        //console.log(positions[currentIssue])
        let issueUrl = eng2url(currentIssue);
        return (<div className={styles.issueBlock} key={index} >
                    <CandidateIssueGroup issueName={currentIssue}
                                         data={positions[currentIssue]}/>
                    <Link className={styles.seeMore} to={`/candidates/${id}/${issueUrl }`}>看更多</Link>
               </div>)
    })

    return (
      <div className={styles.wrap}>
          <CandidateProfile id={id} />
          <div className={styles.issueWrap}> 
            {issueGroups}
          </div>
      </div>
    );
  }
}
