import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
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
          <Link to={`/issues/${currentIssue}`} key={index} className={styles.coverItem}>
              <img src={imgURL} className={styles.coverImg}/>
              <div className={styles.coverTitle }>{issues[currentIssue].title}</div>
              <div>{issues[currentIssue].question}</div>
          </Link>
        )
    });

    return (
      <div className={styles.home}>
          <div className={styles.pageTitle}>想知道這些議題有哪些立委關心嗎？</div>
          {issueCovers}
          <div className={styles.coverItem}>
               <div className={styles.comingText}>更多議題<br/>coming soon...</div>
          </div>
      </div>
    );
  }
}
