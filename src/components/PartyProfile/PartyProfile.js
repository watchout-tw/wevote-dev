import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";

import circleNumber from '../../utils/circleNumber';

import getData from '../../data/getData';
const {parties} = getData();

export default class Profile extends Component {
  render () {
    const styles = require('./PartyProfile.scss');
    const {id} = this.props;
    const party = parties[id];

    let {name, seats} = party;
    let candidateInfo;
    if(id!=="NONE"){
      candidateInfo = (
          <p>2016第九屆不分區{circleNumber(party.number)}候選政黨</p>
      )
    }

    return (
        <div className={`${styles.wrap} ${styles.partyTitle}`}>
          <header>
            <Link to={`/parties/${id}/records/`}>
              <div className={`${styles.partyFlag} ${styles.large} ${styles[id]}`}></div>
            </Link>
            <h1><Link className={`${styles.ia} ${styles.black} ${styles.big}`} to={`/parties/${id}/records/`}>{name}</Link></h1>
            <div className={styles.detail}>
              {candidateInfo}
              <p className={styles.legislatorInfo}>第八屆立委席次</p>
              <p>{seats}/112</p>
            </div>
          </header>
        </div>
    );

  }
}
