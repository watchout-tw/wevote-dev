import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import CandidateProfileCards from '../../components/CandidateProfileCards/CandidateProfileCards.js';
import DistrictFlag from '../../components/DistrictFlag/DistrictFlag.js';

import district2cht from '../../utils/district2cht';
import getDistrictLegislators from '../../utils/getDistrictLegislators';

@connect(
    state => ({legislators: state.legislators}),
    dispatch => bindActionCreators({}, dispatch))

export default class Constituency extends Component {
 
  constructor(props){ super(props)
    const {legislators} = props;
    const {area, areaNo} = props.params;

    let legislatorList = getDistrictLegislators(legislators, area, areaNo);
    this.state = {
        legislatorList: legislatorList
    }
  }
  render() {
    const styles = require('./Constituency.scss');
    const {area, areaNo} = this.props.params;
    const {legislatorList} = this.state;
    let noItem = (areaNo) ? <div>第{areaNo}選區</div> : "";

    //應選 x 名
    let shouldElect = 1;
    if(["LAB","MAB"].indexOf(area) !== -1){
       shouldElect = 3;
    }

    //本區現任立委
    let currentLegislatorItems = legislatorList.map((people, index)=>{
        let hasResignInfo, separatorItem;
        if(people.hasResigned === true){
           hasResignInfo = "（已離職）";
        }
        if(index !== legislatorList.length -1){
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
              
              <h3 className={styles.electCount}>本區將選出 {shouldElect} 位勇者</h3>
              <div className={styles.currentLegislators}>現任代表：{currentLegislatorItems}</div>
              
              <CandidateProfileCards area={area}
                                     areaNo={areaNo}/>
              <div className={styles.action}>
                  <Link className={styles.actionButton}
                        to={`/constituencies/${area}/${areaNo}/table/`}>進入競技場</Link>   
              </div>
          </div>
          <div className={styles.bgHolder}></div>

      </div>
    );
  }
}


