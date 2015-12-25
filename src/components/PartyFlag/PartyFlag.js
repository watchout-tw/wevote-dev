import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";

import eng2cht from '../../utils/eng2cht';
import getData from '../../data/getData';
const {parties} = getData();

/* 政黨圓形黨徽，名稱 */
/* 第八屆有席次的政黨，第九屆有不分區的政黨，才有連結；僅有區域候選人的沒有連結 */

export default class PartyFlag extends Component {
  render () {
    const styles = require('./PartyFlag.scss');
    const {partyId} = this.props;
    
    let result;

    if(parties[partyId] && partyId !== "NONE"){
      result = (
        <Link to={`/parties/${partyId}/records/`} 
              className={`${styles.partyTitle} ${styles.ia} ${styles.black}`}>{eng2cht(partyId)}</Link>
      )
    }else{
      result = (
        <span className={`${styles.partyTitle} ${styles.ia} ${styles.black}`}>{eng2cht(partyId)}</span>
      )

    }
    
    return result;
  }
}
