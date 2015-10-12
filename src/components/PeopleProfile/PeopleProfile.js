import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

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


    //處理選區顯示方式
    if(constituency2 === "N/A"){
        constituency2 = "";

    }else{
        constituency2 =  `第${constituency2}選區`;
    }

    if(candidateConstituency2 === "N/A"){
        candidateConstituency2 = "";

    }else{
        candidateConstituency2 = `第${candidateConstituency2}選區`;

    }
    let ageInfo = <p>{`${age}歲`}</p>;
    let legislationInfo = <p>{`第八屆${constituency1}${constituency2}立委`}</p>;



    //處理黨團的資訊顯示方式
    if(name.indexOf("黨團")!== -1){
       ageInfo = "";
       legislationInfo = <p>第八屆黨團</p>
    }

    let candidateInfo;
    if(isCandidate === true){
        candidateInfo = <p>{`2016第九屆${candidateConstituency1}${candidateConstituency2}立委候選人`}</p>;
    }

    return (
      <div className={styles.wrap}>
        <header>
          <div className={styles.peopleProfile}>
            <div className={styles.avatar}><PeoplePhoto id={id}/></div>
            <div className={styles.peopleInfo}>
              <div className={styles.peopleName}>
                <Link to={`/people/${id}/records/`} className={`${styles.name} ${styles.ia} ${styles.black} ${styles.big}`}>{name}</Link>
                <div className={styles.party}>
                  <div className={`${styles.partyFlag} ${styles.small} ${styles[party]}`}></div>
                  <span className={styles.partyTitle}>{partyCht}</span>
                </div>
              </div>
              <div className={styles.peopleDetail}>
                {ageInfo}
                {legislationInfo}
                {candidateInfo}
              </div>
            </div>
          </div>
        </header>
      </div>
    );

  }
}
