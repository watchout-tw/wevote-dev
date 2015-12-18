import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import DistrictSelector from '../../components/DistrictSelector/DistrictSelector.js';
import ElectionMap from '../../components/ElectionMap/ElectionMap.js';
@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class Constituencies extends Component {
  
  render() {
    const styles = require('./Constituencies.scss');
    
    return (
      <div className={styles.wrap}>
          <div className={styles.instruction}>
              <p className={styles.paragraph}>每屆勇者大選，將開啟兩大戰場：勇者競技場和黨團衝突戰。</p>
              <p className={styles.paragraph}>勇者競技場，全島分成 75 個不同區域。勇者將在每區競技場裡爭取各地島嶼主人的信任，取得代表民意的機會。誰能成為最終的競技場王者，就由觀戰的你來決定！</p>
              <p className={styles.paragraph}>島嶼主人！請選出你想觀戰的競技場區域：</p>
              <DistrictSelector />
          </div>
          <ElectionMap />
          <div className={styles.bgHolder}></div>
      </div>
    );
  }
}


