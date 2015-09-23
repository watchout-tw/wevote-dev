import React, {Component} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

export default class Subscribe extends Component {
  render() {
    const styles = require('./Subscribe.scss');
    const {state} = this.props.params || "error";
    
    let content;
    if(state === "succeed"){
        content = <div className={styles.text}>訂閱成功！</div>
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
