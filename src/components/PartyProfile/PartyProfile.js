import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

@connect(
    state => ({parties: state.parties}),
    dispatch => bindActionCreators({}, dispatch))


export default class Profile extends Component {
  static propTypes = {
    parties: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  
  }
  
  render () {

    const styles = require('./PartyProfile.scss');

    const {parties, id} = this.props;
    const party = parties[id];
   
    let {name, seats} = party;
   
  
    return (
        <div className={`$styles["inner-title"] ${styles["party-title"]} `}>
          <header>
        
            <h1>{name}</h1>
            <Link to={`/parties/${id}/records/`}>
                <div className={` ${styles["party-flag"]} ${styles[id]} `}></div>
            </Link>
            <p>第八屆中華民國立法委員席次</p>
            <p>{seats}/112</p>

          </header>
            
        </div>
    );

  }
}

