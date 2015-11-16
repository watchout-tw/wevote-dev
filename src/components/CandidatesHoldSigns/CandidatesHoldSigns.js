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
        viewWidth: 400 // default to mobile
      }
  }
  componentDidMount(){
      //update view width
      this.setState({
        viewWidth: window.innerWidth
      })
      window.addEventListener('resize', this._onResize.bind(this));
  }
  componentWillUnmount(){
      window.removeEventListener('resize', this._onResize.bind(this));
  }
  _onResize(){
      this.setState({
        viewWidth: window.innerWidth
      })
  }
  render() {
    const styles = require("./CandidatesHoldSigns.scss")
    let {matchData, positionData, userChoices, currentQAItemIndex, showAnswerSection} = this.props;
    let {viewWidth} = this.state;

    let userChoicesArray = "";
    Object.keys(userChoices).map((v,i)=>{
      userChoicesArray += `${userChoices[v]} `
    })
    
    let candidatePartyItems = Object.keys(matchData).map((partyId, index)=>{
      return (
        <PKer matchData={matchData[partyId]} 
              positionData={positionData[partyId]}
              userChoices={userChoices}
              showAnswerSection={showAnswerSection}
              key={index}/>
      ) 
    })

    // matchData  
    // "KMT": {
    //     "marriage-equality": "none",
    //     "recall": "none",
    //     "referendum": "none",
    //     "nuclear-power": "nay"
    // },


    let containerWidth = (viewWidth <= 450) ? {
      width: `${Object.keys(matchData).length * 34}px`,
      margin: `0 auto`
    } : {};

    return (
        <div className={styles.CandidatesHoldSigns}>
            <div style={containerWidth}>{candidatePartyItems}</div>
        </div>
    );
  }
}
