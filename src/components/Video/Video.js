import React, {Component} from 'react';
import moment from 'moment';


export default class Video extends Component {
  constructor(props){ super(props)
    this.state = {
      playVideo: false
    }
  } 
  _handlePlay(){
    console.log("play video")
    this.setState({
      playVideo: !this.state.playVideo
    })
  }
  render() {
  	const styles = require('./Video.scss');
    
    // Background Video
    const bgVideoUrl = "http://soidid.github.io/video-test/index.mp4";
    const finalVote = moment([2016, 0, 16]);
    const now = moment();
    const diff = finalVote.diff(now, 'days');


    // Playing Video
    const {playVideo} = this.state;
    const youtubeId = "5dSckWGmybo";
    const bgYoutubeURL = `http://youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&autohide=1&rel=0`;
    const youtubeURL = `http://youtube.com/embed/${youtubeId}?autoplay=1&showinfo=0&rel=0&playlist=${youtubeId}`;
    
    let playingFullScreen = (playVideo === true) ? (
        <div className={styles.playingSection }>
            <div className={styles.close}
                 onClick={this._handlePlay.bind(this)}>
                <i className="fa fa-times"></i>
                <div className={styles.closeText}>關閉影片</div>
            </div>
            <div className={styles.iframWrap}>
                <iframe frameborder="0" height="100%" width="100%" 
                        src={youtubeURL}>
                </iframe>
            </div>
        </div>):"";

    return (
        <div className={styles.videoWrap}>
      	    {playingFullScreen}

            <div className={styles.bgIframWrap}>
                <iframe frameborder="0" height="100%" width="100%" 
                        src={bgYoutubeURL}>
                </iframe>
            </div>

            <div className={styles.videoFilter}></div>
            <div className={styles.videoText}>
                <div className={styles.videoTitle}>
                    <div>立委勇者大選還有{diff}天</div>
                    <div>你還沒準備好嗎？</div>
                    <div className={styles.playButton}
                         onClick={this._handlePlay.bind(this)}>
                         <i className="fa fa-play-circle-o"></i></div>
                </div>
            </div>
        </div>
    );
  }




}
