import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

import PeopleAvatar from '../PeopleAvatar/PeopleAvatar';

import eng2url from '../../utils/eng2url';
import getDistrictCandidates from '../../utils/getDistrictCandidates';

@connect(
    state => ({ candidates: state.candidates }),
    dispatch => bindActionCreators({}, dispatch))

export default class CandidateBuns extends Component {
  constructor(props){ super(props)
    const {candidates, area, areaNo} = props;
    let candidateList = getDistrictCandidates(candidates, area, areaNo);
    this.state = {
        candidateList: candidateList
    }
  }
  render() {
    const styles = require('./CandidateBuns.scss');
    const {category, exclude, areaNo} = this.props;
    const {candidateList} = this.state;
    console.log(candidateList)

    if(!candidateList) return <div></div>

    let bunItems;
    if(areaNo === "N/A"){//TO BE REFINE
        bunItems = <div>不分區立委</div>

    }else{
        bunItems = candidateList.map((candidate, i)=>{
            console.log(candidate)
            if(Number(candidate.id) === Number(exclude)) return;

            return (
                <Link className={styles.bunItem}
                      key={`partybun-${category}-${candidate.id}-${i}`}
                      to={`/people/${candidate.id}/${category}/`}>
                      <div className={styles.bunImg}><PeopleAvatar id={candidate.id} /></div>
                      <div>{candidate.name}</div>
                </Link>
            )

        })
    }
    return (
        <div className={styles.wrap}>
           {bunItems}
        </div>
    );
  }
}
