import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';

import PeoplePhoto from '../PeoplePhoto/PeoplePhoto';

import eng2url from '../../utils/eng2url';
import getDistrictCandidates from '../../utils/getDistrictCandidates';
import identity_district from '../../utils/identity_district';
import circleNumber from '../../utils/circleNumber';
import getData from '../../data/getData';
const {legislators, candidates} = getData();

export default class CandidateBuns extends Component {
  constructor(props){ super(props)
    const {area, areaNo} = props;
    let candidateList = getDistrictCandidates(candidates, area, areaNo);
    this.state = {
        candidateList: candidateList
    }
  }
  render() {
    const styles = require('./CandidateBuns.scss');
    const {category, exclude, area, areaNo} = this.props;
    const {candidateList} = this.state;
    
    if(!candidateList) return <div></div>;

    let bunItems = candidateList.map((candidate, i)=>{
        
        //if(Number(candidate.id) === Number(exclude)) return;//不處理目前頁面的


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

        //原住名選區名字加長
        let extendClass = (area === "LAB" || area === "MAB") ? styles.extended : "";
        //嘉義市名字超長
        let extremeClass = (area === "CYC") ? styles.extremeExtended : "";

        //當選註記
        let isElectedText = (candidate.isElected === true) ? "當選":"";
        return (
            <Link key={`partybun-${category}-${candidate.id}-${i}`}
                  className={`${styles.bunItem} 
                              ${extendClass} 
                              ${Number(candidate.id) === Number(exclude) ? styles.active : ""}`}
                  to={`/people/${candidate.id}/${category}/`}>
                   {currentInfo}
                  <div className={styles.bunImg}><PeoplePhoto id={candidate.id} /></div>
                  <div className={`${styles.bunParty} ${styles.partyFlag} ${styles.small} ${styles[candidate.party]}`}></div>
                  <div className={`${styles.bunName} ${extendClass} ${extremeClass}`}>
                    {circleNumber(candidate.number)}{candidate.name}
                  </div>
                  <div className={styles.isElected}>{isElectedText}</div>
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

