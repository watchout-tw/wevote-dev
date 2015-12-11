import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import PartyProfile from '../../components/PartyProfile/PartyProfile.js';
import PositionSquare from '../../components/PositionSquare/PositionSquare.js';
import RecordTable from '../../components/RecordTable/RecordTable.js';

import url2eng from '../../utils/url2eng';
import eng2cht from '../../utils/eng2cht';
import parseToPartyPosition from '../../utils/parseToPartyPosition';

@connect(
    state => ({
                 legislators: state.legislators,
                 records: state.records,
                 issues: state.issues
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class PartyIssue extends Component {
  static propTypes = {
      legislators: PropTypes.object.isRequired,
      records: PropTypes.object.isRequired,
      issues: PropTypes.object.isRequired
  }
  //設定 initial state
  constructor(props) { super(props)
      this.state = {
          showMenu: false,
          partyPositions: parseToPartyPosition(props.records, props.issues)
      }
  }
  _toggleMenu(){
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    const styles = require('./PartyIssue.scss');
    const id = this.props.params.partyId;
    const issueURL = this.props.params.issueName;
    const {issues} = this.props;
    const {showMenu, partyPositions} = this.state;
    const currentPartyPositions = partyPositions[id];
    const positions = currentPartyPositions.positions || {};


    let issueDataName = url2eng(issueURL)

    const position = positions[issueDataName];

    let issueMenu = (showMenu===true) ? (Object.keys(issues).map((currentIssueName,i)=>{
        let active = (issueURL === currentIssueName) ? styles.menuActive : "";

        /// Refine 拿數字的方法
        let dataName = issues[currentIssueName].titleEng;

        let recordsCount = currentPartyPositions.positions[dataName].totalCounts;

        return  <div className={`${styles.menu} ${active}`}>
          <Link className={`${styles.ia} ${styles.black}`}
            to={`/parties/${id}/records/${currentIssueName}`}
            key={i}>
            {`${issues[currentIssueName].title}─${recordsCount}`}
          </Link>
        </div>;

    })) : "";

    let issueTitle = eng2cht(issueURL);

    const title = `${currentPartyPositions.name}對於${issueTitle}的表態-沃草2016立委出任務`;
    const description = `想知道${currentPartyPositions.name}對於${issueTitle}使用什麽戰鬥策略嗎？趕快來看看${currentPartyPositions.name}委員在立法院針對${issueTitle}說了些什麽！`
    const metaData = {
      title: title ,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description
          }
      }

    };
    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <PartyProfile id={id}/>
          <div className={styles.main}>
            <div className={styles.summary}>
              <div className={styles.positionSquare}>
                <PositionSquare issueName={issueDataName} data={position}/>
              </div>
              <div>
                <div className={styles.menuBlock}>
                  <div className={styles.menuTitle}>
                    <Link className={`${styles.ia} ${styles.bright}`} onClick={this._toggleMenu.bind(this)}>切換議題</Link>
                  </div>
                  {issueMenu}
                </div>
              </div>
            </div>
            <div className={styles.table}>
              <RecordTable data={position}/>
            </div>
          </div>
      </div>
    );
  }
}
