import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

@connect(
    state => ({candidates: state.candidates}),
    dispatch => bindActionCreators({}, dispatch))


export default class CandidateAvatar extends Component {
  render () {

    const styles = require('./CandidateAvatar.scss');

    const {candidates, id} = this.props;
    const candidate = candidates[id];
    //console.log(candidates);

    let {name, party} = candidate;
    
    let imgURL;

    try {
      imgURL = require("./images/avatar/"+name+".png");
    }catch(e){
      imgURL = require("./images/default.jpg");
    }
  
    return (
        <Link to={`/candidates/${id}`} className={styles.wrap}>
            <img className={`${styles.wrap}  is-${party}`}
                 src={imgURL} />
            <div className={styles.name}>{name}</div>
        </Link>
    );

  }
}

