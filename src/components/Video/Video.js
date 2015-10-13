import React, {Component} from 'react';
import moment from 'moment';


export default class Video extends Component {
  constructor(props){ super(props)
    this.state = {
      playVideo: false,
      mode: "mobile"
    }
  } 
  _handlePlay(){
    console.log("play video")
    this.setState({
      playVideo: !this.state.playVideo
    })
  }
  componentDidMount(){
    console.log("componentDidMount")
    this._handleResize();
    window.addEventListener('resize', this._handleResize.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this._handleResize.bind(this));
  }
  _handleResize(){
      const {mode} = this.state;
      if((window.innerWidth >= 720)&&(mode==="mobile")){
          this.setState({
            mode: "web"
          })
      }
      if((window.innerWidth < 720)&&(mode==="web")){
          this.setState({
            mode: "mobile"
          }) 
      }
      console.log("after handle resize")
      console.log(this.state)
  }
  //bgFileName: "./images/bg-small.gif"
  render() {
  	const styles = require('./Video.scss');
    const {mode} = this.state;
    console.log(mode)
    
    // Background GIF
    let bgImg = (mode === "mobile") ? require("./images/bg_small.gif") : require("./images/bg_large.gif")
    
    const finalVote = moment([2016, 0, 16]);
    const now = moment();
    const diff = finalVote.diff(now, 'days');


    // Playing Video
    const {playVideo} = this.state;
    const youtubeId = "5dSckWGmybo";
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

    return (
        <div className={styles.bgWrap}>
      	    {playingFullScreen}

            <img className={styles.bgGif}
                 src={bgImg} />
           
            <div className={styles.coverText}>
                <div className={styles.coverTitle}>
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
