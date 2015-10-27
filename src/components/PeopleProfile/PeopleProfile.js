import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import cht2eng from '../../utils/cht2eng';
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

    let {name, parties, gender, age, constituency1, constituency2,
         isCandidate, candidateConstituency1, candidateConstituency2, hasResigned} = legislator;

    let info = peopleInfo(name, age, constituency1, constituency2, isCandidate, candidateConstituency1, candidateConstituency2);
    let partiesItem = parties.map((p,index)=>{
        let partyEng = cht2eng(p.partyCht);
        return (
          <div key={index}>
              <div className={styles.partyEng}>
                <div className={`${styles.partyFlag} ${styles.small} ${styles[partyEng]}`}></div>
                <Link to={`/parties/${partyEng}/records/`} className={`${styles.partyTitle} ${styles.ia} ${styles.black}`}>{p.partyCht}</Link>
              </div>
              <div className={styles.partyPeriod}>{`（${p.startDate}-${p.endDate}）`}</div>
          </div>
        )
    })
    let hasResignedText = (hasResigned===true) ? "已離職" : "";
    //<p>{info.candidateTitle}</p>
    
    return (
      <div className={styles.wrap}>
        <header>
          <div className={styles.peopleProfile}>
            <div className={styles.avatar}><PeoplePhoto id={id}/></div>
            <div className={styles.peopleInfo}>
              <div className={styles.peopleName}>
                <Link to={`/people/${id}/records/`} className={`${styles.name} ${styles.ia} ${styles.black} ${styles.big}`}>{name}</Link>
               
              </div>
              <div className={styles.peopleDetail}>
                <p>{info.ageText}</p>
                <p>{info.legislatorTitle}</p>
                <div>{partiesItem}</div>
                <p>{hasResignedText}</p>
                
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
