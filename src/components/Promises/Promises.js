import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';
import eng2url from '../../utils/eng2url';
import eng2cht from '../../utils/eng2cht';
import promise_eng2cht from '../../utils/promise_eng2cht';

import getData from '../../data/getData';
const {issues, legislators, partyPromises, dataMeta} = getData();

export default class Promises extends Component {
    render(){
      const styles = require('./Promises.scss');
      const {promises, id, isParty} = this.props;
      if(!promises){//不是本屆參選人，沒有這樣資料
        if(isParty){
            return (
              <div className={styles.notCandidates}>
                  我們僅調查有推出<b>全國不分區</b>後選人之政黨的未來承諾。
              </div>
            )

        }else{

            if(legislators[id].name.indexOf("黨團")!==-1){

              return (
                <div className={styles.notCandidates}>
                    我們僅調查<b>區域立委參選人</b>之未來承諾。
                </div>
              )
      
            }else{
              
              return (
                <div className={styles.notCandidates}>
                    我們僅調查<b>區域</b>立委參選人之未來承諾，此立委並非2016<b>區域</b>立委參選人。
                </div>
              )

            }
        }
        
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
                    <div className={`${styles[handlePartyPosEng(pos)]} ${styles.promiseIcon}`}></div>
                    <div className={styles.promisePosText}>{promise_eng2cht(pos)}</div>
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
      });

      let replyStatus = (
        <div>
          <div className={styles.sectionTitle}>議題表態</div>
          <div>{(hasReply === true ) ? postionItems : "尚未回覆"}</div>

          <div className={styles.sectionTitle}>優先法案</div>
          <div>{(hasReply === true ) ? billItems  : "尚未回覆"}</div>
        </div>
      );

      //健保連線特殊回覆      
      if(id === "NHSA"){
         replyStatus = <div className={styles.notice}>健保免費連線回覆表示：「很抱歉，健保免費連線暫時只針對健保議題表示意見，因為我們是政黨連線，協調不易，也不想協調！」</div>
      }

      return (
        <div>
          {replyStatus}
          <div className={`${styles.promiseMeta}`}>* 統計更新日期：{dataMeta.updateTime}。
                <Link className={`${styles.ia} ${styles.bright}`} 
                      to={`/about/FAQ/`}>我們如何統計的</Link></div>
        </div>
      )
    }
}
function handlePartyPosEng(value){
  if(value === "refuse"){
    return "none";
  }else{
    return value;
  }
}
