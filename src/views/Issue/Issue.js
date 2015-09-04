import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import PositionGroup from '../../components/PositionGroup/PositionGroup.js';
import Slideshow from '../../components/Slideshow/Slideshow.js';

@connect(
    state => ({issues: state.issues}),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  render() {
    const styles = require('./Issue.scss');

    const {issues} = this.props;
    const issue = issues[this.props.params.issueName];

    let positionGroups = issue.positions.map((value, index)=>{
      return <PositionGroup data={value} key={index}/>
    })

    // <h1>{issue.title}</h1>
    // <p>{issue.question}</p>

    return (
      <div className={styles.masthead}>
          <Slideshow data={issue.slideshows} topic={issue.title}/>
          {positionGroups}
      </div>
    );
  }
}
