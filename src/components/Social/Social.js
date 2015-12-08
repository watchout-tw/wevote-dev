import React, {Component} from 'react';
export default class Social extends Component {
  componentDidMount(){
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '1640384482880194',
          xfbml      : true,
          version    : 'v2.5'
        });
    };

   (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/zh_TW/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  }
  _onShare(){
    
    FB.ui({
        method: 'share',
        href: window.location.href,
    }, function(response){});

  }
  _onMessenger(){
    FB.ui({
        method: 'sned',
        href: window.location.href
    }, function(response){});

    FB.ui({
      method: 'send',
      name: '沃草！立委出任務',
      link: window.location.href
    });
  }
  _onLine(){
    
    let title = "【沃草！立委出任務 - 2016立委投票攻略】";
    let des = "2016立委選舉票該投給誰？「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委與下任候選人立場，並分析政黨對於議題表態和優先法案的未來承諾。想了解你的選區立委嗎？想知道政黨票怎麼投嗎？請上「立委出任務」！";
    let website = "http://wevote.tw";
    let url = "http://line.naver.jp/R/msg/text/" + encodeURI(title) + encodeURI(des) + encodeURI(url);
    window.open(url);

  }
 
  render() {
  	const styles = require('./Social.scss');
    const fshareImg = require('./images/facebook.png');
    const mshareImg = require('./images/messenger.png');
    const lineImg = require('./images/line.png');
    return (
        <div className={styles.socialWrap}>
          <p className={styles.urgentText}>戰況緊急<br/>揪團參戰</p>
          <p className={styles.shareText}>按這裡分享</p>

          <img className={styles.shareIcon}
               src={fshareImg}
               onClick={this._onShare.bind(this)} />
          <img className={styles.shareIcon}
               src={mshareImg}
               onClick={this._onMessenger.bind(this)} />
          
          <img className={styles.shareIcon}
               src={lineImg}
               onClick={this._onLine.bind(this)} />
          
          
              
        
          <a className={styles.watchoutLogo} href="https://www.facebook.com/WatchOutTW" target="_blank"></a>

          <div id="fb-root"></div>
        </div>
    );
  }
}
