import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

@connect(
    state => ({candidates: state.candidates}),
    dispatch => bindActionCreators({}, dispatch))


export default class CandidateAvatar extends Component {
  static propTypes = {
    candidates: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  
  }
  
  render () {

    const styles = require('./CandidateAvatar.scss');

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
        <div className={styles.wrap}>
            <img className={`${styles.avatar}  is-${party}`}
                 src={imgURL} />
        </div>
    );

  }
}

