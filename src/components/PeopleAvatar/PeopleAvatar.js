import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

@connect(
    state => ({legislators: state.legislators}),
    dispatch => bindActionCreators({}, dispatch))


export default class PeopleeAvatar extends Component {
  static propTypes = {
    legislators: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  
  }
  
  render () {

    const styles = require('./PeopleAvatar.scss');

    const {legislators, id} = this.props;
    const legislator = legislators[id];
   
    let {name, party} = legislator;
    
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

