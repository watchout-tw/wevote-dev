import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import MaXiCastle from '../../components/MaXiCastle/MaXiCastle.js';
import Missions from '../../components/Missions/Missions.js';
@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Embed extends Component {
  render() {
    const styles = require('./Embed.scss');
    const {issues} = this.props;

    const missionImg = require("./images/VideoTitles_mission.svg");
    const flyingImg = require("./images/flying-inverse.png");

    return (
      <div className={styles.wrap}>
          <h1 className={styles.topic}>立委勇者大選・最強解析！</h1>
          <img src={flyingImg} className={styles.flyingImg} />
          <img src={missionImg}
               className={styles.missionImg}/>
          <div className={styles.container}>
              
              <Missions issues={issues}
                        showComingMission={false}
                        embed={true}/>
              <MaXiCastle />
          </div>

      </div>
    );
  }
}


