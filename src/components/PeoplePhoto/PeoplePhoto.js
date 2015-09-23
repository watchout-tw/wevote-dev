import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';
import eng2party_short from '../../utils/eng2party_short';

@connect(
    state => ({legislators: state.legislators}),
    dispatch => bindActionCreators({}, dispatch))


export default class PeoplePhoto extends Component {
  static propTypes = {
    legislators: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  
  }
  
  render () {

    const styles = require('./PeoplePhoto.scss');
    const {legislators, id} = this.props;
    const legislator = legislators[id];
   
    let {name, party} = legislator;
    let imgURL;

    try {
      imgURL = require("./images/avatar/"+name+".png");
    }catch(e){
      console.log(e);
      imgURL = require("./images/default.jpg");
    }
   
    return (
        <Link to={`/people/${id}`} className={styles["people-pic"]}>
            <img className={`${styles.avatar}  is-${party}`}
                 src={imgURL}
                 alt={`${name}-${eng2party_short(party)}立委${name}`} />
        </Link>
          
    );

  }
}

