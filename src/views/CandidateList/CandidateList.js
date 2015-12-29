import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';

import district2eng from '../../utils/district2eng';
import getDistrictCandidates from '../../utils/getDistrictCandidates'; //該區參選人資訊

import getData from '../../data/getData';
const {candidates, legislators} = getData();

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

export default class CandidateList extends Component {
  constructor(props){ super(props)
    this.state = {
       filterType: "hasReply",
       filter: false,
       showPositive: true
    }
    /* hasReply or hasData or hasDataNoReply */
  }
  _setFilterType(value, e){
    this.setState({
        filterType: value
    })
  }
  _toggleFilter(e){
    this.setState({
        filter: !this.state.filter
    })
  }
  _setPositive(value, e){
    this.setState({
        showPositive: value
    })
  }
  render(){
    const styles = require('./CandidateList.scss');
    const {filterType, filter, showPositive} = this.state;
    const totalCount = Object.keys(candidates).length;
    let currentCount = 0;

    let cityItems = Object.keys(DISTRICTS).map((cityCht, index)=>{
        let cityEng = district2eng(cityCht);
        let countMax = DISTRICTS[cityCht];
        
        //如果有三個選區，建置 [1,2,3]
        let subDistricts = [];
        for(let i=1;i<=Number(countMax);i++){
            subDistricts.push(i);
        }
        
        //e.g.臺北市 1-8 選區 layout
        let subDistrictItems = subDistricts.map((count)=>{
            let candidateList = getDistrictCandidates(candidates, cityEng, String(count));
            
            let districtCount = 0;
            let currentDistrictCandidates = candidateList.map((people, i)=>{
                let shadowClasses = classnames({
                  [styles.shadow] : true,
                  [styles.hasReply] : people.hasReply == true
                })

                let shouldReturn = false;
                if(filterType==="hasReply"){
                  if(people.hasReply===true){
                      currentCount++;
                      shouldReturn = true;
                  }
                }else if(filterType==="hasDataNoReply"){
                  if(people.hasReply===false && legislators[people.id]){
                      currentCount++;
                      shouldReturn = true;
                  }
                }else{//"hasData"
                  if(people.hasReply===true || legislators[people.id]){
                      currentCount++;
                      shouldReturn = true;
                  }
                }
                

                //////// 如果是反面列表
                if(shouldReturn===true){
                  districtCount++;
                }

                //always return
                if(filter === false){
                  shouldReturn = true;
                }
                
                if(showPositive === false){
                  shouldReturn = false;
                }

                
                if(shouldReturn){
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
                }
            });
            
            if(showPositive === true){
                return (
                  <div className={styles.subDistrict}>
                      <Link to={`/constituencies/${cityEng}/${count}/`}
                            className={styles.subDistrictText}>{cityCht}第{count}選區</Link>
                      <div>{currentDistrictCandidates}</div>
                  </div>
                )


            }else{
                if(districtCount===0){
                    return (
                      <div className={styles.subDistrict}>
                          <Link to={`/constituencies/${cityEng}/${count}/`}
                                className={styles.subDistrictText}>{cityCht}第{count}選區</Link>
                      </div>
                    )
                }
            }
            
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
          <div>{currentCount} / {totalCount} ({ Math.round((currentCount/totalCount * 100),0)} %)</div>
          <div>區域立委共354人，山地及平地原住民23人</div>

          <div className={styles.actionPanel}>
              <div className={styles.buttonSet}>
                  <div className={`${styles.button} ${ (filterType==="hasReply") ? styles.active:"" }`}
                       onClick={this._setFilterType.bind(this, "hasReply")}>
                      有回覆
                  </div>
                  <div className={`${styles.button} ${ (filterType==="hasData") ? styles.active:"" }`}
                       onClick={this._setFilterType.bind(this, "hasData")}>
                      有資料（現任立委 or 有回覆）
                  </div>
                  <div className={`${styles.button} ${ (filterType==="hasDataNoReply") ? styles.active:"" }`}
                       onClick={this._setFilterType.bind(this, "hasDataNoReply")}>
                      沒回覆，有資料
                  </div>
              </div>
    
              <div className={styles.buttonSet}>
                  <div className={`${styles.button} ${ (filter===false) ? styles.active:"" }`}
                       onClick={this._toggleFilter.bind(this)}>
                      顯示全部
                  </div>
                  <div className={`${styles.button} ${ (filter===true) ? styles.active:"" }`}
                       onClick={this._toggleFilter.bind(this)}>
                      選示部分
                  </div>
              </div>

              <div className={styles.buttonSet}>
                  <div className={`${styles.button} ${ (showPositive===true) ? styles.active:"" }`}
                       onClick={this._setPositive.bind(this, true)}>
                      顯示有的
                  </div>
                  <div className={`${styles.button} ${ (showPositive===false) ? styles.active:"" }`}
                       onClick={this._setPositive.bind(this, false)}>
                      顯示都沒有的
                  </div>
              </div>
          </div>
          {cityItems}
      </div>
    );
  }
}
