import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';

export default class Parties extends Component {
  render() {
    const styles = require('./Parties.scss');

    const title = `政黨票投票攻略-各政黨議題表態大公開-沃草2016立委出任務`;
    const description = `2016立委選舉「政黨票」怎麼投？想知道各政黨的不分區參戰名單嗎？想知道各政黨對於議題表態與優先法案的未來承諾嗎？快來進行政黨成分分析，政黨票投票最佳攻略！`;
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
          <DocumentMeta {...metaData}/>
          <div className={styles.wrap}>
              <div div className={styles.initialWrap}>
                  <div className={styles.story}>
                    <p>黨團衝突戰，將由各地勇者所組成不同的黨團，以團體戰的方式爭奪立法聖殿中的勇者席位。</p>
                    <p>在這場團體戰鬥中，誰能爭取最多席位，同樣考驗島嶼主人的智慧。</p>
                  </div>
                  <div className={styles.actions}>
                      <Link className={styles.goMatch}
                            to={`/parties-game/`}>進入挑戰</Link>
                      <div><Link to={`/parties-table/`}
                            className={styles.goTable}>直接看結果</Link></div>
                  </div>
              </div>
          </div>
          <div className={styles.bgHolder}></div>
      </div>
    );

  }
}
