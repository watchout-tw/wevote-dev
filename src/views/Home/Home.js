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

    const metaData = {
      title: '立委求職中-2016立委投票資訊站',
      description: '2016立委選舉票該投給誰？每四年一次的立委選舉，就像是立委的大型求職博覽會。「2016立委求職中」是一個提供選民了解立委候選人議題表態的網站，分析立委及政黨針對重大議題的表態立場。想透過議題更了解你的選區立委嗎？請上「2016立委求職中」！',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: '立委選舉, 台灣立委, 台灣立法院, 2016選舉'
        },
        'og:title': '立委求職中-2016立委投票資訊站',
        'og:description': '2016立委選舉票該投給誰？每四年一次的立委選舉，就像是立委的大型求職博覽會。「2016立委求職中」是一個提供選民了解立委候選人議題表態的網站，分析立委及政黨針對重大議題的表態立場。想透過議題更了解你的選區立委嗎？請上「2016立委求職中」！'
      }
    };

    return (
      <div className={styles.home}>
          <DocumentMeta {...metaData}/>
          <div className={styles.pageTitle}>想知道這些議題有哪些立委關心嗎？</div>
          {issueCovers}
          <div className={styles.coverItem}>
               <div className={styles.comingText}>更多議題<br/>coming soon...</div>
          </div>
      </div>
    );
  }
}
