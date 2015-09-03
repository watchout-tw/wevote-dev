import React, {Component, PropTypes} from 'react';
import LegislatorAvatar from '../LegislatorAvatar/LegislatorAvatar.js';

const postion_eng_to_cht = {
    "for" : "贊成",
    "against" : "反對",
    "unknown" : "應表態未表態",
    "none" : "無資料"
};

export default class PositionGroup extends Component {
  // static propTypes = {
  //   // count: PropTypes.number,
  //   // increment: PropTypes.func.isRequired,
  //   // className: PropTypes.string
  // }

  render() {
    const styles = require('./PositionGroup.scss');
    const {data} = this.props;

    let legislators = data.id.map((value, index)=>{
       return <LegislatorAvatar id={value} key={index}/>
    });
    return (
      <div className={styles.wrap}>
          <h3>{postion_eng_to_cht[data.position]}</h3>
          {legislators}
      </div>
    );
  }

  props = {
    className: ''
  }
}

