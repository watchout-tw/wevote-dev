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
    let {data, userChoices, currentQAItemIndex, showAnswerSection} = this.props;
    let {viewWidth} = this.state;

    let userChoicesArray = "";
    Object.keys(userChoices).map((v,i)=>{
      userChoicesArray += `${userChoices[v]} `
    })

    let candidateItems = data.map((value, index)=>{
      return (
        <PKer data={value} 
              userChoices={userChoices}
              showAnswerSection={showAnswerSection}
              key={index}/>
      ) 
    })

    let containerWidth = (viewWidth <= 400) ? {
      width: `${data.length * 54 + 10}px`,
      margin: `0 auto`
    } : {};

    return (
        <div className={styles.CandidatesHoldSigns}>
            <div style={containerWidth}>{candidateItems}</div>
        </div>
    );
  }
}
