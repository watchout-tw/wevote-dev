import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

import eng2cht from '../../utils/eng2cht';
import people_name2id from '../../utils/people_name2id';
import PeoplePhoto from '../PeoplePhoto/PeoplePhoto';

@connect(
    state => ({  MaXiRecords: state.MaXiRecords }),
    dispatch => bindActionCreators({}, dispatch))

export default class RecordStream extends Component {
  static propTypes = {
  }
  
  render() {
    const styles = require('./RecordStream.scss');
    const { MaXiRecords, activeLegislator} = this.props;
    const people = MaXiRecords[activeLegislator];
    
    if(!people) return <div/>;
    if(!people.records) return<div/>;

    let recordItems = people.records.map((card, index)=>{
        return (
           <div className={styles.recordCard}>
              {card}
           </div>
        )
    })

    return (
        <div className={styles.wrap}>
           {recordItems}
        </div>
    );
  }
}