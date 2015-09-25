import React, {Component} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

export default class Clarify extends Component {
  render() {
    const styles = require('./Clarify.scss');
   
    const metaData = {
      title: `立委澄清-立委出任務-2016立委投票資訊站`,
      description: `在「2016立委出任務」發現資料錯誤或缺漏嗎？請來信附上您的說明與聯絡資料。我們將會與您聯繫。`,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': `立委澄清-立委出任務-2016立委投票資訊站`,
            'og:description': `在「2016立委出任務」發現資料錯誤或缺漏嗎？請來信附上您的說明與聯絡資料。我們將會與您聯繫。`
          }
      }
    };
    

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <div className={styles.about}>
              <h1 className={styles.title}>立委澄清</h1> 
          </div>
          <div className={styles.content}>
             <p>在「2016立委出任務」發現資料錯誤或缺漏嗎？</p>
             <p>請來信 wevote@watchout.tw 並附上您的說明與聯絡資料，我們將會與您聯繫。</p>
          </div>
          
      </div>
  
    );
  }
}
