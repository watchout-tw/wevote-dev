import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');

    const title = "沃草！立委出任務 - 2016立委投票攻略";
    const description = "2016立委選舉票該投給誰？「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委與下任候選人立場，並分析政黨對於議題表態和優先法案的未來承諾。想了解你的選區立委嗎？想知道政黨票怎麼投嗎？請上「立委出任務」！";
    const metaData = {
      title: title,
      description: description,
      meta: {
        charSet: 'utf-8',
        'og:title': title,
        'og:description': description,
        'og:type' : 'website'
      }
    };

    let stonehenge = require('./images/stonehenge.png');
    let stargate = require('./images/stargate.png');

    let mountain = require('./images/mountain.png');
    let field = require('./images/field.png');
    let coliseum = require('./images/coliseum.png');

    let symbols_issues = require('./images/symbols_issues.svg');
    let symbols_parties = require('./images/symbols_parties.svg');
    let symbols_constituencies = require('./images/symbols_constituencies.svg');

    let lock = require('./images/lock.png');

    return (
      <div className={styles.home}>
          <DocumentMeta {...metaData}/>

          <div className={styles.innerWrap}>

              <div className={styles.invisible}>
                <Link to={`/404`}>404</Link>
                <Link to={`/8th-legislators`}>8th-legislators</Link>
                <Link to={`/embed`}>embed</Link>
              </div>

              <img src={stonehenge} className={styles.stonehenge}/>
              <div className={styles.sky}>
                <Link className={styles.stargate} to={`/issues/`}>
                  <img src={mountain} className={styles.destination}/>
                  <img src={stargate} className={styles.glow}/>
                  <div className={styles.label}><img src={symbols_issues} className={styles.icon}/><p className={styles.title}>議題攻城戰</p></div>
                </Link>
                <Link className={styles.stargate} to={`/parties/`}>
                  <img src={field} className={styles.destination}/>
                  <img src={stargate} className={styles.glow}/>
                  <div className={styles.label}><img src={symbols_parties} className={styles.icon}/><p className={styles.title}>黨團衝突戰</p></div>
                </Link>
                <div className={styles.stargate}>
                  <img src={coliseum} className={styles.destination}/>
                  <img src={stargate} className={styles.glow}/>
                  <img src={lock} className={styles.lock}/>
                  <div className={styles.label}><img src={symbols_constituencies} className={styles.icon}/><p className={styles.title}>勇者競技場</p></div>
                </div>
              </div>

              <Link className={styles.tempLink} to={`/issues/`}>議題攻城戰</Link>
              <Link className={styles.tempLink} to={`/parties/`}>黨團衝突戰</Link>
              <div className={styles.tempLink}>勇者競技場<br/>(12/10 啟動)</div>

          </div>
      </div>
    );
  }
}
