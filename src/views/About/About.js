import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

export default class About extends Component {
  render() {
    const styles = require('./About.scss');
    return (
      <div className={styles.about}>
              <h1 className={styles.title}>關於我們</h1>
              <ul className={styles.innerTag}>
                  <li><a >關於立委求職中</a></li>
                  <li><a >資料來源說明</a></li>
                  <li><a >著作權聲明</a></li>
              </ul>
      </div>
  
    );
  }
}
