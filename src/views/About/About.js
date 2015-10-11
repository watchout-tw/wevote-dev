import React, {Component} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import FAQ from '../../components/FAQ/FAQ.js';

export default class About extends Component {
  render() {
    const styles = require('./About.scss');
    const tabName = this.props.params.tabName || "about";

    let mainContent;

    let aboutBlock = (
      <div className={styles.content}>

<p>在遙遠的海洋之心，有一座美麗的自由之島。</p>
<p>然而，近年來黑箱迷霧籠罩，邪惡巨獸肆虐，公平正義正在消失，美好家園受到威脅⋯</p>
<p>這座島嶼，現在急需明智的主人，挑選出最合適的立委勇者，完成許多艱難的議題任務！</p>

<h2>2016年1月16日，四年一次的勇者大選<br/>是改變海島命運最重要的儀式</h2>

<p>過去，每位候選勇者無不使出各種眼花繚亂的技巧贏得你的歡心。華麗的宣傳車、聳動的口號、熱情的握手，但這些到底和一個勇者真正需要的能力屬性有什麼關係？</p>

<h2>現在，有更好的方式選出你需要的勇者！</h2>

<p>阿草打造2016《立委出任務》，精準分析每位勇者的戰績。</p>
<p>我們將解讀過去四年立委勇者的戰鬥紀錄，分析各個勇者陣營的特色，之後也將蒐集每位候選勇者對議題任務的戰鬥傾向，提供你勇者大選最好的攻略解析！</p>

<h2>現在就是選擇的時刻。</h2>
<p>你能分辨誰是最能代表自由之島的勇者嗎？<br/>你能改變這個島嶼未來的命運嗎？</p>

<h2>島嶼的主人，一起出任務吧！</h2>

      </div>
    );
    let FAQBlock = (
      <div className={styles.content}>
          <FAQ />
      </div>
    );
    //https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Cc-by-nc-sa_euro_icon.svg/1024px-Cc-by-nc-sa_euro_icon.svg.png
    let ccBadge = require('./images/cc.svg');
    let termsBlock = (
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
          </div>
      </div>
    );

    let metaData = {};

    switch(tabName){

      case 'FAQ':
          mainContent = FAQBlock;
          metaData = {
            title: `資料來源說明-2016立委出任務-2016立委投票資訊站`,
            description: `「2016立委出任務」的資料來源、整理方式、議題挑選，以及小編們整理「2016立委出任務」資料的種種血淚。`,
            meta: {
                charSet: 'utf-8',
                property: {
                  'og:title': `資料來源說明-2016立委出任務-2016立委投票資訊站`,
                  'og:description': `「2016立委出任務」的資料來源、整理方式、議題挑選，以及小編們整理「2016立委出任務」資料的種種血淚。`
                }
            }
          };
          break;

      case 'statement':
          mainContent = termsBlock;
          metaData = {
            title: `著作權聲明-2016立委出任務-2016立委投票資訊站`,
            description: `關於「2016立委出任務」內容資料之著作權聲明。`,
            meta: {
                charSet: 'utf-8',
                property: {
                  'og:title': `著作權聲明-2016立委出任務-2016立委投票資訊站`,
                  'og:description': `關於「2016立委出任務」內容資料之著作權聲明。`
                }
            }
          };
          break;

      default:
          mainContent = aboutBlock;
          metaData = {
            title: `關於立委出任務-2016立委出任務-2016立委投票資訊站`,
            description: `「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委針對議題在立院說了什麽以及表決了什麽。並彙整下任立委候選人針對這些重大議題的立場。我們希望透過整理分析第八屆立委對重大議題的表態立場，提供選民了解候選人的價值理念。 「2016立委出任務」希望能夠做到更多的資訊揭露，改變台灣民主政治。`,
            meta: {
                charSet: 'utf-8',
                property: {
                  'og:title': `關於立委出任務-2016立委出任務-2016立委投票資訊站`,
                  'og:description': `「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委針對議題在立院說了什麽以及表決了什麽。並彙整下任立委候選人針對這些重大議題的立場。我們希望透過整理分析第八屆立委對重大議題的表態立場，提供選民了解候選人的價值理念。 「2016立委出任務」希望能夠做到更多的資訊揭露，改變台灣民主政治。`
                }
            }
          };
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
                <li><Link to={`/about`} className = { tabName==="about" ? styles.active : ""}>關於</Link></li>
                <li><Link to={`/about/FAQ`} className = { tabName==="FAQ" ? styles.active : ""}>問答</Link></li>
                <li><Link to={`/about/statement`} className = { tabName==="statement" ? styles.active : ""}>聲明</Link></li>
            </ul>
          </div>
          {mainContent}
      </div>

    );
  }
}
