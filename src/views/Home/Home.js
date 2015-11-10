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

          <div className={styles.innerWrap}>

              <div className={styles.invisible}>
                <Link to={`/404`}>404</Link>
                <Link to={`/8th-legislators`}>8th-legislators</Link>
                 <Link to={`/embed`}>embed</Link>
              </div>

              <Link className={styles.tempLink} to={`/issues/`}>議題攻城戰</Link>
              <Link className={styles.tempLink} to={`/constituencies/`}>勇者競技場</Link>
              <Link className={styles.tempLink} to={`/parties/`}>黨團衝突戰</Link>

          </div>
      </div>
    );
  }
}



