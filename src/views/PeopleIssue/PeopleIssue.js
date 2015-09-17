import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

import {setLegislatorFilter} from '../../ducks/legislatorPositions';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';

import PositionSquare from '../../components/PositionSquare/PositionSquare.js';
import RecordTable from '../../components/RecordTable/RecordTable.js';


import url2eng from '../../utils/url2eng';

@connect(
    state => ({
                  legislators: state.legislators,
                  legislatorPositions: state.legislatorPositions,
                  issues: state.issues
               }),
    dispatch => bindActionCreators({setLegislatorFilter}, dispatch))

export default class PeopleIssue extends Component {
  static propTypes = {
      setLegislatorFilter: PropTypes.func.isRequired,
      legislatorPositions: PropTypes.object.isRequired
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
      const { legislators, setLegislatorFilter } = this.props;
      const id = this.props.params.peopleId;
      const name = legislators[id].name;
      setLegislatorFilter(name);
  }
  componentWillReceiveProps(nextProps){
      
      const id = this.props.params.peopleId;
      const nextId = nextProps.params.peopleId;

      if(id !== nextId){
          const { legislators, setLegislaotrFilter } = this.props;
          const name = legislators[nextId].name;
          setLegislatorFilter(name);
      }

  }
  render() {
    const styles = require('./PeopleIssue.scss');
    const id = this.props.params.peopleId;
    const issueURL = this.props.params.issueName;
    const {legislatorPositions, issues} = this.props;
    const {showMenu} = this.state;

    let issueDataName = url2eng(issueURL)

    if(!legislatorPositions.data.positions) return <div></div>;

    const position = legislatorPositions.data.positions[issueDataName];

    let issueMenu = (showMenu===true) ? (Object.keys(issues).map((currentIssueName,i)=>{
        let active = (issueURL === currentIssueName) ? styles.menuActive : "";
        return  <Link className={` ${styles.menu} ${active}`}
                      to={`/people/${id}/${currentIssueName}`} 
                      key={i}>{issues[currentIssueName].title}</Link>;
        
    })) : "";
    
   
    return (
      <div className={styles.wrap}> 
          <PeopleProfile id={id} />
          
          <div className={styles.main}>
              <div className={styles.summary}> 
                  <PositionSquare issueName={issueDataName}
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
