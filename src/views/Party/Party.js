import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {setPartyFilter} from '../../ducks/partyPositions';

import CandidateProfile from '../../components/CandidateProfile/CandidateProfile.js';
import CandidateIssueGroup from '../../components/CandidateIssueGroup/CandidateIssueGroup.js';

import eng2url from '../../utils/eng2url';

@connect(
    state => ({
                 candidates: state.candidates,
                 partyPositions: state.partyPositions
               }),
    dispatch => bindActionCreators({setPartyFilter}, dispatch))

export default class Party extends Component {
  static propTypes = {
      setPartyFilter: PropTypes.func.isRequired,
      partyPositions: PropTypes.object.isRequired
  }
  componentWillMount(){
      const { setPartyFilter } = this.props;
      const id = this.props.params.partyId;
      console.log(id)
      setPartyFilter(id);
  }
  componentWillReceiveProps(nextProps){
      
      const id = this.props.params.partyId;
      const nextId = nextProps.params.partyId;

      if(id !== nextId){
          setPartyFilter(id);
      }

  }
  render() {
    const styles = require('./Party.scss');
    const id = this.props.params.partyId;
    const {partyPositions} = this.props;

    console.log(partyPositions)

    const positions = partyPositions.data.positions || {};
    
    let issueGroups = Object.keys(positions).map((currentIssue, index)=>{
        //console.log(positions[currentIssue])
        let issueUrl = eng2url(currentIssue);
        return (<div className={styles.issueBlock} key={index} >
                    <CandidateIssueGroup issueName={currentIssue}
                                         data={positions[currentIssue]}/>
                    <Link className={styles.seeMore} to={`/parties/${id}/${issueUrl }`}>看更多</Link>
               </div>)
    })

    return (
      <div className={styles.wrap}>
          {id}
          <div className={styles.issueWrap}> 
            {issueGroups}
          </div>
      </div>
    );
  }
}
