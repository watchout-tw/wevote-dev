import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';

@connect(
    state => ({
                 
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class Parties extends Component {
  static propTypes = {
  }
  render() {
    const styles = require('./Parties.scss');

    return (
      <div className={styles.wrap}>
          
      </div>
    );
  }
}
