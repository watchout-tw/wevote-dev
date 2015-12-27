import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import ElectionMap from '../../components/ElectionMap/ElectionMap.js';

export default class Constituencies extends Component {

  render() {
    const styles = require('./Constituencies.scss');

    return (
      <div className={styles.wrap}>
          <div className={styles.instruction}>
              <p>勇者競技場，全島分成七十五個不同區域。勇者將在每區競技場裡競逐爭取島民們的信任，取得在立法聖殿中代表島民意志的機會。</p>
              <p>誰能勝出？由島嶼主人的你來決定！</p>
              <p>⬇︎⬇︎⬇︎選地圖，看選區⬇︎⬇︎⬇︎</p>
          </div>
          <ElectionMap />
          <div className={styles.bgHolder}></div>
      </div>
    );
  }
}
