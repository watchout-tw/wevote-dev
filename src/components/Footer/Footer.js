import React, {Component} from 'react';
import {Link} from 'react-router';
import SubscribeComponent from '../../components/SubscribeComponent/SubscribeComponent.js'

export default class Footer extends Component {
  render() {

    const styles = require('./Footer.scss');
    return (
      <div className={styles.wrap}>
          <div className={styles.innerWrap}>
              <div>
                   歡迎政黨及候選人針對本網站之重大議題進行表態回覆！
                   <a className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} 
                      href="//wevote.tw/form.pdf">表單下載</a>/
                   <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} 
                         to={`/about/FAQ`}>我們是如何收集資料的</Link>
              </div>
              <SubscribeComponent showExternal={true}/>
              <div className={styles.rightFooterLinks}>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/about/`}>關於立委出任務</Link>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/about/FAQ`}>資料來源說明</Link>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/about/statement`}>著作權聲明</Link>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/clarify`}>立委澄清</Link>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/`}>回首頁</Link>
              </div>
          </div>
      </div>
    );
  }
}

