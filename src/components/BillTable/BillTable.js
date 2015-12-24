import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getPartiesTableData from '../../utils/getPartiesTableData';

import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import getPeopleTableData from '../../utils/getPeopleTableData';

import eng2url from '../../utils/eng2url';

import {loadRecords} from '../../ducks/records.js';

@connect(
    state => ({
      records: state.records.data,
      issues: state.issues,
      partyPromises: state.partyPromises,
      legislators: state.legislators,
      dataMeta: state.dataMeta
    }),
    dispatch => bindActionCreators({loadRecords}, dispatch))

export default class BillTable extends Component {
  constructor(props){ super(props)
      this.state = {
        tableData: "",
        focus: "",
        recordsLoaded: false
      }
  }
  componentWillMount(){
    this.props.loadRecords();
  }
  componentWillReceiveProps(nextProps){

    if(nextProps.records){
      //calculate party positions
      const {issues, legislators, partyPromises, districtCandidates, unit} = this.props;
      let tableData;
      
      if(unit === "parties"){
          let partyPositions = parseToPartyPosition(nextProps.records.value, issues);
          tableData = getPartiesTableData(partyPositions, partyPromises);
      
      }else{//unit === "people", not used currently.
          let legislatorPositions = parseToLegislatorPosition(nextProps.records.value, issues, legislators);
          tableData = getPeopleTableData(legislatorPositions, districtCandidates);
      }

      this.setState({
          recordsLoaded: true,
          tableData: tableData    
      })
    }
  }
  _onScroll(){
      const {focus} = this.state;

      let billNode = document.getElementById("billTitle");
      if(!billNode) return;
      
      let billRect = billNode.getBoundingClientRect();

      let billEndNode = document.getElementById("billEnd");
      let billEndRect = billEndNode.getBoundingClientRect();

      //decide which to fixed on top
      let current;
      if(billRect.top < 0 && billEndRect.top > 100){
        current = "bill";
      }
   
      //console.log(billRect.top + "," + billEndRect.top + "," + current)

      if(current){ 
          if(focus !== current){
              this.setState({
                focus: current
              })
          }
      }
      if(billRect.top > 0 && focus === "bill"){
          if(focus !== current){
              this.setState({
                focus: ""
              })
          }
      }
      if(billEndRect.top < 50 && focus === "bill"){
          this.setState({
              focus: "after"
          })  
      }

  }
  componentDidMount(){
      window.addEventListener("scroll", this._onScroll.bind(this));
  }
  componentWillUnmount(){
     window.removeEventListener("scroll", this._onScroll.bind(this));
  }
  render() {
    const {recordsLoaded} = this.state;
    if(!recordsLoaded) return <div style={{textAlign: 'center'}}>Loading...</div>

    const styles = require('./BillTable.scss');
    const {issues, dataMeta,
           showTitle, outerLink, unit} = this.props;
    
    const {tableData, focus} = this.state;
    let noReplyImg = require('./images/answers_unknown.svg');
    let externalIconImg = require('../../images/icon_external_link_gray.svg');
    
    let outerLinkItem = (outerLink) ? <img src={externalIconImg} 
                                           className={styles.exLink}/> : "";


    let unitBills = Object.keys(tableData).map((unitId, i)=>{
        let unitData = tableData[unitId];
        let party = unitData.party;
        
        //政黨名稱 or 候選人名稱
        let unitName = (
            <div className={styles.unitName}>
                <div className={styles.nameFlex}>
                    <div className={`${styles.party} ${styles.partyFlag} ${styles.tiny} ${styles[unitData.id]}`}></div>
                    <div className={`${styles.unitTitle}`}>
                        <div className={styles.unitTitleText}>{unitData.name}</div>{outerLinkItem}
                    </div>
                </div>
            </div>
        );

        //優先推動

        let bills = unitData.bills.map((item, k)=>{
            let goalItem;
            if(item.goal){
              let text = item.goal.length > 6 ? `${item.goal.substring(0,6)}⋯` : item.goal;
              goalItem = <div className={styles.bill}>{text}</div>

            }else{
              goalItem = (
                <div className={`${styles.bill} ${styles.noReply}`}>
                    <img className={styles.noReplyImg}
                         src={noReplyImg} />
                </div>)
            }
            return goalItem;
        })

        //決定要另開新視窗或是直接連結
        

        if(outerLink){
            return (
                <a href={`/${unit}/${unitData.id}/promises/`}
                   className={styles.unitEntry}
                   target="_blank">
                     {unitName}{bills}
                </a>
            )

        }else{
            return (
                <Link to={`/${unit}/${unitData.id}/promises/`}
                      className={styles.unitEntry}>
                     {unitName}{bills}
                </Link>
            )
        }

    });

    let title = (showTitle === true) ? (
      <header><h2>優先推動法案</h2></header>
    ) : "";
    //title class, 處理 scroll fixed on top
    let fixedClasses = classnames({
      [styles.billTitleWrap]: true,
      [styles.fixed]: focus === "bill",
      [styles.after]: focus === "after"
    })
    return (
      <div className={styles.wrap}>
          {title}
          <div className={styles.billTable} id="billTitle">
              <div className={fixedClasses}>
                  <div className={styles.billTitles}>
                      <div className={styles.unitName}></div>
                      <div className={styles.billTitle}>法案一</div>
                      <div className={styles.billTitle}>法案二</div>
                      <div className={styles.billTitle}>法案三</div>
                  </div>
              </div>
              {unitBills}
              <div className={styles.billMeta}>{dataMeta[unit]}</div>
              <div id="billEnd"></div>
          </div>
      </div>
    );
  }
}
