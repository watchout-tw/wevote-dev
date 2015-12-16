import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import CandidateProfileCards from '../../components/CandidateProfileCards/CandidateProfileCards.js';
import DistrictFlag from '../../components/DistrictFlag/DistrictFlag.js';

import district2cht from '../../utils/district2cht';

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class Constituency extends Component {
  constructor(props){super(props)
    
  }
  render() {
    const styles = require('./Constituency.scss');
    const {area, areaNo} = this.props.params;
    let noItem = (areaNo) ? <div>第{areaNo}選區</div> : "";

    //應選 x 名
    let shouldElect = 1;
    if(["LAB","MAB"].indexOf(area) !== -1){
       shouldElect = 3;
    }

    return (
      <div className={styles.wrap}>
          
          <div className={styles.mainContent}>
              <h2 className={styles.electCount}>本區將選出 {shouldElect} 位勇者</h2>

              <DistrictFlag area={area} areaNo={areaNo} />
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


