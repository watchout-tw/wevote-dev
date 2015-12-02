import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import eng2url from '../../utils/eng2url';

@connect(
    state => ({ partyBlock: state.partyBlock }),
    dispatch => bindActionCreators({}, dispatch))
export default class PartyBuns extends Component {
  
  render() {
    const styles = require('./PartyBuns.scss');
    const {partyBlock, category} = this.props;
    /* category: records, promises, list */

    let bunItems = Object.keys(partyBlock).map((partyId, i)=>{
        let party = partyBlock[partyId];
        return (
            <Link to={`/parties/${partyId}/${category}/`}
                  className={styles.bunLink}
                  key={`pary-bun-${i}`}>
                <div className={styles.bunItem}>
                    <Link to={`/parties/${partyId}/${category}/`}>
                        <div className={`${styles.partyFlag} ${styles.small} ${styles[partyId]}`}></div>
                    </Link>
                    <div className={styles.partyName}>
                        <Link className={`${styles.ia} ${styles.black} ${styles.small}`} 
                              to={`/parties/${partyId}/${category}/`}>{party.title}</Link>
                    </div>
                </div>
            </Link>
        )

    })
    return (
        <div className={styles.wrap}>
           {bunItems}
        </div>
    );
  }
}
