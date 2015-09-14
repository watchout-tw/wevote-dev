import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {setCandidateFilter} from '../../ducks/candidatePositions';


import CandidateProfile from '../../components/CandidateProfile/CandidateProfile.js';
import CandidateIssueGroup from '../../components/CandidateIssueGroup/CandidateIssueGroup.js';
import RecordTable from '../../components/RecordTable/RecordTable.js';


import url2eng from '../../utils/url2eng';

@connect(
    state => ({
                  candidates: state.candidates,
                  candidatePositions: state.candidatePositions,
                  issues: state.issues
               }),
    dispatch => bindActionCreators({setCandidateFilter}, dispatch))

export default class CandidateIssue extends Component {
  static propTypes = {
      setCandidateFilter: PropTypes.func.isRequired,
      candidatePositions: PropTypes.object.isRequired
  }
  //設定 initial state
  constructor(props) { super(props)
      this.state = {
          showMenu: false,
      }
  }
  _toggleMenu(){  
    this.setState({ showMenu: !this.state.showMenu });
  }
  componentWillMount(){
      const { candidates, setCandidateFilter } = this.props;
      const id = this.props.params.candidateId;
      const name = candidates[id].name;
      setCandidateFilter(name);
  }
  componentWillReceiveProps(nextProps){
      
      const id = this.props.params.candidateId;
      const nextId = nextProps.params.candidateId;

      if(id !== nextId){
          const { candidates, setCandidateFilter } = this.props;
          const name = candidates[nextId].name;
          setCandidateFilter(name);
      }

  }
  render() {
    const styles = require('./CandidateIssue.scss');
    const id = this.props.params.candidateId;
    const issueURL = this.props.params.issueName;
    const {candidatePositions, issues} = this.props;
    const {showMenu} = this.state;

    let issueDataName = url2eng(issueURL)

    if(!candidatePositions.data.positions) return <div></div>;

    const position = candidatePositions.data.positions[issueDataName];

    let issueMenu = (showMenu===true) ? (Object.keys(issues).map((currentIssueName,i)=>{
        let active = (issueURL === currentIssueName) ? styles.menuActive : "";
        return  <Link className={` ${styles.menu} ${active}`}
                      to={`/candidates/${id}/${currentIssueName}`} 
                      key={i}>{issues[currentIssueName].title}</Link>;
        
    })) : "";
    
   
    return (
      <div className={styles.wrap}> 
          <CandidateProfile id={id} />
          
          <div className={styles.main}>
              <div className={styles.summary}> 
                  <CandidateIssueGroup issueName={issueDataName}
                                       data={position} />
                  <div className={styles.menuBlock}>
                      <div className={styles.menuTitle}
                           onClick={this._toggleMenu.bind(this)}>更換議題</div>
                      {issueMenu}
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
