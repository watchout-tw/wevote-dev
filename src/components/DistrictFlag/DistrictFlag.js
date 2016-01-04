import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import district2cht from '../../utils/district2cht';
import district_sub2cht from '../../utils/district_sub2cht';

export default class DistrictFlag extends Component { 
  render() {
    const styles = require('./DistrictFlag.scss');
    const {area, areaNo} = this.props;
    const areaCht = district2cht(area);
    let noItem = (areaNo) ? <div>{district_sub2cht(area,areaNo)}</div> : "";
   
    if(singleArea[areaCht]){
        //該縣市只有一個選區
        return (
          <div className={styles.wrap}>
              <div className={styles.areaFlag}>
                  <div className={styles.areaCity}>{areaCht}</div>
                  {noItem}
                  <Link to={`/constituencies/`} 
                        className={styles.flagMeta}>看其他選區</Link>    
              </div>
          </div>
        );

    }else{
        //該縣市有一個以上選區，回到上一層
        return (
          <div className={styles.wrap}>
              <div className={` ${styles.areaFlag} ${styles.twoLink}`}>
                  <Link to={`/constituencies/${area}/`} 
                        className={styles.areaCityLink}>{areaCht}</Link>
                  {noItem}
                  <Link to={`/constituencies/`} 
                        className={`${styles.flagMeta} ${styles.twoLink}`}>看其他縣市</Link>       
              </div>
          </div>
        );

    }
    
  }
}
const singleArea = {
  "基隆市":"全市",
  "新竹縣":"全縣",
  "新竹市":"全市",
  "嘉義市":"全市",
  "臺東縣":"全縣",
  "花蓮縣":"全縣",
  "宜蘭縣":"全縣",
  "澎湖縣":"全縣",
  "金門縣":"全縣",
  "連江縣":"全縣",
  "平地原住民":"全區",
  "山地原住民":"全區"
}



