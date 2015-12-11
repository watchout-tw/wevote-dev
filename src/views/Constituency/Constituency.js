import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import CandidateProfileCards from '../../components/CandidateProfileCards/CandidateProfileCards.js';

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

    return (
      <div className={styles.wrap}>
          
          <div className={styles.mainContent}>
              <div className={styles.areaFlag}>
                  <div>{district2cht(area)}</div>
                  {noItem}
                  <Link to={`/constituencies/`} 
                        className={styles.flagMeta}>看其他選區</Link>
              </div>
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


