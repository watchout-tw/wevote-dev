import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import getCandidates from '../../data/getCandidates';
const candidates = getCandidates();

@connect(
    state => ({ 
      legislators: state.legislators
    }),
    dispatch => bindActionCreators({}, dispatch))
export default class PeopleeAvatar extends Component {
  static propTypes = {
    legislators: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }
  
  render () {

    const styles = require('./PeopleAvatar.scss');

    const {legislators, id} = this.props;
    let people = legislators[id] || candidates[id];
   
    if(!people){
      return <div>err</div>
    }


    let {name, party} = people;
    let imgURL;

    try {
      imgURL = require("./images/avatar/"+name+".png");
    }catch(e){
      imgURL = require("./images/default.png");
    }
  
    return (
        <div className={styles.wrap}>
            <img className={`${styles.avatar}  is-${party}`}
                 src={imgURL} />
        </div>
    );

  }
}

