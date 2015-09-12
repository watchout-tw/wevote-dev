import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {setCandidateFilter} from '../../ducks/candidatePositions';


import CandidateAvatar from '../../components/CandidateAvatar/CandidateAvatar.js';

@connect(
    state => ({candidates: state.candidates,
               candidatePositions: state.candidatePositions
               }),
    dispatch => bindActionCreators({setCandidateFilter}, dispatch))

export default class Candidate extends Component {
  static propTypes = {
      setCandidateFilter: PropTypes.func.isRequired
  }
  componentWillMount(){
      const { candidates, setCandidateFilter } = this.props;
      const id = this.props.params.candidateId;
      const name = candidates[id].name;
      setCandidateFilter(name);
  }
  render() {
    const styles = require('./Candidate.scss');
    const id = this.props.params.candidateId;
    const {candidatePositions} = this.props;

    console.log(candidatePositions)

    return (
      <div className={styles.wrap}>
          <CandidateAvatar id={id} />
        
      </div>
    );
  }
}
