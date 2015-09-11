import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import CandidateAvatar from '../../components/CandidateAvatar/CandidateAvatar.js';

@connect(
    state => ({candidates: state.candidates}),
    dispatch => bindActionCreators({}, dispatch))

export default class Candidate extends Component {
  render() {
    const styles = require('./Candidate.scss');
    const id = this.props.params.candidateId;
    
    return (
      <div className={styles.wrap}>
          <CandidateAvatar id={id} />
      </div>
    );
  }
}
