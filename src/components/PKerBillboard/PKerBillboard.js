import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PKer from '../PKer/PKer';
@connect(
    state => ({ parties: state.parties }),
    dispatch => bindActionCreators({}, dispatch))

export default class PKerBillboard extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
      
  }
  render() {
    const styles = require("./PKerBillboard.scss")
    let {matchData, userChoices, currentQAItemIndex, showAnswerSection, 
         parties, side} = this.props;


    let userChoicesArray = "";
    Object.keys(userChoices).map((v,i)=>{
      userChoicesArray += `${userChoices[v]} `
    })

    // to be refine <==> Parties
    let side1parties = [], side2parties = [];
    Object.keys(matchData).map((partyId, index)=>{
        if(parties[partyId].side === 1){
           side1parties.push(matchData[partyId])
        }else{
           side2parties.push(matchData[partyId])
        }
    })

    let currentSide = (side ===1) ? side1parties : side2parties;
    let PKerItems = currentSide.map((value, index)=>{
      return (
        <PKer matchData={value} 
              userChoices={userChoices}
              showAnswerSection={showAnswerSection}
              key={`side-${side}-${index}`}/>
      ) 
    })
   
    return (
        <div className={styles.PKerBillboard}>
            {PKerItems}
        </div>
    );
  }
}
