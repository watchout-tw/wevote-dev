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
  _goLink(url, link){
    window.location = url;
  }
  render() {
    const styles = require('./PartyBuns.scss');
    let {partyBlock, category} = this.props;
    /* category: records, promises, list */
    
    let bunItems = Object.keys(partyBlock).map((partyId, i)=>{
        let party = partyBlock[partyId];
        return (
            <Link className={styles.bunItem}
                  key={`partybun-${category}-${partyId}-${i}`}
                  to={`/parties/${partyId}/${category}/`}>
                <div className={`${styles.partyFlag} ${styles.small} ${styles[partyId]}`}></div>
                <div className={styles.partyNameWrap}>
                    <div className={styles.partyName}>
                        {party.title}
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
