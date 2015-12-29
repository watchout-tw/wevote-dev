import React, { Component, PropTypes } from 'react';
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
import eng2cht from '../../utils/eng2cht';
import promise_eng2cht from '../../utils/promise_eng2cht';

import countLevel from '../../utils/countLevel';


import getData from '../../data/getData';
const {issues, records, partyPromises, legislators, dataMeta} = getData();

export default class PositionTable extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
      const {unit, districtCandidates} = props;
      
      //calculate positions
      let partyPositions = parseToPartyPosition(records, issues);
      let tableData = getPartiesTableData(partyPositions, partyPromises);

      this.state = {
          tableData: tableData,
          focus: "",
          filter: true
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
      current = "after";
      if(positionEndRect.top < 100  && focus === "position"){
        if(focus !== current){
            this.setState({
              focus: current
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
  _toggleFilter(){
    this.setState({
      filter: !this.state.filter
    })
  }
  render() {
    const styles = require('./PositionTable.scss');
    const {unit} = this.props;
    const {tableData, focus, filter} = this.state;

    let imgHub = {};
    imgHub.aye = require("./images/answers_aye.svg")
    imgHub.nay = require("./images/answers_nay.svg")
    imgHub.none = require("./images/answers_unknown.svg")
    imgHub.refuse = require("./images/answers_unknown.svg")


    let issueTitles = Object.keys(issues).map((issueId, i)=>{
        return <div key={`${issueId}-${i}`}
                    className={styles.issueTitle}>{issues[issueId].title}</div>
    })
    // 每一個政黨 (候選人部分已被移除)
    let unitPositions = tableData
    .filter((unitData, i)=>{
        if(filter===true){
            if(unitData.hasReply === true || 
              ["KMT","DPP","PFP","TSU","NSU"].indexOf(unitData.id) !== -1){
              return true;

            }else{
              return false;
            }
        
        }else{
            return true;
        }
    })
    .map((unitData, i)=>{
        //政黨名稱 or 候選人姓名
        let unitName = (
          <div className={styles.unitName}>
            <div className={styles.nameFlex}>
                <div className={styles.prefix}>
                  <div className={styles.number}>{unitData.number}</div>
                  <div className={`${styles.party} ${styles.partyFlag} ${styles.tiny} ${styles[unitData.party]}`}></div>
                </div>
                <div className={`${styles.unitTitle}`}>
                    <div className={styles.unitTitleText}>{unitData.name}</div>
                </div>
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
                  <div className={recordClasses}>
                    <div className={styles.recordDetail}>{handlePosCht(pos.record, unitData.id)}</div>
                    <div className={`${styles.recordSquare} ${styles[pos.record]} ${styles[level]}`}></div>
                  </div>
                  <div className={styles.promise}>
                    <div className={styles.promiseDetail}>{handlePromiseCht(pos.promise)}</div>
                    <img className={styles.promiseImg} src={`${imgHub[pos.promise]}`} />
                  </div>
              </div>
            )
        })
        
        let linkChoice = this._recordsOrPromises.bind(this, unitData.id).call();

        return <Link className={styles.unitEntry}
                     to={`/${unit}/${unitData.id}/${linkChoice}/`}>{unitName}{positions}</Link>
    });

    
    let legendRecord = require('./images/legend_record.svg');
    let legendPromise = require('./images/legend_promise.svg');

    //title class, 處理 scroll fixed on top
    let fixedClasses = classnames({
      [styles.titleWrap]: true,
      [styles.fixed]: focus === "position",
      [styles.after]: focus === "after"
    })

   
    return (
    
      <div className={styles.wrap}>
        <header><h2>議題表態</h2></header>
        <div className={styles.metaInfo}>
            <div>{dataMeta[`${unit}-position`]}</div>
            <div className={styles.legend}>
              <img src={legendRecord}/>
              <img src={legendPromise}/>
            </div>

            <div className={styles.toggleSet}>
              <div className={`${styles.toggle} ${(filter === true)? styles.active : ""}`}
                   onClick={this._toggleFilter.bind(this)}>只顯示有立場表態的政黨</div>
              <div className={`${styles.toggle} ${(filter === false)? styles.active : ""}`}
                   onClick={this._toggleFilter.bind(this)}>顯示所有政黨</div>
            </div>
          </div>
        <div className={styles.positionTable} id="positionTitle">
            <div className={fixedClasses}>
                <div className={styles.issueTitles}>
                    <div className={styles.unitName}>編號／政黨名稱</div>
                    {issueTitles}
                </div>
            </div>
            {unitPositions}
        </div>
        <div id="positionEnd"></div>
      </div>
      
    );
  }
}
function handlePosCht (value, id) {
  if(!value){
    if(id==="MKT"){
      return "根據第八屆立院資料統計，沒有針對此議題表態";
    }else{
      return "該黨在第八屆沒有席次"
    }
  }else{
    if(value==="none"){
      return "根據第八屆立院資料統計，沒有針對此議題表態"
    }else{
      return `根據第八屆立院資料統計，立場為${eng2cht(value)}`;
    }
  }
}
function handlePromiseCht (value){
  switch(value){
    case 'refuse':
      return '不表態';
    case 'none':
      return '未回覆';
    case 'aye':
      return '支持';

    default: 
      return eng2cht(value);
  }
}
