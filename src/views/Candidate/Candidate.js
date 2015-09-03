import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import LegislatorAvatar from '../../components/LegislatorAvatar/LegislatorAvatar.js';

@connect(
    state => ({candidates: state.candidates}),
    dispatch => bindActionCreators({}, dispatch))

export default class Candidate extends Component {
  render() {
    const styles = require('./Candidate.scss');
    const id = this.props.params.candidateId;
    
    return (
      <div className={styles.wrap}>
          <LegislatorAvatar id={id} />
      </div>
    );
  }
}
