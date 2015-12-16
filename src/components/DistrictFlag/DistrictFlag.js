import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import district2cht from '../../utils/district2cht';

export default class DistrictFlag extends Component { 
  render() {
    const styles = require('./DistrictFlag.scss');
    const {area, areaNo} = this.props;
    const areaCht = district2cht(area);
    let noItem = (areaNo) ? <div>第{areaNo}選區</div> : "";
    if(singleArea[areaCht]){
      noItem = <div>{singleArea[areaCht]}</div>;
    }

    return (
      <div className={styles.areaFlag}>
          <div>{areaCht}</div>
          {noItem}
          <Link to={`/constituencies/`} 
                className={styles.flagMeta}>看其他選區</Link>
      </div>
    );
  }
}
//處理該縣市只有單一選區
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

