import React, {Component} from 'react';
import {Link} from 'react-router';

export default class SubscribeState extends Component {
  render() {
    const styles = require('./SubscribeState.scss');
    const {state} = this.props.params || "error";
    
    let content;
    if(state === "succeed"){
        let imageUrl = require("./images/succeed.png")
        content = 
        <div>
          <div className={styles.title}>恭喜訂閱成功！</div>
          <img src={imageUrl} className={styles.img} />
          <div className={styles.meta}>關於立委勇者的獨家任務攻略，<br/>阿草將會搶先飛鴿傳書給您～ </div>
        </div>
    }else{//error
        content = <div className={styles.text}>訂閱失敗。<br/>如果您持續遭遇此問題，請與我們聯繫：wevote@watchout.tw</div>
    }

    return (
      <div className={styles.wrap}>
          <div className={`${styles.message}`}>
             {content}
             <Link to={`/`} className={styles.link}>回首頁</Link>
          </div>
      </div>
  
    );
  }
}
