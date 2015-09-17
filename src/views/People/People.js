import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
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

export default class People extends Component {
  static propTypes = {
      setLegislatorFilter: PropTypes.func.isRequired,
      legislatorPositions: PropTypes.object.isRequired
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
          const { legislators, setLegislatorFilter } = this.props;
          const name = legislators[id].name;
          setLegislatorFilter(name);
      }

  }
  render() {
    const styles = require('./People.scss');
    const id = this.props.params.peopleId;
    const {legislatorPositions} = this.props;

    const positions = legislatorPositions.data.positions || {};
    
    let issueGroups = Object.keys(positions).map((currentIssue, index)=>{
        
        let issueUrl = eng2url(currentIssue);
        return (<div className={styles.issueBlock} key={index} >
                    <PositionSquare issueName={currentIssue}
                                         data={positions[currentIssue]}/>
                    <Link className={styles.seeMore} to={`/people/${id}/${issueUrl }`}>看更多</Link>
               </div>)
    })

    return (
      <div className={styles.wrap}>
          <PeopleProfile id={id} />
          <div className={styles.issueWrap}> 
            {issueGroups}
          </div>
      </div>
    );
  }
}
