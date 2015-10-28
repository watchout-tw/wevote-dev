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
   

    let candidateItems = data.map((value, index)=>{
      return (
        <PKer data={value} 
              userChoices={userChoices}
              showAnswerSection={showAnswerSection}
              key={`${index}-${currentQAItemIndex}`}/>
      ) 
    })

    let containerWidth = {
      width: `${data.length * 50 + 10}px`
    }
    
    return (
        <div className={styles.CandidatesHoldSigns} 
             key={`CandidatesHoldSigns-${currentQAItemIndex}`}>
            <div style={containerWidth}>{candidateItems}</div>
        </div>
    );
  }
}
