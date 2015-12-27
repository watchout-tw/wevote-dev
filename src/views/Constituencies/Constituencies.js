import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import ElectionMap from '../../components/ElectionMap/ElectionMap.js';
export default class Constituencies extends Component {
  constructor(props){ super(props)
    this.state = {
      viewWidth: ''
    }
  }

  componentDidMount(){
    let w = window.innerWidth;
    this.setState({
        viewWidth: w
    })
  }
  render() {
    const styles = require('./Constituencies.scss');
    const title = "區域立委投票攻略-各地區域候選人表態承諾大公開-沃草2016立委出任務";
    const description = "2016「區域立委」怎麼投？想知道你選區的立委候選人有誰？對議題有什麼表態立場？又推出了什麼優先推動法案？快來了解候選人的未來承諾，投票前不能錯過的最佳攻略！";
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description
          }
      }
    };

    const {viewWidth} = this.state;
    
    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <div className={styles.instruction}>
              <p>勇者競技場，全島分成七十五個不同區域。勇者將在每區競技場裡競逐爭取島民們的信任，取得在立法聖殿中代表島民意志的機會。</p>
              <p>誰能勝出？由島嶼主人的你來決定！</p>
              <p>⬇︎⬇︎⬇︎選地圖，看選區⬇︎⬇︎⬇︎</p>
          </div>
          <ElectionMap viewWidth={viewWidth}/>
          <div className={styles.bgHolder}></div>
      </div>
    );
  }
}
