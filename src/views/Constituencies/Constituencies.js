import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
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
              <p>勇者競技場，全島分成七十五個不同區域。勇者將在每區競技場裡競逐爭取島民們的信任，取得在立法聖殿中代表島民意志的機會。</p>
              <p>誰能勝出？由島嶼主人的你來決定！</p>
              <p>⬇︎⬇︎⬇︎請選擇你想觀戰的競技場⬇︎⬇︎⬇︎</p>
          </div>
          <ElectionMap />
          <div className={styles.bgHolder}></div>
      </div>
    );
  }
}
