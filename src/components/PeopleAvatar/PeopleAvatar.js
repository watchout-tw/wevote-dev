import React, { Component, PropTypes } from 'react';

import getData from '../../data/getData';
const {legislators, candidates} = getData();

export default class PeopleeAvatar extends Component {
  render () {
    const styles = require('./PeopleAvatar.scss');
    const {id} = this.props;
    
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

