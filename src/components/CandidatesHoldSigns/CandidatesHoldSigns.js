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
    const {data, userChoices, currentQAItemIndex, showAnswerSection} = this.props;
    const {viewWidth} = this.state;

    let candidateItems = data.map((value, index)=>{
      return (
        <PKer data={value} 
              userChoices={userChoices}
              showAnswerSection={showAnswerSection}
              key={`${index}-${currentQAItemIndex}-${showAnswerSection}`}/>
      ) 
    })

    let containerWidth = (viewWidth <= 400) ? {
      width: `${data.length * 54 + 10}px`,
      margin: `0 auto`
    } : {};
    
    return (
        <div className={styles.CandidatesHoldSigns} 
             key={`CandidatesHoldSigns-${currentQAItemIndex}-${showAnswerSection}`}>
            <div style={containerWidth}>{candidateItems}</div>
        </div>
    );
  }
}
