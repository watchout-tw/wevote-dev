import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';
import eng2url from '../../utils/eng2url';
import eng2cht from '../../utils/eng2cht';

import getData from '../../data/getData';
const {issues, partyPromises, dataMeta} = getData();

export default class Promises extends Component {
    render(){
      const styles = require('./Promises.scss');
      const {promises, id} = this.props;
      if(!promises){//不是本屆參選人，沒有這樣資料
        return <div></div>
      }

      const {positions, bills, hasReply} = promises;
      
      let postionItems = Object.keys(positions).map((issueName,i)=>{
          let pos = positions[issueName].promise.position;
          let statement = positions[issueName].promise.statement;
          let issueData = issues[eng2url(issueName)];
          return (
              <div className={styles.promiseItem}
                   key={`promiseItem-${id}-${i}`}>
                  <div className={styles.promiseTitle}>{eng2cht(issueName)}</div>
                  <div className={styles.promiseQuestion}>{issueData.question}</div>
                  <div className={styles.promisePos}>
                    <div className={`${styles[pos]} ${styles.promiseIcon}`}></div>
                    <div className={styles.promisePosText}>{handlePartyPos(pos)}</div>
                  </div>
                  <div className={styles.promiseStatement}>{statement}</div>
              </div>
          )
      })
      let billItems = bills.map((value,i)=>{
          let content = value.content;
          if(!content){
              if(!value.goal){
                  //因為有可能只有回覆目標，沒有寫內容描述
                  content = "尚未回覆";
              }
          }
          return (
              <div className={styles.billItem}
                   key={`billItem-${id}-${i}`}>
                  <div className={styles.billItemTitle}>{i+1}・{value.goal}</div>
                  <div>{content}</div>
              </div>
          )
      })
      return (
        <div>
          <div className={styles.sectionTitle}>議題表態</div>
          <div>{(hasReply === true ) ? postionItems : "尚未回覆"}</div>

          <div className={styles.sectionTitle}>優先法案</div>
          <div>{(hasReply === true ) ? billItems  : "尚未回覆"}</div>
          
          <div className={`${styles.promiseMeta}`}>* 統計更新日期：{dataMeta.updateTime}。
                <Link className={`${styles.ia} ${styles.bright}`} 
                      to={`/about/FAQ/`}>我們如何統計的</Link></div>
        </div>
      )
    }
}
function handlePartyPos(value){
  if(value === "none"){
    return "尚未回覆"
  }else{
    return eng2cht(value);
  }
}