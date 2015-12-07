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
    const {outerLink} = this.props;

    let noReplyImg = require('./images/answers_unknown.svg');
    let externalIconImg = require('../../images/icon_external_link_gray.svg');
    
    let outerLinkItem = (outerLink) ? <img src={externalIconImg} 
                                           className={styles.exLink}/> : "";


    let partyBills = Object.keys(tableData).map((partyId, i)=>{
        let party = tableData[partyId];

        //政黨名稱
        let partyName = (
            <div className={styles.partyName}>
                <div className={styles.nameFlex}>
                    <div className={`${styles.party} ${styles.partyFlag} ${styles.tiny} ${styles[party.id]}`}></div>
                    <div className={`${styles.partyTitle}`}>
                        <div className={styles.partyTitleText}>{party.name}</div>{outerLinkItem}
                    </div>
                </div>
            </div>
        );

        //優先推動

        let bills = party.bills.map((item, k)=>{
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
                <a href={`/parties/${party.id}/promises/`}
                   className={styles.partyEntry}
                   target="_blank">
                     {partyName}{bills}
                </a>
            )

        }else{
            return (
                <Link to={`/parties/${party.id}/promises/`}
                      className={styles.partyEntry}>
                     {partyName}{bills}
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
      [styles.fixed]: focus === "bill"
    })
    return (
      <div className={styles.wrap}>
          {title}
          <div className={styles.partyBillTable} id="billTitle">
              <div className={fixedClasses}>
                  <div className={styles.billTitles}>
                      <div className={styles.partyName}></div>
                      <div className={styles.billTitle}>法案一</div>
                      <div className={styles.billTitle}>法案二</div>
                      <div className={styles.billTitle}>法案三</div>
                  </div>
              </div>

              {partyBills}
              <div className={styles.billMeta}>截至網站更新前（12月7日），已有自由台灣黨、時代力量、綠社盟、樹黨、大愛憲改聯盟、台聯回覆，我們歡迎每個政黨進行表態承諾的回覆。</div>
              <div id="billEnd"></div>
          </div>
      </div>
    );
  }
}
