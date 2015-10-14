import React, {Component} from 'react';
import moment from 'moment';


export default class Video extends Component {
  constructor(props){ super(props)
    this.state = {
      playVideo: false,
      mode: ""
    }
  }
  _handlePlay(){
    console.log("play video")
    this.setState({
      playVideo: !this.state.playVideo
    })
  }
  componentDidMount(){
    this._handleResize();
    window.addEventListener('resize', this._handleResize.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this._handleResize.bind(this));
  }
  _handleResize(){
      const {mode} = this.state;
      if((window.innerWidth >= 720)&&(mode!=="web")){
          this.setState({
            mode: "web"
          })
      }
      if((window.innerWidth < 720)&&(mode!=="mobile")){
          this.setState({
            mode: "mobile"
          })
      }

  }
  //bgFileName: "./images/bg-small.gif"
  render() {
  	const styles = require('./Video.scss');
    const {mode} = this.state;
   

    // Background GIF
    let bgImg;
    if(mode === "mobile") bgImg = require("./images/bg_small.gif");
    if(mode === "web") bgImg = require("./images/bg_large.gif");

    const finalVote = moment([2016, 0, 16]);
    const now = moment();
    const diff = finalVote.diff(now, 'days');


    // Playing Video
    const {playVideo} = this.state;
    const youtubeId = "sxmD7gj4eIU";
    const youtubeURL = `http://youtube.com/embed/${youtubeId}?autoplay=1&showinfo=0&rel=0&playlist=${youtubeId}`;

    let playingFullScreen = (playVideo === true) ? (
        <div className={styles.playingSection }>
            <div className={styles.close}
                 onClick={this._handlePlay.bind(this)}>
                <i className="fa fa-times"></i>
                <div className={styles.closeText}>關閉影片</div>
            </div>
            <div className={styles.iframWrap}>
                <iframe frameBorder="0" height="100%" width="100%"
                        src={youtubeURL}>
                </iframe>
            </div>
        </div>):"";


    //title
    const title = require("./images/VideoTitles_main.svg");
    const diffTens = Math.floor(diff/10);
    const diffOnes = diff%10;
    const diffTensImg = require(`./images/counter_${diffTens}.svg`);
    const diffOnesImg = require(`./images/counter_${diffOnes}.svg`);
    const storyBeginsHereImg = require("./images/VideoTitles_video.svg");
    const missionImg = require("./images/VideoTitles_mission.svg");
    return (
        <div className={styles.bgWrap}>
      	    {playingFullScreen}

            <img className={styles.bgGif}
                 src={bgImg} />

            <div className={styles.coverTextBlock}>
                <div className={styles.coverTitle}>
                    <img src={title}
                         className={styles.coverTitleMain}/>
                    <img src={diffTensImg}
                         className={styles.diffTensImg} />
                    <img src={diffOnesImg}
                         className={styles.diffOnesImg} />
                </div>
                <div className={styles.actions}>
                  <img src={storyBeginsHereImg}
                       className={styles.storyBeginsHereImg}
                       onClick={this._handlePlay.bind(this)} />
                  <img src={missionImg}
                       className={styles.missionImg}/>
                </div>
            </div>
        </div>
    );
  }




}
