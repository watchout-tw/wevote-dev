import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import DocumentMeta from 'react-document-meta';

import PartyBills from '../../components/PartyBills/PartyBills';
import Social from '../../components/Social/Social.js';

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
function recordsOrPromises(party){
  let hasRecords = ["KMT","DPP","PFP","TSU","NSU"];
  if(hasRecords.indexOf(party)!==-1){
    return "records";
  }else{
    return "promises";
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
  render() {
    const styles = require('./PartiesTable.scss');
    const {issues} = this.props;
    const {tableData, focus} = this.state;

    let imgHub = {};
    imgHub.aye = require("./images/answers_aye.svg")
    imgHub.nay = require("./images/answers_nay.svg")
    imgHub.none = require("./images/answers_unknown.svg")


    let issueTitles = Object.keys(issues).map((issueId, i)=>{
        return <div key={`${issueId}-${i}`}
                    className={styles.issueTitle}>{issues[issueId].title}</div>
    })
    // 每一個政黨
    let partyPositions = Object.keys(tableData).map((partyId, i)=>{
        let party = tableData[partyId];
        //政黨名稱
        let partyName = (
          <div className={styles.partyName}>
            <div className={styles.nameFlex}>
                <div className={`${styles.party} ${styles.partyFlag} ${styles.tiny} ${styles[party.id]}`}></div>
                <div className={`${styles.partyTitle}`}>{party.name}</div>
            </div>
          </div>
          );

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
                  <div className={recordClasses}><div className={`${styles.recordSquare} ${styles[pos.record]} ${styles[level]}`}></div></div>
                  <img className={styles.promise}
                       src={`${imgHub[pos.promise]}`} />
              </div>
            )
        })

        return <Link className={styles.partyEntry}
                     to={`/parties/${party.id}/${recordsOrPromises(party.id)}/`}>{partyName}{positions}</Link>
    });

    let legendImg = require("./images/legend.png");
    let legendRecord = require('./images/legend_record.svg');
    let legendPromise = require('./images/legend_promise.svg');

    //title class, 處理 scroll fixed on top
    let fixedClasses = classnames({
      [styles.titleWrap]: true,
      [styles.fixed]: focus === "position"
    })

    //seo
    const title = `政黨票投票攻略-各政黨表態及法案大公開-沃草2016立委出任務`;
    const description = `2016立委選舉「政黨票」怎麼投？想知道各政黨對於議題表態與優先法案嗎？各政黨未來承諾大公開，政黨票投票最佳攻略！`;
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description,
            'og:type' : 'website'
          }
      }
    };
    return (
      <div>
          <DocumentMeta {...metaData}/>
          <div className={styles.wrap}>
              <div className={styles.partyPosition}>
                <header><h2>議題表態</h2></header>
                <div className={styles.partyPositionTable} id="positionTitle">
                    <div className={fixedClasses}>
                        <div className={styles.issueTitles}>
                            <div className={styles.partyName}></div>
                            {issueTitles}
                        </div>
                    </div>
                    {partyPositions}
                </div>
                <div id="positionEnd"></div>
                <div className={styles.legend}>
                  <img src={legendRecord}/>
                  <img src={legendPromise}/>
                </div>
              </div>
              <PartyBills showTitle={true}/>
              <Social />
          </div>
          <div className={styles.bgHolder}></div>
      </div>
    );
  }
}
