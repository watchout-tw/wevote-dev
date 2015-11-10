import React, {Component} from 'react';
import {Link} from 'react-router';
import SubscribeComponent from '../../components/SubscribeComponent/SubscribeComponent.js'

export default class Footer extends Component {
  render() {

    const styles = require('./Footer.scss');
    return (
      <div className={styles.wrap}>
          <div className={styles.innerWrap}>
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

