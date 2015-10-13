import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import Video from '../../components/Video/Video.js';
import Missions from '../../components/Missions/Missions.js';
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
    const title = "立委出任務-2016立委投票資訊站";
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
      </div>
    );
  }
}

// <div className={styles.roadmapBlock}>
//     <div className={`${styles.innerWrap} ${styles.alignCenter}`}>
//       <h2>關於本站</h2>
//     </div>
//     <img src={roadmapURL} className={styles.roadmap}/>
// </div>

// <div className={styles.aboutUsBlock }>
//     <div className={`${styles.innerWrap} ${styles.alignCenter}`}>
//       <h2>關於我們</h2>
//       <div className={styles.aboutUsText}>
//           <p>每四年一次的立委選舉，就像是立委的大型求職博覽會。</p>
//           <p>但身為頭家的人民，卻從來沒看過這些候選人的完整履歷。</p>
//           <p>現在，你可以有更好的方式了解他們。</p>
//           <br/>

//           <p>「2016立委出任務」是一個提供選民了解立委候選人議題表態的網站。我們整理出第八屆立委對重大議題提案質詢表決，分析立委及政黨的表態立場，未來也將陸續整理各候選人對相關議題的承諾，提供選民了解候選人的價值理念。</p>

//           <br/>
//           <p>我們相信，更多的資訊揭露，更好的選舉文化，將是改變台灣民主政治的關鍵因素。</p>
//           <p>We vote, we care.</p>
//       </div>
//     </div>
// </div>
