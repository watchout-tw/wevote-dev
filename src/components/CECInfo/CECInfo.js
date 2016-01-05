import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";

import getData from '../../data/getData';
const { CEC } = getData();

export default class CECInfo extends Component {

    render(){
      const styles = require('./CECInfo.scss');
      const {id} = this.props;
      if(!CEC.data[id]){
        return <div></div>
      }
      const {rptedu, rptexp, rptpolitics} = CEC.data[id];

      //如果有政見，計算政見最長字串，如果小於 15，改用置中
      let politicsClass = styles.sectionWrap;
      if(rptpolitics){
          let paras = rptpolitics.split("<br/>");
          let shortPara = true;
          let i = 0;
          for(i=0;i<paras.length;i++){
            if(paras[i].length > 15){
                shortPara = false;
            }
          }
          if(shortPara){
            politicsClass = styles.centerWrap;
          }
          
      }


      return (
        <div className={styles.wrap}>
            <div className={styles.paper}>
                <div className={styles.section}>
                    <div className={styles.titleWrap}><h2 className={styles.title}>學歷</h2></div>
                    <div className={styles.centerWrap} dangerouslySetInnerHTML={{__html: rptedu}}/>
                </div>
                <div className={styles.section}>
                  <div className={styles.titleWrap}><h2 className={styles.title}>經歷</h2></div>
                  <div className={styles.centerWrap} dangerouslySetInnerHTML={{__html: rptexp}}/>
                </div>
                <div className={styles.section}>
                  <div className={styles.titleWrap}><h2 className={styles.title}>政見</h2></div>
                  <div className={politicsClass} dangerouslySetInnerHTML={{__html: rptpolitics}}/>
                </div>
            </div>
            <div className={styles.meta}>* 候選人學經歷、政見資料來自
                <a className={`${styles.ia} ${styles.black}`} 
                   href="http://2016.cec.gov.tw/"
                   target="_blank">中選會</a>
                ，更新時間：{CEC.updateTime}</div>
        </div>
      )
    }
}


