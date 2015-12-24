import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

import PeoplePhoto from '../PeoplePhoto/PeoplePhoto';

import eng2url from '../../utils/eng2url';
import getDistrictCandidates from '../../utils/getDistrictCandidates';
import identity_district from '../../utils/identity_district';

import {loadCandidates} from '../../ducks/candidates.js';

@connect(
    state => ({ 
      candidates: state.candidates.data,
      legislators: state.legislators
    }),
    dispatch => bindActionCreators({loadCandidates}, dispatch))

export default class CandidateBuns extends Component {
  constructor(props){ super(props)
    this.state = {
        candidatesLoaded: false
    }
  }
  componentWillMount(){
    this.props.loadCandidates();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.candidates){
      const {area, areaNo} = this.props;
      this.setState({
          candidatesLoaded: true,
          candidateList: getDistrictCandidates(nextProps.candidates.value, area, areaNo)
      })   
    }
  }
  render() {
    const {candidatesLoaded} = this.state;
    if( !candidatesLoaded) return <div style={{textAlign: 'center'}}>Loading...</div>

    const styles = require('./CandidateBuns.scss');
    const {legislators, category, exclude, area, areaNo} = this.props;
    const {candidateList} = this.state;
    
    if(!candidateList) return <div></div>;


    let bunItems = candidateList.map((candidate, i)=>{
        
        if(Number(candidate.id) === Number(exclude)) return;

        //現任資料
        let currentInfo;
        let isCurrent = identity_district(legislators[candidate.id], area, areaNo);
        if(isCurrent === 'D'){
            currentInfo = (
                <div className={styles.currentInfo}>
                    <div className={styles.currentInfoText}>現任</div>
                    <div className={styles.currentInfoTriangle}></div>
                </div>
            );
        }

        return (
            <Link key={`partybun-${category}-${candidate.id}-${i}`}
                  className={styles.bunItem}
                  to={`/people/${candidate.id}/${category}/`}>
                   {currentInfo}
                  <div className={styles.bunImg}><PeoplePhoto id={candidate.id} /></div>
                  <div className={`${styles.bunParty} ${styles.partyFlag} ${styles.small} ${styles[candidate.party]}`}></div>
                  <div className={styles.bunName}>{candidate.name}</div>
            </Link>
            
        )

    });
  
    return (
        <div className={styles.wrap}>
           {bunItems}
        </div>
    );
  }
}
