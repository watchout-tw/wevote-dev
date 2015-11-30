import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getPartiesTableData from '../../utils/getPartiesTableData';
import eng2url from '../../utils/eng2url';

function countLevel(count){
  let num = Number(count);
  if(num >= 0 && num <= 5){
     return 'level1';

  }else if(num > 5 && num <= 25){
     return 'level2';

  }else{
     return 'level3';
  }
}
@connect(
    state => ({
      records: state.records,
      issues: state.issues,
      partyPromises: state.partyPromises
    }),
    dispatch => bindActionCreators({}, dispatch))

export default class PartiesTable extends Component {
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
    const styles = require('./PartiesTable.scss');
    const {issues} = this.props;
    const {tableData} = this.state;

    let imgHub = {};
    imgHub.aye = require("./images/promise-aye.png")
    imgHub.nay = require("./images/promise-nay.png")
    imgHub.none = require("./images/promise-none.png")


    let issueTitles = Object.keys(issues).map((issueId, i)=>{
        return <td key={`${issueId}-${i}`}
                   className={styles.positionTitle}>{issues[issueId].title}</td>
    })
    let partyPositions = Object.keys(tableData).map((partyId, i)=>{
        let party = tableData[partyId];
        //政黨名稱
        let partyName = <td className={styles.partyName}>
                        <Link className={`${styles.partyTitle} ${styles.ia} ${styles.bright}`} 
                              to={`/parties/${party.id}/records/`}>{party.name}</Link>
                        </td>;

        //表態
        let positions = Object.keys(party.positions).map((issueName, j)=>{
            let pos = party.positions[issueName];
            return (
              <td className={styles.position}>
                  <div className={styles.record}>
                      <Link className={`${styles.recordSquare} ${styles[pos.record]} ${styles[countLevel(pos.recordCount)]}`}
                            to={`/parties/${party.id}/records/${eng2url(issueName)}`}></Link>
                  </div>
                  <img className={styles.promise} src={`${imgHub[pos.promise]}`} />
              </td>
            )
        })
       
        return <tr>{partyName}{positions}</tr>
    });
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

    let legendImg = require("./images/legend.png");
    return (
      <div className={styles.wrap}>
          <table>
              <thead><tr><td></td><td colSpan="4" className={styles.head}>議題表態</td></tr></thead>
              <tr><td></td>{issueTitles}</tr>
              {partyPositions}
          </table>

          <table>
              <thead><tr><td></td><td colSpan="3" className={styles.head}>優先推動</td></tr></thead>
              <tr><td></td>
                  <td className={styles.positionTitle}>法案1</td>
                  <td className={styles.positionTitle}>法案2</td>
                  <td className={styles.positionTitle}>法案3</td></tr>
              {partyBills}
          </table>

          <img src={legendImg} className={styles.legend}/>
      </div>
    );
  }
}