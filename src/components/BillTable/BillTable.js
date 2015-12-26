import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getPartiesTableData from '../../utils/getPartiesTableData';

import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import getPeopleTableData from '../../utils/getPeopleTableData';

import eng2url from '../../utils/eng2url';
import eng2cht from '../../utils/eng2cht';

import getData from '../../data/getData';
const {records, issues, legislators, partyPromises, dataMeta} = getData();

export default class BillTable extends Component {
  constructor(props){ super(props)
      //calculate party positions
      const {districtCandidates, unit} = props;
      let tableData;

      if(unit === "parties"){
        let partyPositions = parseToPartyPosition(records, issues);
        tableData = getPartiesTableData(partyPositions, partyPromises);
      
      }else{//unit === "people"
        let legislatorPositions = parseToLegislatorPosition(records, issues, legislators);
        tableData = getPeopleTableData(legislatorPositions, districtCandidates);
      }

      this.state = {
        tableData: tableData,
        focus: "",
        filter: true
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
  _toggleFilter(){
    this.setState({
      filter: !this.state.filter
    })
  }
  render() {
    const styles = require('./BillTable.scss');
    const {outerLink, unit} = this.props;
    
    const {tableData, focus, filter} = this.state;
   
    let noReplyImg = require('./images/answers_unknown.svg');
    let externalIconImg = require('../../images/icon_external_link_gray.svg');
    
    let outerLinkItem = (outerLink) ? <img src={externalIconImg} 
                                           className={styles.exLink}/> : "";

    let unitBills = tableData
    .filter((unitData, i)=>{
        if(filter===true){
            
            if(unitData.hasReply === true){
              return true;
            }else{
              return false;
            }
        
        }else{
            return true;
        }
    })
    .map((unitData, i)=>{

        let party = unitData.party;
        //政黨名稱 or 候選人名稱
        let unitName = (
            <div className={styles.unitName}>
                <div className={styles.nameFlex}>
                    <div className={styles.prefix}>
                        <div className={styles.number}>{unitData.number}</div>
                        <div className={`${styles.party} ${styles.partyFlag} ${styles.tiny} ${styles[unitData.id]}`}></div>
                    </div>
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
                    <div className={styles.billDetail}>未回覆</div>
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

    
    //title class, 處理 scroll fixed on top
    let fixedClasses = classnames({
      [styles.billTitleWrap]: true,
      [styles.fixed]: focus === "bill",
      [styles.after]: focus === "after"
    })

    return (
      <div className={styles.wrap}>
          <header><h2>優先推動法案</h2></header>
          <div className={styles.metaInfo}>
            <div>{dataMeta[`${unit}-bill`]}</div>
            <div className={styles.toggleSet}>
              <div className={`${styles.toggle} ${(filter === true)? styles.active : ""}`}
                   onClick={this._toggleFilter.bind(this)}>只顯示有回覆的政黨</div>
              <div className={`${styles.toggle} ${(filter === false)? styles.active : ""}`}
                   onClick={this._toggleFilter.bind(this)}>顯示所有政黨</div>
            </div>
          </div>
              
          <div className={styles.billTable} id="billTitle">
              <div className={fixedClasses}>
                  <div className={styles.billTitles}>
                      <div className={styles.unitName}>編號／政黨名稱</div>
                      <div className={styles.billTitle}>法案一</div>
                      <div className={styles.billTitle}>法案二</div>
                      <div className={styles.billTitle}>法案三</div>
                  </div>
              </div>
              {unitBills}
              <div id="billEnd"></div>
          </div>
      </div>
    );
  }
}
