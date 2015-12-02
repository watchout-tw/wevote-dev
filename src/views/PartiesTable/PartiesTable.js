import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import PartyBills from '../../components/PartyBills/PartyBills';

import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getPartiesTableData from '../../utils/getPartiesTableData';
import eng2url from '../../utils/eng2url';

function countLevel(count){
  let num = Number(count);
  if(num >= 0 && num <= 5){
     return 'level1';

  }else if(num > 5 && num <= 25){
     return 'level2';

  }else if(num > 25){
     return 'level3';

  }else {
     return 'empty';
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
        return <div key={`${issueId}-${i}`}
                    className={styles.issueTitle}>{issues[issueId].title}</div>
    })
    // 每一個政黨
    let partyPositions = Object.keys(tableData).map((partyId, i)=>{
        let party = tableData[partyId];
        //政黨名稱
        let partyName = <div className={styles.partyName}>
                          <Link className={`${styles.partyTitle} ${styles.ia} ${styles.bright}`} 
                                to={`/parties/${party.id}/records/`}>{party.name}</Link>
                        </div>;

        //表態
        let positions = Object.keys(party.positions).map((issueName, j)=>{
            let pos = party.positions[issueName];
            let level = countLevel(pos.recordCount);
            let recordClasses = classnames({
              [styles.record] : true,
              [styles.empty] : level==="empty"
            })

            return (
              <div className={styles.position}>
                  <div className={recordClasses}>
                      <Link className={`${styles.recordSquare} ${styles[pos.record]} ${styles[level]}`}
                            to={`/parties/${party.id}/records/${eng2url(issueName)}`}></Link>
                  </div>
                  <img className={styles.promise} 
                       src={`${imgHub[pos.promise]}`} />
              </div>
            )
        })
       
        return <div className={styles.partyEntry}>{partyName}{positions}</div>
    });
   
    let legendImg = require("./images/legend.png");

    return (
      <div className={styles.wrap}>
          <div className={styles.partyPosition}>
            <header><h2>議題表態</h2></header>
            <div className={styles.partyPositionTable}>
                <div className={styles.issueTitles}>
                    <div className={styles.partyName}></div>
                    {issueTitles}
                </div>
                {partyPositions}
            </div>
            <img src={legendImg} className={styles.legend}/>
          </div>

          <PartyBills showTitle={true}/>

          <div className={styles.goMatchSec}>
              <div className={styles.birdTalk}>想要看看哪個政黨屬性跟你最接近嗎？</div>
              <Link to={`/parties-matchgame/`}
                    className={styles.goMatch}>進入攻城戰</Link>
          </div>
      </div>
    );
  }
}