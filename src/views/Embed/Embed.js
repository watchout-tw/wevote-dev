import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import classnames from 'classnames';

import MaXiCastle from '../../components/MaXiCastle/MaXiCastle.js';
import Missions from '../../components/Missions/Missions.js';


export default class Embed extends Component {
  constructor(props){ super(props)
    this.state = {
      view: 'parties'/* default view */
    }

  }
  _onChangeView(id, event){
    const {view} = this.state;
    if(view !== id){
        this.setState({
            view: id
        })
    }
    console.log(this.state.view)
  }
  render() {
    const styles = require('./Embed.scss');
    const {view} = this.state;
    /* tabs */
    const views = [ {
      id: 'issues',
      title: '議題攻城戰'
    },
    {
      id: 'parties',
      title: '黨團衝突戰'
    }];
    let viewItems = views.map((item, i)=>{
        let img = require(`./images/symbols_${item.id}.svg`);
        let viewClasses = classnames({
            [styles.viewItem] : true,
            [styles.active] : view === item.id
        })
        return (
            <div className={`${viewClasses} ${styles[item.id]}`}
                 key={`viewTab-${i}`}
                 onClick={this._onChangeView.bind(this, item.id)}>
                <img src={img} className={styles.iconImg}/><p className={styles.iconTitle}>{item.title}</p>
            </div>
        )
    })

    /* watchout logo */
    const embedLogo = require("./images/embedLogo.svg");

    /* display content */
    let mainContent;
    switch(view){
        case 'issues':
          mainContent = <EmbedIssues />
          break;
        case 'parties':
          mainContent = <EmbedParties />
        break;

    }

    return (
      <div className={`${styles.wrap} ${styles[view]}`}>
          <div className={`${styles.contentWrap}`}>
                <div className={styles.embedSection}>
                    <img src={embedLogo} className={styles.embedImg}/>
                    <nav className={styles.navWrap}>
                          {viewItems}
                    </nav>
                </div>
                {mainContent}
           </div>
      </div>
    );
  }
}
@connect(
    state => ({ issues: state.issues }),
    dispatch => bindActionCreators({}, dispatch))
class EmbedIssues extends Component {
    render(){
        const styles = require('./Embed.scss');
        const {issues} = this.props;

        const missionImg = require("./images/VideoTitles_mission.svg");
        const flyingImg = require("./images/flying-inverse.png");
        const goImg = require("./images/go-mission.svg");

        return (
          <div className={styles.initialWrap}>
              <img src={flyingImg} className={styles.flyingImg} />
              <img src={goImg} className={styles.goImg} />
              <div className={styles.container}>
                  <MaXiCastle embed={true}/>
                  <Missions issues={issues}
                            showComingMission={true}
                            embed={true}/>
              </div>
          </div>
        )
    }
}
class EmbedParties extends Component {
    render(){
        const styles = require('./Embed.scss');
        const goImg = require("./images/go-challenge.svg");
        return (
          <div className={styles.initialWrap}>
          <img src={goImg} className={styles.goImg} />
              <div className={styles.story}>
                <p>黨團衝突戰，將由各地勇者所組成不同的黨團，以團體戰的方式爭奪立法聖殿中的勇者席位。在這場團體戰鬥中，誰能爭取最多席位，同樣考驗島嶼主人的智慧。</p>
                <p>挑戰任務即刻啟動！</p>
              </div>
              <div className={styles.actions}>
                  <a href='//wevote.tw/parties-game/'
                     target='_blank'
                     className={styles.goMatch}>進入挑戰</a>
              </div>
          </div>

        )
    }
}
