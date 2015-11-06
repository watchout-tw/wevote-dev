import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router";

@connect(
    state => ({
                  MaXiRecords: state.MaXiRecords
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Report extends Component {
  static propTypes = {
      
  }
  constructor(props){ super(props)
      
  }
 
  render() {
    const styles = require('./Report.scss');
    const {MaXiRecords} = this.props;
    
    return (
    <div className={styles.wrap}>  
        
    </div>

    ); 
  }
}
