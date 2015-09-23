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
    let ageInfo = <p className={`${styles.infoP} ${styles.engStart}`}>{`${age}歲，${gender}`}</p>;
    let legislationInfo = <p className={styles.infoP}>{`第8屆 ${constituency1} ${constituency2} 立委`}</p>;

 
    
    //處理黨團的資訊顯示方式
    if(name.indexOf("黨團")!== -1){
       ageInfo = "";
       legislationInfo = <p className={styles.infoP}>第8屆黨團</p>
    }

    let candidateInfo;
    if(isCandidate === true){
        candidateInfo = <p className={`${styles.infoP} ${styles.engStart}`}>{` 2016 ${candidateConstituency1} ${candidateConstituency2} 立委候選人`}</p>;
    }

   
  
    return (
        <div className={`$styles["inner-title"] ${styles["people-title"]} `}>
          <header>
          <div className={styles["people-basic-info"]}>
            <div className={styles["people-pic"]}>
                <PeoplePhoto id={id}/>
            </div>

            <Link to={`/people/${id}`}
                  className={styles.name}>{name}</Link>
            <div className={styles.party}>
              <div className={`${styles["party-flag-s"]} ${styles[party]} ${styles["party-flag"]}`}></div>
              <span>{partyCht}</span> 
            </div>
            <div className={styles["basic-txt"]}>
              {ageInfo}
              {legislationInfo}
              {candidateInfo}
            </div>

          </div>
         
          </header>
            
        </div>
    );

  }
}

