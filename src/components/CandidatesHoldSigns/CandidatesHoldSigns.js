import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import PKer from '../PKer/PKer';
@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class CandidatesHoldSigns extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
      this.state = {
      }
  }
  render() {
    const styles = require("./CandidatesHoldSigns.scss")
    const {data, userChoices, currentQAItemIndex, showAnswerSection} = this.props;
    
    console.log("#")
    console.log(showAnswerSection)

    let candidateItems = data.map((value, index)=>{
      return (
        <PKer data={value} 
              userChoices={userChoices}
              showAnswerSection={showAnswerSection}
              key={`${index}-${currentQAItemIndex}`}/>
      ) 
    })
    
    return (
        <div className={styles.CandidatesHoldSigns} 
             key={`CandidatesHoldSigns-${currentQAItemIndex}`}>
          {candidateItems}
        </div>
    );
  }
}
