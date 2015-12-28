import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

import MaXiCastle from '../../components/MaXiCastle/MaXiCastle.js';
import Missions from '../../components/Missions/Missions.js';

import getData from '../../data/getData';
const {issues} = getData();

export default class Issues extends Component {
  render() {
    const styles = require('./Issues.scss');
    const title = `議題攻城戰-立委議題表態大公開-沃草2016立委出任務`;
    const description = `立委對於各項重大議題的戰鬥策略大解析！趕快來看看立委針對下列重大議題講了哪些話！`;
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description,
            'og:type' : 'website'
          }
      }
    };

    return (
      <div>
          <div className={styles.home}> 
              <DocumentMeta {...metaData}/>       
              <div className={styles.contentWrap}>
                  <div className={styles.innerWrap}>
                      <Missions showComingMission={false}
                                shipmentsType={"2"}/>
                      <MaXiCastle />
                      <Missions showComingMission={true}
                                shipmentsType={"1"}/>
                  </div>
              </div>
              
          </div>
          <div className={styles.bgHolder}></div>
      </div>
    );
  }
}


