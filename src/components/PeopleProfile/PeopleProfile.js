import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import peopleInfo from '../../utils/peopleInfo';
import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';
@connect(
    state => ({legislators: state.legislators}),
    dispatch => bindActionCreators({}, dispatch))


export default class PeopleProfile extends Component {
  static propTypes = {
    legislators: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }

  render () {
    const styles = require('./PeopleProfile.scss');

    const {legislators, id} = this.props;
    const legislator = legislators[id];

    let {name, party, partyCht, gender, age, constituency1, constituency2,
         isCandidate, candidateConstituency1, candidateConstituency2} = legislator;

    let info = peopleInfo(name, age, constituency1, constituency2, isCandidate, candidateConstituency1, candidateConstituency2);

    return (
      <div className={styles.wrap}>
        <header>
          <div className={styles.peopleProfile}>
            <div className={styles.avatar}><PeoplePhoto id={id}/></div>
            <div className={styles.peopleInfo}>
              <div className={styles.peopleName}>
                <Link to={`/people/${id}/records/`} className={`${styles.name} ${styles.ia} ${styles.black} ${styles.big}`}>{name}</Link>
                {info.isCaucus ? '' : (<div className={styles.party}>
                  <div className={`${styles.partyFlag} ${styles.small} ${styles[party]}`}></div>
                  <Link to={`/parties/${party}/records/`} className={`${styles.partyTitle} ${styles.ia} ${styles.black}`}>{partyCht}</Link>
                </div>)}
              </div>
              <div className={styles.peopleDetail}>
                <p>{info.ageText}</p>
                <p>{info.legislatorTitle}</p>
                <p>{info.candidateTitle}</p>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
