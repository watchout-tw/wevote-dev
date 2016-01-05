import React, {Component} from 'react';
import {Link} from 'react-router';
import SubscribeComponent from '../../components/SubscribeComponent/SubscribeComponent.js'

export default class Footer extends Component {
  render() {

    const styles = require('./Footer.scss');

    let SaySomething = require('./images/SaySomething.svg');

    return (
      <div className={styles.wrap} id="footer">
          <div className={styles.innerWrap}>
              <div className={styles.say}>
                <img src={SaySomething}/>
                  <div className={styles.welcome}>歡迎<b>政黨</b>及<b>區域立委參選人</b>針對我們列出的重大議題表態回覆！</div>
                  <div className={styles.links}>
                    <div><a className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`}
                            href={`/files/form.pdf`}>下載表態承諾書</a></div>
                    <div><Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`}
                      to={`/about/FAQ/`}>我們是如何蒐集資料的？</Link></div>
                  </div>
              </div>
              <SubscribeComponent showExternal={true}/>
              <div className={styles.rightFooterLinks}>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/about/`}>關於立委出任務</Link>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/about/FAQ/`}>資料來源說明</Link>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/about/statement/`}>著作權聲明</Link>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/clarify/`}>立委澄清</Link>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/wanted/`}>協尋立委</Link>
                <Link className={`${styles.linkItem} ${styles.ia} ${styles.inverted}`} to={`/`}>回首頁</Link>
              </div>
          </div>
      </div>
    );
  }
}
