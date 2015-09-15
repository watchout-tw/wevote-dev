import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {setPartyFilter} from '../../ducks/partyPositions';


import PartyProfile from '../../components/PartyProfile/PartyProfile.js';
import CandidateIssueGroup from '../../components/CandidateIssueGroup/CandidateIssueGroup.js';
import RecordTable from '../../components/RecordTable/RecordTable.js';


import url2eng from '../../utils/url2eng';

@connect(
    state => ({
                  partyPositions: state.partyPositions,
                  issues: state.issues
               }),
    dispatch => bindActionCreators({setPartyFilter}, dispatch))

export default class PartyIssue extends Component {
  static propTypes = {
      setPartyFilter: PropTypes.func.isRequired,
      partyPositions: PropTypes.object.isRequired
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
      const { candidates, setPartyFilter } = this.props;
      const id = this.props.params.partyId;
      setPartyFilter(id);
  }
  componentWillReceiveProps(nextProps){
      
      const id = this.props.params.partyId;
      const nextId = nextProps.params.partyId;

      if(id !== nextId){
          const { setPartyFilter } = this.props;
          setPartyFilter(nextId);
      }

  }
  render() {
    const styles = require('./PartyIssue.scss');
    const id = this.props.params.partyId;
    const issueURL = this.props.params.issueName;
    const {partyPositions, issues} = this.props;
    const {showMenu} = this.state;

    let issueDataName = url2eng(issueURL)

    if(!partyPositions.data.positions) return <div></div>;

    const position = partyPositions.data.positions[issueDataName];

    let issueMenu = (showMenu===true) ? (Object.keys(issues).map((currentIssueName,i)=>{
        let active = (issueURL === currentIssueName) ? styles.menuActive : "";
        return  <Link className={` ${styles.menu} ${active}`}
                      to={`/parties/${id}/${currentIssueName}`} 
                      key={i}>{issues[currentIssueName].title}</Link>;
        
    })) : "";
    
   
    return (
      <div className={styles.wrap}> 
          <PartyProfile id={id}/>
          <div className={styles.main}>
              <div className={styles.summary}> 
                  <CandidateIssueGroup issueName={issueDataName}
                                       data={position} />
                  <div>
                      <div className={styles.menuBlock}>
                          <div className={styles.menuTitle}
                               onClick={this._toggleMenu.bind(this)}>更換議題</div>
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
