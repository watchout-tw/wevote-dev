import React, {Component} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

export default class Clarify extends Component {
  render() {
    const styles = require('./Clarify.scss');
    const title = `立委澄清-沃草2016立委出任務`;
    const description = `在「2016立委出任務」發現資料錯誤或缺漏嗎？請來信附上您的說明與聯絡資料。我們將會與您聯繫。`;
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
