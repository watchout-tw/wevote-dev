import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Slideshow from '../../components/Slideshow/Slideshow.js';

import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import PositionLegislatorGroup from '../../components/PositionLegislatorGroup/PositionLegislatorGroup.js';
import PositionPartyGroup from '../../components/PositionPartyGroup/PositionPartyGroup.js';

import IssueController from '../../components/IssueController/IssueController.js';

import PositionRecord from '../../components/PositionRecord/PositionRecord.js';

const VIEW_PARTY = 'VIEW_PARTY';
const VIEW_LEGISLATOR = 'VIEW_LEGISLATOR';
const VIEW_POSITION = 'VIEW_POSITION';

@connect(
    state => ({
                issues: state.issues,
                partyView: state.partyView,
                legislatorView: state.legislatorView,
                positionView: state.positionView,
                issueController: state.issueController
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  static propTypes = {
     issues: PropTypes.object.isRequired,
     partyView: PropTypes.object.isRequired,
     legislatorView: PropTypes.object.isRequired,
     positionView: PropTypes.object.isRequired,
     issueController: PropTypes.object.isRequired
  }

  constructor(props) { super(props)
    this.state = {
        activeRecord: "",
        activeLegislator: "",
    }
  }

  _setToActiveRecord(value, event){
      this.setState({ activeRecord: value });
  }
  _resetActiveRecord(){
      this.setState({ activeRecord: "" });
  }

  _setToActiveLegislator(value, event){
      this.setState({ activeLegislator: value });
  }
  _resetActiveLegislator(){
      this.setState({ activeLegislator: "" });
  }

  render() {
    const styles = require('../Issue/Issue.scss');

    const {issues, partyView, legislatorView, positionView, issueController} = this.props;
    const {activeRecord, activeLegislator, isLocked} = this.state;

    const currentIssueName = this.props.params.issueName;/* 從 URL 知道現在讀的議題頁面 */

    const currentIssue = issues[currentIssueName]//只拿目前頁面議題的議題基本資料，maybe refine to ducks/select later on


    let bindSetToActiveRecord = this._setToActiveRecord.bind(this);
    let bindResetActiveRecord = this._resetActiveRecord.bind(this);

    let bindSetToActiveLegislator = this._setToActiveLegislator.bind(this);
    let bindResetActiveLegislator = this._resetActiveLegislator.bind(this);

    /* 2. 看立委 */
    const currentLegislatorView = legislatorView[currentIssue.titleEng];
    let positionLegislatorGroups = currentLegislatorView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionLegislatorGroup data={value} issueStatement={currentLegislatorView.statement} key={index}
                                        setToActiveLegislator={bindSetToActiveLegislator}
                                        resetActiveLegislator={bindResetActiveLegislator}
                                        activeLegislator={activeLegislator}
                                        currentIssueName={currentIssueName}/>;
    });





    return (
      <div className={styles.masthead}>
          <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>

          <IssueController currentIssue={currentIssue} />

          <div className={styles.records}>
            {positionLegislatorGroups}
          </div>

      </div>
    );
  }
}
