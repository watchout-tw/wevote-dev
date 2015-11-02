import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import Missions from '../../components/Missions/Missions.js';
import Footer from '../../components/Footer/Footer.js';
import Social from '../../components/Social/Social.js';

@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Issues extends Component {
  render() {
    const styles = require('./issues.scss');
    const {issues} = this.props;


    return (
      <div className={styles.home}>
          
          <div className={styles.contentWrap}>
              <div className={styles.innerWrap}>
                  <Missions issues={issues}
                            showComingMission={true}/>
              </div>
          </div>
          
          <Footer/>
          <Social />
      </div>
    );
  }
}


