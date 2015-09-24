import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import {setLegislatorFilter} from '../../ducks/legislatorPositions';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';
import PositionSquare from '../../components/PositionSquare/PositionSquare.js';

import eng2url from '../../utils/eng2url';

@connect(
    state => ({legislators: state.legislators,
               legislatorPositions: state.legislatorPositions
               }),
    dispatch => bindActionCreators({setLegislatorFilter}, dispatch))

export default class IssueGroup extends Component {
  static propTypes = {
      setLegislatorFilter: PropTypes.func.isRequired,
      legislatorPositions: PropTypes.object.isRequired
  }
  componentWillMount(){
      const { id, legislators, setLegislatorFilter } = this.props;
      const name = legislators[id].name;
      setLegislatorFilter(name);
  }
  componentWillReceiveProps(nextProps){

      const id = this.props.id;
      const nextId = nextProps.id;

      if(id !== nextId){
          const { legislators, setLegislatorFilter } = this.props;
          const name = legislators[id].name;
          setLegislatorFilter(name);
      }

  }
  render() {
    const styles = require('./IssueGroup.scss');
    const id = this.props.id;
    const {legislatorPositions} = this.props;

    const name = this.props.legislators[id].name;
    const positions = legislatorPositions.data.positions;
    
    if(!positions)
        return <div></div>

    let issueGroups = Object.keys(positions).map((currentIssue, index)=>{

        let issueUrl = eng2url(currentIssue);
        return (
                <Link to={`/people/${id}/${issueUrl }`}
                      className={styles.issueBlock} 
                      key={index} >
                    <PositionSquare issueName={currentIssue}
                                         data={positions[currentIssue]}/>
                </Link>)
    })

    return (
      <div className={styles.wrap}>
          <div className={styles.issueWrap}>{issueGroups}</div>    
      </div>
    );
  }
}
