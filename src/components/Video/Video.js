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
    //"http://soidid.github.io/video-test/index.mp4";
    const bgVideoUrl = "https://fbcdn-video-l-a.akamaihd.net/hvideo-ak-xtp1/v/t43.1792-2/11832368_493615154130036_2137710266_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MjE1NywidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=561&oh=0fabba535fc8af06998453784e9425f0&oe=561A6F52&__gda__=1444573921_f1b857f0e6ba26a546df0f021e81ea18";
    const finalVote = moment([2016, 0, 16]);
    const now = moment();
    const diff = finalVote.diff(now, 'days');


    // Playing Video
    const {playVideo} = this.state;
    const youtubeId = "J8RpjWzCMmY";
    const youtubeURL = `http://youtube.com/embed/${youtubeId}?autoplay=1&controls=0&showinfo=0&autohide=1&rel=0`;
    
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

            <video id="videobcg" preload="auto" autoPlay="true" loop="loop" muted="muted" volume="0"
                   className={styles.videobcg}>
                <source src={bgVideoUrl} type="video/mp4" />
               
                Sorry, your browser does not support HTML5 video.
            </video>

            <div className={styles.videoFilter}></div>
            <div className={styles.videoText}>
                <div className={styles.videoTitle}>
                    <div>立委勇者大選還有{diff}天</div>
                    <div>你還沒準備好嗎？</div>
                    <div className={styles.playButton}
                         onClick={this._handlePlay.bind(this)}>播放影片</div>
                </div>
            </div>
        </div>
    );
  }




}
