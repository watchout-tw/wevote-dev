import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

@connect(
    state => ({ 
      legislators: state.legislators
    }),
    dispatch => bindActionCreators({}, dispatch))

export default class PeopleeAvatar extends Component {
  render () {
    const styles = require('./PeopleAvatar.scss');
    const {legislators, candidates, id} = this.props;//// 目前沒有 candidates 會用到 PeopleAvatar
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

