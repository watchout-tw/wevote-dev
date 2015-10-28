import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import Video from '../../components/Video/Video.js';
import Missions from '../../components/Missions/Missions.js';
import Footer from '../../components/Footer/Footer.js';
import Social from '../../components/Social/Social.js';

@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    const {issues} = this.props;

    let roadmapURL = require("./images/roadmap.png");
    const title = "沃草！立委出任務 - 2016立委投票攻略";
    const description = "2016立委選舉票該投給誰？「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委與下任候選人立場，並分析政黨針對議題的整體立場。想透過議題更了解你的選區立委嗎？請上「立委出任務」！";
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

    return (
      <div className={styles.home}>
          <DocumentMeta {...metaData}/>
          <Video />
          <div className={styles.contentWrap}>
              <div className={styles.innerWrap}>
                  <Missions issues={issues}
                            showComingMission={true}/>

              </div>
          </div>
          <div className={styles.roadmap}>
            <div className={`${styles.stage} ${styles.october}`}></div>
            <div className={`${styles.stage} ${styles.november}`}></div>
            <div className={`${styles.stage} ${styles.december}`}></div>
            <div className={`${styles.stage} ${styles.january}`}></div>
          </div>
          <Footer/>
          <Social />
      </div>
    );
  }
}


