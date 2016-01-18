import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');

    const title = "沃草！立委出任務 - 2016立委投票攻略";
    const description = "2016立委選舉票該投給誰？「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委與下任候選人立場，並分析政黨對於議題表態和優先法案的未來承諾。想了解你的選區立委嗎？想知道政黨票怎麼投嗎？請上「立委出任務」！";
    const metaData = {
      title: title,
      description: description,
      meta: {
        charSet: 'utf-8',
        'og:title': title,
        'og:description': description,
        'og:type' : 'website'
      }
    };

    // http://stackoverflow.com/questions/16484884/how-do-i-get-the-how-many-days-until-my-next-birthday
    // var diffDays=(function(){
    //   var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    //   var secondDate = new Date(2016,0,16);
    //   var firstDate = new Date();
    //   return Math.ceil(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    // })();
    // if(diffDays > 42) diffDays = 42;
    // else if(diffDays < 0) diffDays = 0;
    //let countdown = require(`./images/countdown/countdown_${diffDays}.svg`);
    let countdown = require(`./images/countdown/countdown_after.svg`);

    let stonehenge = require('./images/stonehenge.png');
    let stargate = require('./images/stargate.png');

    let mountain = require('./images/mountain.png');
    let field = require('./images/field.png');
    let coliseum = require('./images/coliseum.png');

    let labels = require('./images/labels.svg');

    return (
      <div className={styles.home}>
          <DocumentMeta {...metaData}/>

          <div className={styles.innerWrap}>

              <div className={styles.invisible}>
                <Link to={`/404`}>404</Link>
                <Link to={`/8th-legislators`}>8th-legislators</Link>
                <Link to ={`/9th-candidates`}>/9th-candidates</Link>
                <Link to={`/embed`}>embed</Link>
              </div>

              <img src={countdown} className={styles.countdown}/>

              <img src={stonehenge} className={styles.stonehenge}/>
              <div className={styles.sky}>
                <Link className={styles.stargate} to={`/issues/`}>
                  <img src={mountain} className={styles.destination}/>
                  <img src={stargate} className={styles.glow}/>
                  <div className={styles.label_issues}></div>
                </Link>
                <Link className={styles.stargate} to={`/parties/`}>
                  <img src={field} className={styles.destination}/>
                  <img src={stargate} className={styles.glow}/>
                  <div className={styles.label_parties}></div>
                </Link>
                <Link className={styles.stargate} to={`/constituencies/`}>
                  <img src={coliseum} className={styles.destination}/>
                  <img src={stargate} className={styles.glow}/>
                  <div className={styles.label_constituencies}></div>
                </Link>
              </div>

          </div>
      </div>
    );
  }
}
