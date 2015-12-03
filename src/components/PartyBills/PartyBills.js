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
        tableData: tableData,
        focus: ""
      }
  }
  _onScroll(){  
      const {focus} = this.state;

      let billNode = document.getElementById("billTitle");
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


  }
  componentDidMount(){
      window.addEventListener("scroll", this._onScroll.bind(this));
  }
  componentWillUnmount(){
     window.removeEventListener("scroll", this._onScroll.bind(this));
  }
  render() {
    const styles = require('./PartyBills.scss');
    const {issues, showTitle} = this.props;
    const {tableData, focus} = this.state;

    let partyBills = Object.keys(tableData).map((partyId, i)=>{
        let party = tableData[partyId];
        
        //政黨名稱
        let partyName = <div className={styles.partyName}>
                        <Link className={`${styles.partyTitle} ${styles.ia} ${styles.bright}`} 
                              to={`/parties/${party.id}/promises/`}>{party.name}</Link>
                        </div>;
        //優先推動

        let bills = party.bills.map((item, k)=>{
            let goalItem;
            if(item.goal){
              let text = item.goal.length > 6 ? `${item.goal.substring(0,6)}⋯` : item.goal;
              goalItem = <div className={styles.bill}>{text}</div>

            }else{
              goalItem = <div className={`${styles.bill} ${styles.noReply}`}>尚未回覆</div>
            }
            return goalItem;
        })
        return (
          <div className={styles.partyEntry}>
                  {partyName}{bills}
          </div>
        )
    });

    let title = (showTitle === true) ? (
      <header><h2>優先推動法案</h2></header>
    ) : "";
    //title class, 處理 scroll fixed on top
    let fixedClasses = classnames({
      [styles.billTitleWrap]: true,
      [styles.fixed]: focus === "bill"
    })
    return (
      <div className={styles.wrap}>
          {title}
          <div className={styles.partyBillTable} id="billTitle">
              <div className={fixedClasses}>
                  <div className={styles.billTitles}>
                      <div className={styles.partyName}></div>
                      <div className={styles.billTitle}>法案1</div>
                      <div className={styles.billTitle}>法案2</div>
                      <div className={styles.billTitle}>法案3</div>
                  </div>
              </div>

              {partyBills}

              <div id="billEnd"></div>
          </div>
      </div>
    );
  }
}