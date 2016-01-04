import React, {Component} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

export default class Wanted extends Component {
  render() {
    const styles = require('./Wanted.scss');
    const title = `協尋失蹤候選人-沃草2016立委出任務`;
    const description = `協尋三密技，下載傳送提醒候選人回覆表態承諾書，候選人不失蹤，投票攻略群眾協力！`;
    const metaData = {
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

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <div className={styles.about}>
              <h1 className={styles.title}>協尋立委</h1> 
          </div>
          <div className={styles.content}>
              <p>你選區的立委候選人失蹤了嗎？</p>
              <p>關於你關心議題的立場，候選人還沒回覆嗎？</p>
              <p>你出一分力，協尋失蹤候選人，讓資訊更完整，改變選舉文化。</p>
  
              <h2>協尋三密技：</h2>
              <ol>
                <li>下載：下載<a className={`${styles.ia} ${styles.bright}`} 
                                href="/files/form.pdf" target="_blank">表態承諾書</a></li>
                <li>傳送：傳送表態承諾書到候選人FB或傳真，
                    <a href="https://docs.google.com/spreadsheets/d/1FAuauUYh1EFtpTnUpn3SMburgolD93QST5je05cYxY4/edit#gid=0"
                       target="_blank"
                       className={`${styles.ia} ${styles.bright}`} >候選人聯絡表</a></li>
                <li>提醒：打電話貼心提醒候選人回覆表態承諾書</li>
              </ol>
              <p><Link className={`${styles.ia} ${styles.bright}`} 
                       to={`/about/FAQ/`}>我們是如何蒐集資料的？</Link></p>
          </div>
          
      </div>
  
    );
  }
}
