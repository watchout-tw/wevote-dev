import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    const {issues} = this.props;

    let issueCovers = Object.keys(issues).map((currentIssue, index)=>{

        let imgURL;

        try {
          imgURL = require(`./images/${issues[currentIssue].titleEng}.jpg`);
        }catch(e){
          imgURL = require("./images/default.jpg");
        }

        return (
          <Link to={`/issues/${currentIssue}/parties`} key={index} className={styles.coverItem}>
              <img src={imgURL} className={styles.coverImg}/>
              <div className={styles.coverTitle }>{issues[currentIssue].title}</div>
              <div>{issues[currentIssue].question}</div>
          </Link>
        )
    });

    let roadmapURL = require("./images/roadmap.png");

    const metaData = {
      title: '立委出任務-2016立委投票資訊站',
      description: '2016立委選舉票該投給誰？每四年一次的立委選舉，就像是立委的大型求職博覽會。「2016立委出任務」是一個提供選民了解立委候選人議題表態的網站，分析立委及政黨針對重大議題的表態立場。想透過議題更了解你的選區立委嗎？請上「2016立委出任務」！',
      meta: {
        charSet: 'utf-8',
        'og:title': '立委出任務-2016立委投票資訊站',
        'og:description': '2016立委選舉票該投給誰？每四年一次的立委選舉，就像是立委的大型求職博覽會。「2016立委出任務」是一個提供選民了解立委候選人議題表態的網站，分析立委及政黨針對重大議題的表態立場。想透過議題更了解你的選區立委嗎？請上「2016立委出任務」！'
      }
    };

    return (
      <div className={styles.home}>
          <DocumentMeta {...metaData}/>
          
          <div className={styles.innerWrap}>
              <div className={styles.pageTitle}>想知道這些議題有哪些立委關心嗎？</div>
              {issueCovers}
              <div className={styles.coverItem}>
                   <div className={styles.comingText}>更多議題<br/>coming soon...</div>
              </div>
          </div>

          <div className={styles.roadmapBlock}>
              <div className={`${styles.innerWrap} ${styles.alignCenter}`}>
                <h2>關於本站</h2>
              </div>
              <img src={roadmapURL} className={styles.roadmap}/>
          </div>

          <div className={styles.aboutUsBlock }>
              <div className={`${styles.innerWrap} ${styles.alignCenter}`}>
                <h2>關於我們</h2>
                <div className={styles.aboutUsText}>
                    <p>每四年一次的立委選舉，就像是立委的大型求職博覽會。</p>
                    <p>但身為頭家的人民，卻從來沒看過這些候選人的完整履歷。</p>
                    <p>現在，你可以有更好的方式了解他們。</p>
                    <br/>
    
                    <p>「2016立委出任務」是一個提供選民了解立委候選人議題表態的網站。我們整理出第八屆立委對重大議題提案質詢表決，分析立委及政黨的表態立場，未來也將陸續整理各候選人對相關議題的承諾，提供選民了解候選人的價值理念。</p>
    
                    <br/>
                    <p>我們相信，更多的資訊揭露，更好的選舉文化，將是改變台灣民主政治的關鍵因素。</p>
                    <p>We vote, we care.</p>
                </div>
              </div>
          </div>

          
      </div>
    );
  }
}
