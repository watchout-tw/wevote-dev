import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import eng2party_short from '../../utils/eng2party_short'
import classnames from 'classnames';

export default class PKer extends Component {
  render() {
    const styles = require('./PKer.scss');
    const {id, active} = this.props;
    
    let innerClasses = classnames({
      [styles.innerHexagon]: true,
      [styles.active]: active === true
    })
    let nameClasses = classnames({
      [styles.name]: true,
      [styles.active]: active === true
    })
    return (
        <div className={styles.hexagon}>
            <div className={innerClasses}>
                <div className={`${styles.party} ${styles.partyFlag} ${styles.tiny} ${styles[id]}`}></div>
            </div>
            <div className={nameClasses}>{eng2party_short(id)}</div>
        </div>
    );
  }
}

