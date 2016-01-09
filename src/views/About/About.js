import React, {Component} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import Video from '../../components/Video/Video.js';
import FAQ from '../../components/FAQ/FAQ.js';

export default class About extends Component {
  render() {
    const styles = require('./About.scss');
    const tabName = this.props.params.tabName || "about";

    let mainContent;
    let metaData = {};
    let title, description;
    switch(tabName){
      case 'about':
          mainContent = <AboutBlock/>;
          
          title = `關於-沃草2016立委出任務`;
          description = `「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委針對議題在立院說了什麽以及表決了什麽。並彙整下任立委候選人針對這些重大議題的立場。我們希望透過整理分析第八屆立委對重大議題的表態立場，提供選民了解候選人的價值理念。 「2016立委出任務」希望能夠做到更多的資訊揭露，改變台灣民主政治。`;
          
          metaData = {
            title: title,
            description: description,
            meta: {
                charSet: 'utf-8',
                property: {
                  'og:title': title,
                  'og:description': description
                }
            }
          };
          break;

      case 'FAQ':
          mainContent = (<div className={styles.content}><FAQ /></div>);
          
          title = `問答-沃草2016立委出任務`;
          description =  `「2016立委出任務」的資料來源、整理方式、議題挑選，以及小編們整理「2016立委出任務」資料的種種血淚。`;
          metaData = {
            title: title,
            description: description,
            meta: {
                charSet: 'utf-8',
                property: {
                  'og:title': title,
                  'og:description': description
                }
            }
          };
          break;

      case 'statement':
          mainContent = <StatementBlock />;
          
          title = `聲明-沃草2016立委出任務`;
          description =  `關於「2016立委出任務」內容資料之著作權聲明。`;
          
          metaData = {
            title: title,
            description: description,
            meta: {
                charSet: 'utf-8',
                property: {
                  'og:title': title,
                  'og:description': description
                }
            }
          };
          break;

      default:
      break;

    }

    let about_title_1 = require('./images/AboutTitle-01.svg');
    let about_title_2 = require('./images/AboutTitle-02.svg');

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <div className={styles.about}>
            <div className={styles.aboutImage}></div>
            <div className={styles.aboutTitle}><img src={about_title_1}/><img src={about_title_2}/></div>
            <ul className={styles.innerTag}>
                <li><Link to={`/about/`} className = { tabName==="about" ? styles.active : ""}>關於</Link></li>
                <li><Link to={`/about/FAQ/`} className = { tabName==="FAQ" ? styles.active : ""}>問答</Link></li>
                <li><Link to={`/about/statement/`} className = { tabName==="statement" ? styles.active : ""}>聲明</Link></li>
            </ul>
          </div>
          {mainContent}
      </div>

    );
  }
}
class AboutBlock extends Component {
  render() {
    const styles = require('./About.scss');
    let roadmapURL = require("./images/roadmap.png");

    return (
        <div className={styles.aboutWrap}>
            <div className={styles.content}>
                <p>在遙遠的海洋之心，有一座美麗的自由之島。</p>
                <p>然而，近年來黑箱迷霧籠罩，邪惡巨獸肆虐，公平正義正在消失，美好家園受到威脅⋯</p>
                <p>這座島嶼，現在急需明智的主人，挑選出最合適的立委勇者，完成許多艱難的議題任務！</p>
                
                <h2>2016年1月16日，四年一次的勇者大選<br/>是改變海島命運最重要的儀式</h2>
                
                <p>過去，每位候選勇者無不使出各種眼花繚亂的技巧贏得你的歡心。華麗的宣傳車、聳動的口號、熱情的握手，但這些到底和一個勇者真正需要的能力屬性有什麼關係？</p>
                
                <h2>現在，有更好的方式選出你需要的勇者！</h2>
                
                <p>阿草打造2016《立委出任務》，精準分析每位勇者的戰績。</p>
                <p>「議題攻城戰」，選議題，看表態。<br/>
                「黨團衝突戰」，配對最適合你的政黨。<br/>
                「勇者競技場」，了解各地候選人的特色。</p>
                
                <h2>現在就是選擇的時刻。</h2>
                <p>你能分辨誰是最能代表自由之島的勇者嗎？<br/>你能改變這個島嶼未來的命運嗎？</p>
                
                <h2>島嶼的主人，一起出任務吧！</h2>   
            </div>
            <div className={styles.roadmap}>
                <div className={`${styles.stage} ${styles.october}`}></div>
                <div className={`${styles.stage} ${styles.november}`}></div>
                <div className={`${styles.stage} ${styles.december}`}></div>
                <div className={`${styles.stage} ${styles.january}`}></div>
            </div>
            <Video />
        </div>
    )
  }
}
class StatementBlock extends Component {
  render() {
    const styles = require('./About.scss');
    let ccBadge = require('./images/cc.svg');
    return (
      <div className={styles.content}>
          <div className={styles.licenseBlock}>
              <img src={ccBadge}
                   className={styles.licenseImg} />
              <p>如非特別註明，本站資料及原始碼統一採用
                  <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                    arget="_blank"
                    className={`${styles.ia} ${styles.bright}`}>創用CC姓名標示─非商業性─相同方式分享4.0國際授權條款</a>釋出。</p>
              <p>注意：</p>
              <ol>
                <li>從立法院網站來源的資料，如立委照片、公報內容等，必須在遵守立法院的
                  <a href="http://www.ly.gov.tw/14_others/copyright.jsp"
                    target="_blank"
                    className={`${styles.ia} ${styles.bright}`}>著作權規範</a>之下取用。</li>
                <li>如果在著作權方面有疑慮、建議或是想取得更進一步授權，請來信wevote@watchout.tw。</li>
              </ol>
              <p>特別感謝
                <a href="http://wytype.com/typeface/earlier/"
                   target="_blank"
                   className={`${styles.ia} ${styles.bright}`}>Typeland《隸辨隸書體》</a>
                   作者厉向晨讓我們在這個網站的圖像創作中自由使用《隸辨隸書體》。</p>
              <p>特別感謝
                <a href="https://tapcpr.wordpress.com/"
                   target="_blank"
                   className={`${styles.ia} ${styles.bright}`}>伴侶盟</a>協助提供立委參選人聯絡資訊。</p>
          </div>
      </div>
    )
  }
}
