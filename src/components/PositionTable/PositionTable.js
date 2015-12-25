import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import DocumentMeta from 'react-document-meta';

import BillTable from '../../components/BillTable/BillTable';
import Social from '../../components/Social/Social.js';

import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getPartiesTableData from '../../utils/getPartiesTableData';

import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import getPeopleTableData from '../../utils/getPeopleTableData';


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
      partyPromises: state.partyPromises,
      legislators: state.legislators
    }),
    dispatch => bindActionCreators({}, dispatch))

export default class PositionTable extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
      const {records, issues, partyPromises, legislators} = props;
      const {unit, districtCandidates} = props;
      
      //calculate positions
      let tableData;
      if(unit === "parties"){
          let partyPositions = parseToPartyPosition(records, issues);
          tableData = getPartiesTableData(partyPositions, partyPromises);

      }else{//people, this might not be needed after...
          let legislatorPositions = parseToLegislatorPosition(records, issues, legislators);
          tableData = getPeopleTableData(legislatorPositions, districtCandidates);

      }
      this.state = {
          tableData: tableData,
          focus: ""
      }

  }
  _onScroll(){
      let positionNode = document.getElementById("positionTitle");
      if(!positionNode) return;
      let positionRect = positionNode.getBoundingClientRect();

      let positionEndNode = document.getElementById("positionEnd");
      let positionEndRect = positionEndNode.getBoundingClientRect();

      //decide which to fixed on top
      let current;
      if(positionRect.top < 0 && positionEndRect.top > 100){
        current = "position";
      }

      const {focus} = this.state;

      //console.log(positionRect.top + "," + positionEndRect.top);

      if(current){
        if(focus !== current){
            this.setState({
              focus: current
            })
        }
      }
      if(positionRect.top > 0 && focus === "position"){
        if(focus !== current){
            this.setState({
              focus: ""
            })
        }
      }
  }
  componentDidMount(){
      window.addEventListener("scroll", this._onScroll.bind(this));
  }
  componentWillUnmount(){
     window.removeEventListener("scroll", this._onScroll.bind(this));
  }
  _recordsOrPromises(unitId){
      const {legislators} = this.props;
      const {unit} = this.props;

      if(unit === "parties"){
          let hasRecords = ["KMT","DPP","PFP","TSU","NSU"];
          if(hasRecords.indexOf(unitId)!==-1){
            return "records";
          }else{
            return "promises";
          }
      }else{
          if(legislators[unitId]){
            return "records";
          }else{
            return "promises";
          }
      }
  }
  render() {
    const styles = require('./PositionTable.scss');
    const {issues, unit} = this.props;
    const {tableData, focus} = this.state;

    let imgHub = {};
    imgHub.aye = require("./images/answers_aye.svg")
    imgHub.nay = require("./images/answers_nay.svg")
    imgHub.none = require("./images/answers_unknown.svg")


    let issueTitles = Object.keys(issues).map((issueId, i)=>{
        return <div key={`${issueId}-${i}`}
                    className={styles.issueTitle}>{issues[issueId].title}</div>
    })
    // 每一個政黨 or 候選人
    let unitPositions = Object.keys(tableData).map((unitId, i)=>{
        let unitData = tableData[unitId];
        //政黨名稱 or 候選人姓名
        let unitName = (
          <div className={styles.unitName}>
            <div className={styles.nameFlex}>
                <div className={`${styles.party} ${styles.partyFlag} ${styles.tiny} ${styles[unitData.party]}`}></div>
                <div className={`${styles.unitTitle}`}>{unitData.name}</div>
            </div>
          </div>
          );

        //表態
        let positions = Object.keys(unitData.positions).map((issueName, j)=>{
            let pos = unitData.positions[issueName];
            let level = countLevel(pos.recordCount);
            let recordClasses = classnames({
              [styles.record] : true,
              [styles.empty] : level==="empty"
            })

            return (
              <div className={styles.position}>
                  <div className={recordClasses}><div className={`${styles.recordSquare} ${styles[pos.record]} ${styles[level]}`}></div></div>
                  <img className={styles.promise}
                       src={`${imgHub[pos.promise]}`} />
              </div>
            )
        })
        
        let linkChoice = this._recordsOrPromises.bind(this, unitData.id).call();

        return <Link className={styles.unitEntry}
                     to={`/${unit}/${unitData.id}/${linkChoice}/`}>{unitName}{positions}</Link>
    });

    let legendImg = require("./images/legend.png");
    let legendRecord = require('./images/legend_record.svg');
    let legendPromise = require('./images/legend_promise.svg');

    //title class, 處理 scroll fixed on top
    let fixedClasses = classnames({
      [styles.titleWrap]: true,
      [styles.fixed]: focus === "position"
    })

   
    return (
    
      <div className={styles.wrap}>
        <header><h2>議題表態</h2></header>
        <div className={styles.positionTable} id="positionTitle">
            <div className={fixedClasses}>
                <div className={styles.issueTitles}>
                    <div className={styles.unitName}></div>
                    {issueTitles}
                </div>
            </div>
            {unitPositions}
        </div>
        <div id="positionEnd"></div>
        <div className={styles.legend}>
          <img src={legendRecord}/>
          <img src={legendPromise}/>
        </div>
      </div>
      
    );
  }
}
