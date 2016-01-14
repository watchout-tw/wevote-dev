import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import classnames from 'classnames';

import MaXiCastle from '../../components/MaXiCastle/MaXiCastle.js';
import Missions from '../../components/Missions/Missions.js';
import DistrictSelector from '../../components/DistrictSelector/DistrictSelector.js';

import getData from '../../data/getData';
const {issues} = getData();

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
    },
    {
      id: 'constituencies',
      title: '勇者競技場'
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

        case 'constituencies':
          mainContent = <EmbedConstituencies />
        break;

    }

    return (
      <div className={`${styles.wrap} ${styles[view]}`}>
          <div className={`${styles.contentWrap}`}>
                <div className={styles.embedSection}>
                    <a href='//wevote.tw'
                       target='_blank'><img src={embedLogo} className={styles.embedImg}/></a>
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
class EmbedIssues extends Component {
    render(){
        const styles = require('./Embed.scss');
        const missionImg = require("./images/VideoTitles_mission.svg");
        const flyingImg = require("./images/flying-inverse.png");
        const goImg = require("./images/go-mission.svg");

        return (
          <div className={styles.initialWrap}>
              <img src={flyingImg} className={styles.flyingImg} />
              <img src={goImg} className={styles.goImg} />
              <div className={styles.container}>
                  <Missions showComingMission={false}
                            embed={true}
                            shipmentsType={"2"}/>
                  <MaXiCastle embed={true}/>
                  <Missions showComingMission={false}
                            embed={true}
                            shipmentsType={"1"}/>
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
              <div className={`${styles.story} ${styles.dark}`}>
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
class EmbedConstituencies extends Component {
    render(){
        const styles = require('./Embed.scss');
        const goImg = require("./images/go-challenge.svg");
        return (
          <div className={styles.initialWrap}>
              <img src={goImg} className={styles.goImg} />
              <div className={`${styles.story} ${styles.light}`}>
                <p>勇者競技場，全島分成七十五個不同區域。勇者將在每區競技場裡競逐爭取島民們的信任，取得在立法聖殿中代表島民意志的機會。</p>
                <p>誰能勝出？由島嶼主人的你來決定！</p>
                <p>⬇︎⬇︎⬇︎請選擇你想觀戰的競技場⬇︎⬇︎⬇︎</p>
              </div>
              <div className={styles.districtSelector}>
                <DistrictSelector embed={true}/>
              </div>
          </div>

        )
    }
}
