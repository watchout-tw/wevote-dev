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

      return (
        <div className={styles.wrap}>
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
              <div className={styles.sectionWrap} dangerouslySetInnerHTML={{__html: rptpolitics}}/>
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


