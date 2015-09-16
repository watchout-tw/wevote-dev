import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

@connect(
    state => ({candidates: state.candidates}),
    dispatch => bindActionCreators({}, dispatch))


export default class CandidatePhoto extends Component {
  static propTypes = {
    candidates: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  
  }
  
  render () {

    const styles = require('./CandidatePhoto.scss');
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
        <Link to={`/candidates/${id}`} className={styles["people-pic"]}>
            <img className={`${styles.avatar}  is-${party}`}
                 src={imgURL} />
        </Link>
          
    );

  }
}

