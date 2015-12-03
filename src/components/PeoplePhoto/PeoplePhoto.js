import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';
import eng2party_short from '../../utils/eng2party_short';
import cht2eng from '../../utils/cht2eng';

@connect(
    state => ({
      legislators: state.legislators,
      candidates: state.candidates

    }),
    dispatch => bindActionCreators({}, dispatch))


export default class PeoplePhoto extends Component {
  static propTypes = {
    legislators: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired

  }

  render () {

    const styles = require('./PeoplePhoto.scss');
    const {legislators, candidates, id} = this.props;
    let people = legislators[id];//candidate 之後再處理
   
    let {name} = people;
    let partyIndex = people.parties.length - 1;//選取最新的政黨
    let party = cht2eng(people.parties[partyIndex].partyCht);
    let imgURL;

    try {
      imgURL = require("./images/avatar/"+name+".png");
    }catch(e){
      console.log(e);
      imgURL = require("./images/default.png");
    }

    return (
        <div className={styles.peoplePhoto}>
            <img className={`is-${party}`}
                 src={imgURL}
                 alt={`${name}-${eng2party_short(party)}立委${name}`} />
        </div>

    );

  }
}
