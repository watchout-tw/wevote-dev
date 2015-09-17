import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

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
    
    if(constituency2 === "N/A")
        constituency2 = "";
    else
        constituency2 =  `第${constituency2}選區`;

    if(candidateConstituency2 === "N/A")
        candidateConstituency2 = "";
    else
        candidateConstituency2 = `第${candidateConstituency2}選區`;

    let candidateInfo;
    if(isCandidate === true){
      candidateInfo = <p>{` 2016 ${candidateConstituency1} ${candidateConstituency2} 立委候選人`}</p>;
    }

    let imgURL;

    try {
      imgURL = require("./images/avatar/"+name+".png");
    }catch(e){
      imgURL = require("./images/default.jpg");
    }
  
    return (
        <div className={`$styles["inner-title"] ${styles["people-title"]} `}>
          <header>
          <div className={styles["people-basic-info"]}>
            <Link to={`/people/${id}`} className={styles["people-pic"]}>
                <img className={`${styles.avatar}  is-${party}`}
                     src={imgURL} />

            </Link>

            <h1>{name}</h1>
            <div className={styles.party}>
              <div className={`${styles["party-flag-s"]} ${styles[party]} ${styles["party-flag"]}`}></div>
              <span>{partyCht}</span> 
            </div>
            <div className={styles["basic-txt"]}>
              <p>{`  ${age}歲，${gender}`}</p>
              <p>{`第8屆 ${constituency1} ${constituency2} 立委`}</p>
              {candidateInfo}
            </div>

          </div>
         
          </header>
            
        </div>
    );

  }
}

