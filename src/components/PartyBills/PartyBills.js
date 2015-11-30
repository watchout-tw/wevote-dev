import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getPartiesTableData from '../../utils/getPartiesTableData';
import eng2url from '../../utils/eng2url';


@connect(
    state => ({
      records: state.records,
      issues: state.issues,
      partyPromises: state.partyPromises
    }),
    dispatch => bindActionCreators({}, dispatch))

export default class PartyBills extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
      //calculate party positions
      const {records, issues, partyPromises} = props;
      let partyPositions = parseToPartyPosition(records, issues);
      let tableData = getPartiesTableData(partyPositions, partyPromises);
      this.state = {
        tableData: tableData
      }
  }
  render() {
    const styles = require('./PartyBills.scss');
    const {issues} = this.props;
    const {tableData} = this.state;

    let partyBills = Object.keys(tableData).map((partyId, i)=>{
        let party = tableData[partyId];
        //政黨名稱
        let partyName = <td className={styles.partyName}>
                        <Link className={`${styles.partyTitle} ${styles.ia} ${styles.bright}`} 
                              to={`/parties/${party.id}/records/`}>{party.name}</Link>
                        </td>;
        //優先推動
        let bills = party.bills.map((item, k)=>{
            return <td className={styles.bill}>{item.goal.length > 6 ? `${item.goal.substring(0,6)}⋯` : item.goal }</td>
        })
        return <tr>{partyName}{bills}</tr>
    });

   
    return (
      <div className={styles.wrap}>
          <table>
              <thead><tr><td></td><td colSpan="3" className={styles.head}>優先推動</td></tr></thead>
              <tr><td></td>
                  <td className={styles.billTitle}>法案1</td>
                  <td className={styles.billTitle}>法案2</td>
                  <td className={styles.billTitle}>法案3</td></tr>
              {partyBills}
          </table>
      </div>
    );
  }
}