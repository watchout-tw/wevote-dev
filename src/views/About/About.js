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
          <h2>2016，有感投票，為你關心的議題投下一票。</h2>
          <p>這一票，選立委，決定誰能代表台灣人民的最高民意。這一票，決定未來四年每一條法律、每一筆預算，以及台灣人民的未來。</p>
          <p>每四年一次的立委選舉，就像是立委的大型求職博覽會，但身為頭家的人民，卻從來沒看過這些候選人的完整履歷。除了競選標語、宣傳車和那一次又一次的握手，你還能怎麼了解這些立委候選人？</p>
          <h2>現在，你可以有更好的方式了解他們。</h2>
          <p>沃草堅持「降低公民參與政治門檻」的初衷，推出「2016立委求職中」，這是一個提供選民了解立委候選人議題表態的網站。我們與許多NGO協力整理過去第八屆立委在立法院中對各重大議題的提案質詢表決，分析出立委及政黨的表態立場；我們也將陸續整理各候選人對相關議題的態度、對推動法案的承諾，提供選民了解候選人的價值理念。</p>
          <p>我們相信，資訊越充足，越能幫助選民在投票時做出正確的判斷。
            我們相信，更多的資訊揭露，更好的選舉文化，將是改變台灣民主政治的關鍵因素。</p>
          <h2>投票一定有風險，立委表現有好有壞，投票前請詳閱「立委求職中」</h2>
          <h2>We vote, we care.</h2>
      </div>  
    );
    let FAQBlock = (
      <div className={styles.content}>
          <FAQ />
      </div>  
    );
    let termsBlock = (
      <div className={styles.content}>
          <div className={styles.licenseBlock}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Cc-by-nc-sa_euro_icon.svg/1024px-Cc-by-nc-sa_euro_icon.svg.png"
               className={styles.licenseImg} />
          <p>如非特別註名，本站內容統一採用<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                                          target="_blank"
                                          className={styles.link}>創用 CC 姓名標示─非商業性─相同方式分享 4.0 國際 授權條款</a>釋出。</p>
          <p>需要注意部分如下：</p>
          <ol>
            <li>從立法院網站來源的資料，如立委照片、公報內容等，必須在遵守立法院的<a href="http://www.ly.gov.tw/14_others/copyright.jsp"
                                                                             target="_blank"
                                                                             className={styles.link}>著作權規範</a>之下取用。</li>
            <li>如果在著作權方面有疑慮、建議或是想取得更進一步授權，請來信 wevote@watchout.tw 。</li>
          </ol>
          </div>
      </div>  
    );

    let metaData = {};
    
    switch(tabName){

      case 'FAQ':
          mainContent = FAQBlock;
          metaData = {
            title: `資料來源說明-立委求職中-2016立委投票資訊站`,
            description: `關於「2016立委求職中」內容資料之著作權聲明。`,
            meta: {
                charSet: 'utf-8',
                property: {
                  'og:title': `資料來源說明-立委求職中-2016立委投票資訊站`,
                  'og:description': `關於「2016立委求職中」內容資料之著作權聲明。`
                }
            }
          };
          break;
      
      case 'statement':
          mainContent = termsBlock;
          metaData = {
            title: `著作權聲明-立委求職中-2016立委投票資訊站`,
            description: `關於「2016立委求職中」內容資料之著作權聲明。`,
            meta: {
                charSet: 'utf-8',
                property: {
                  'og:title': `著作權聲明-立委求職中-2016立委投票資訊站`,
                  'og:description': `關於「2016立委求職中」內容資料之著作權聲明。`
                }
            }
          };
          break;
      
      default: 
          mainContent = aboutBlock;
          metaData = {
            title: `關於立委求職中-立委求職中-2016立委投票資訊站`,
            description: `「2016立委求職中」是一個提供選民了解立委候選人議題表態的網站。我們整理分析第八屆立委對重大議題的表態立場，提供選民了解候選人的價值理念。 「2016立委求職中」希望能夠做到更多的資訊揭露，改變台灣民主政治。`,
            meta: {
                charSet: 'utf-8',
                property: {
                  'og:title': `關於立委求職中-立委求職中-2016立委投票資訊站`,
                  'og:description': `「2016立委求職中」是一個提供選民了解立委候選人議題表態的網站。我們整理分析第八屆立委對重大議題的表態立場，提供選民了解候選人的價值理念。 「2016立委求職中」希望能夠做到更多的資訊揭露，改變台灣民主政治。`
                }
            }
          };
          break;

    }

    

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <div className={styles.about}>
              <h1 className={styles.title}>關於我們</h1>
              <ul className={styles.innerTag}>
                  <li><Link to={`/about`} className = { tabName==="about" ? styles.active : ""}>關於立委求職中</Link></li>
                  <li><Link to={`/about/FAQ`} className = { tabName==="FAQ" ? styles.active : ""}>資料來源說明</Link></li>
                  <li><Link to={`/about/statement`} className = { tabName==="statement" ? styles.active : ""}>著作權聲明</Link></li>
              </ul>
          </div>
          {mainContent}
      </div>
  
    );
  }
}
