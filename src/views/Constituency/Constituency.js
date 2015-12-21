import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import CandidateProfileCards from '../../components/CandidateProfileCards/CandidateProfileCards.js';
import DistrictFlag from '../../components/DistrictFlag/DistrictFlag.js';

import district2cht from '../../utils/district2cht';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import getDistrictCandidates from '../../utils/getDistrictCandidates';
import getPeopleTableData from '../../utils/getPeopleTableData';
@connect(
    state => ({
      legislators: state.legislators,
      records: state.records,
      issues: state.issues,
      candidates: state.candidates
    }),
    dispatch => bindActionCreators({}, dispatch))

export default class Constituency extends Component {
 
  constructor(props){ super(props)
    const {records, issues, legislators, candidates} = props;
    const {area, areaNo} = props.params;

    let legislatorPositions = parseToLegislatorPosition(records, issues, legislators);
    let candidateList = getDistrictCandidates(candidates, area, areaNo);
    let tableData = getPeopleTableData(legislatorPositions, candidateList);
    
    let comparableCandidates = [];//有過去紀錄 or 有未來承諾的候選人
   
    console.log(candidateList)

    this.state = {
        candidateList: candidateList,
        side: 'front'
    }
  }
  _toggle(){
    const {side} = this.state;
    console.log(side+'-->')
    
    if(side === 'front'){
        this.setState({ side: 'back' });
        console.log('back')
    }else{
        this.setState({ side: 'front' });
        console.log('front')
    }

  }
  render() {
    const styles = require('./Constituency.scss');
    const {area, areaNo} = this.props.params;
    const {candidateList,side} = this.state;
    let noItem = (areaNo) ? <div>第{areaNo}選區</div> : "";

    //應選 x 名
    let shouldElect = 1;
    if(["LAB","MAB"].indexOf(area) !== -1){
       shouldElect = 3;
    }

    //本區現任立委
    let currentLegislatorItems = candidateList.map((people, index)=>{
        let hasResignInfo, separatorItem;
        if(people.hasResigned === true){
           hasResignInfo = "（已離職）";
        }
        if(index !== candidateList.length -1){
           separatorItem = "、";
        }
        return (
          <span key={index}>
            <Link to={`/people/${people.id}/records/`}
                  className={`${styles.ia} ${styles.bright}`}>{people.name}</Link>
            {hasResignInfo}{separatorItem}
          </span>
        )
    })

    return (
      <div className={styles.wrap}>
          
          <div className={styles.mainContent}>
              <DistrictFlag area={area} areaNo={areaNo} />
              <div className={styles.flipButton}
                   onClick={this._toggle.bind(this)}>比較立場</div>

              <h3 className={styles.electCount}>本區將選出 {shouldElect} 位勇者</h3>
              <div className={styles.currentLegislators}>現任代表：{currentLegislatorItems}</div>
              
              <CandidateProfileCards area={area}
                                     areaNo={areaNo}
                                     side={side}
                                     candidateList={candidateList}/>
              
          </div>
          <div className={styles.bgHolder}></div>

      </div>
    );
  }
}


