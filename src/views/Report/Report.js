import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router";

@connect(
    state => ({legislators: state.legislators,
               issues: state.issues,
               records: state.records
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class Record extends Component {
  static propTypes = {
      
  }
  constructor(props){ super(props)
      
  }
 
  render() {
    const styles = require('./Report.scss');
    
    return (
    <div className={styles.wrap}>  
        report
    </div>

    ); 
  }
}
