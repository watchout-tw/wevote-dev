import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

@connect(
    state => ({candidates: state.candidates}),
    dispatch => bindActionCreators({}, dispatch))


export default class Profile extends Component {
  static propTypes = {
    candidates: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  
  }
  
  render () {

    const styles = require('./CandidateProfile.scss');

    const {candidates, id} = this.props;
    const candidate = candidates[id];
   
    let {name, party} = candidate;
    
    let imgURL;

    try {
      imgURL = require("./images/avatar/"+name+".png");
    }catch(e){
      imgURL = require("./images/default.jpg");
    }
  
        

    return (
        <div className={`$styles["inner-title"] ${styles["people-ititle"]} `}>
          <header>
          <div className={styles["people-basic-info"]}>
            <div className={styles["people-pic"]}>
                <img className={`${styles.avatar}  is-${party}`}
                     src={imgURL} />

            </div>

            <h1>{name}</h1>
            <div className={styles.party}>
              <div className={`${styles["party-flag-s"]} ${styles.kmt} ${styles["party-flag"]}`}></div>
              <span>中國國民黨</span> 
            </div>
            <div className={styles["basic-txt"]}>
              <p>30歲，男</p>
              <p>第8屆 不分區 / 台北第一選區 立委</p>
              <p>2016 台北第一選區  立委候選人</p>
            </div>

          </div>
         
          </header>
            
        </div>
    );

  }
}

