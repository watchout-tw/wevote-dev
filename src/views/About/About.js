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
          <h2>使用條款</h2>
          <p>依據個資法，關於個人資料蒐集、處理及利用聲明： 使用本電子報訂閱視為瞭解及同意沃草公司進行您個人資料（email資訊）之蒐集、處理及利用，除非取得您的同意或其他法令之特別規定，絕不會將您的個人資料提供給第三方或使用於電子報訂閱以外之其它用途。您隨時可來信取消此訂閱服務，經取消訂閱後，相關資料立即從訂閱資料庫中刪除。</p>
      </div>  
    );


    switch(tabName){

      case 'FAQ':
          mainContent = FAQBlock;
          break;
      
      case 'terms':
          mainContent = termsBlock;
          break;
      
      default: 
          mainContent = aboutBlock;
          break;

    }
    return (
      <div className={styles.wrap}>
          <DocumentMeta title="關於我們"/>
          <div className={styles.about}>
              <h1 className={styles.title}>關於我們</h1>
              <ul className={styles.innerTag}>
                  <li><Link to={`/about`} className = { tabName==="about" ? styles.active : ""}>關於立委求職中</Link></li>
                  <li><Link to={`/about/FAQ`} className = { tabName==="FAQ" ? styles.active : ""}>資料來源說明</Link></li>
                  <li><Link to={`/about/terms`} className = { tabName==="terms" ? styles.active : ""}>使用條款</Link></li>
              </ul>
          </div>
          {mainContent}
      </div>
  
    );
  }
}
