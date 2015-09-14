import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {setCandidateFilter} from '../../ducks/candidatePositions';


import CandidateProfile from '../../components/CandidateProfile/CandidateProfile.js';
import CandidateIssueGroup from '../../components/CandidateIssueGroup/CandidateIssueGroup.js';
import RecordTable from '../../components/RecordTable/RecordTable.js';


import url2eng from '../../utils/url2eng';

@connect(
    state => ({
                  candidates: state.candidates,
                  candidatePositions: state.candidatePositions
               }),
    dispatch => bindActionCreators({setCandidateFilter}, dispatch))

export default class CandidateIssue extends Component {
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
    const styles = require('./CandidateIssue.scss');
    const id = this.props.params.candidateId;
    const issueURL = this.props.params.issueName;
    const {candidatePositions} = this.props;

    let issueDataName = url2eng(issueURL)

    if(!candidatePositions.data.positions) return <div></div>;

    const position = candidatePositions.data.positions[issueDataName];

    return (
      <div className={styles.wrap}> 
          <CandidateProfile id={id} />
          
          <div className={styles.issueWrap}> 
              <CandidateIssueGroup issueName={issueDataName}
                                   data={position} />
              <RecordTable data={position} /> 
          </div>
      </div>
    );
  }
}
