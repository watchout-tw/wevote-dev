import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';
import classnames from 'classnames';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';

import district2eng from '../../utils/district2eng';
import getDistrictCandidates from '../../utils/getDistrictCandidates'; //該區參選人資訊

const DISTRICTS = {
  "臺北市": 8,
  "新北市": 12,
  "桃園市": 6,
  "臺中市": 8,
  "臺南市": 5,
  "高雄市": 9,
  "新竹縣": 1,
  "苗栗縣": 2,
  "彰化縣": 4,
  "南投縣": 2,
  "雲林縣": 2,
  "嘉義縣": 2,
  "屏東縣": 3,
  "宜蘭縣": 1,
  "花蓮縣": 1,
  "臺東縣": 1,
  "澎湖縣": 1,
  "金門縣": 1,
  "連江縣": 1,
  "基隆市": 1,
  "新竹市": 1,
  "嘉義市": 1,
  "平地原住民": 1,
  "山地原住民": 1
}

@connect(
    state => ({
                candidates: state.candidates
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class CandidateList extends Component {
  render(){
    const styles = require('./CandidateList.scss');
    const {candidates} = this.props;

    let cityItems = Object.keys(DISTRICTS).map((cityCht, index)=>{
        let cityEng = district2eng(cityCht);
        let countMax = DISTRICTS[cityCht];
        
        //如果有三個選區，建置 [1,2,3]
        let subDistricts = [];
        for(let i=1;i<=Number(countMax);i++){
            subDistricts.push(i);
        }
        
        //臺北市 1-8 選區 layout
        let subDistrictItems = subDistricts.map((count)=>{
            let candidateList = getDistrictCandidates(candidates, cityEng, String(count));
            
            let currentDistrictCandidates = candidateList.map((people, i)=>{
                let shadowClasses = classnames({
                  [styles.shadow] : true,
                  [styles.hasReply] : people.hasReply == true
                })
                return (
                    <Link to={`/people/${people.id}/promises/`}
                          className={styles.candidate}
                          key={`${people.id}-${i}`}>
                        <div className={shadowClasses}></div>
                        <div className={styles.photo}>
                            <PeoplePhoto id={people.id}/>
                        </div>

                        <div className={styles.partyItem}>
                            <div className={`${styles.partyFlag} ${styles.small} ${styles[people.party]}`}></div>
                        </div>
                        
                        <div className={`${styles.nameItem} ${styles.ia} ${styles.black} ${styles.line}`} >
                             {people.name}
                        </div>
                    </Link>
                )
            });
            
            return (
              <div className={styles.subDistrict}>
                  <Link to={`/constituencies/${cityEng}/${count}/`}
                        className={styles.subDistrictText}>{cityCht}第{count}選區</Link>
                  <div>{currentDistrictCandidates}</div>
              </div>
            )
        })

        return (
          <div className={styles.district}>
              <h2>{cityCht}</h2>
              {subDistrictItems}
          </div>
        )
    });

    return (
      <div className={styles.wrap}>
          {cityItems}
      </div>
    );
  }
}
// class District extends Component {
//     render(){
//         const styles = require('./CandidateList.scss');
//         const
//         return (

//         )
//     }
// }