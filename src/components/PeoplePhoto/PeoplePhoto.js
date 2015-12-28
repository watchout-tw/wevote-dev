import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import eng2party_short from '../../utils/eng2party_short';
import cht2eng from '../../utils/cht2eng';

import getData from '../../data/getData';
const {legislators, candidates, people} = getData();

export default class PeoplePhoto extends Component {
  render () {

    const styles = require('./PeoplePhoto.scss');
    const {id} = this.props;
    let currentPeople = people[id];
    let {name} = currentPeople;

    //party: 如果是候選人，優先選擇參選代表政黨
    let party;
    if(candidates[id]){
        party = candidates[id].party;
    }else{
        // 否則選擇目前在立法院代表的政黨
        let legislatorData = legislators[id];
        let partyIndex = legislatorData.parties.length - 1;//選取最新的政黨
        party = cht2eng(legislatorData.parties[partyIndex].partyCht);
    }

    let imgURL;

    try {
      imgURL = require("./images/avatar/"+name+".jpg");
    }catch(e){
      imgURL = require("./images/default.png");
    }

    //如果不是現任立委，要加上「參選人」
    let candidateOnly = "";
    if(!legislators[id]){
      candidateOnly = "參選人";
    }

    return (
        <div className={styles.peoplePhoto}>
            <img className={`is-${party}`}
                 src={imgURL}
                 alt={`${name}-${eng2party_short(party)}立委${candidateOnly}${name}`} />
        </div>

    );

  }
}
