import React, {Component} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

export default class Wanted extends Component {
  render() {
    const styles = require('./Wanted.scss');
    const title = `協尋立委-沃草2016立委出任務`;
    const description = `協助我們聯繫立委參選人`;
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
             <p>協助我們尋找失落的候選人！</p>
             <p>請來信 wevote@watchout.tw 並附上您的說明與聯絡資料，我們將會與您聯繫。</p>
          </div>
          
      </div>
  
    );
  }
}
