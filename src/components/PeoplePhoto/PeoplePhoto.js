import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';
import eng2party_short from '../../utils/eng2party_short';

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
    let people;
    if(candidates[id]){
      people = candidates[id];//////這裡要再想想，目前所有的人是分散在兩個地方，這樣好不好
    }else{
      people = legislators[id];
    }

    if(!people.party)
      return <div></div>

    let {name, party} = people;
    let imgURL;

    try {
      imgURL = require("./images/avatar/"+name+".png");
    }catch(e){
      console.log(e);
      imgURL = require("./images/default.png");
    }

    return (
        <Link to={`/people/${id}/records/`} className={styles.peoplePhoto}>
            <img className={`is-${party}`}
                 src={imgURL}
                 alt={`${name}-${eng2party_short(party)}立委${name}`} />
        </Link>

    );

  }
}
