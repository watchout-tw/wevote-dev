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
   
    return (
      <div className={styles.wrap}>
          <div className={styles.areaFlag}>
              <div>{areaCht}</div>
              {noItem}
              <Link to={`/constituencies/`} 
                    className={styles.flagMeta}>看其他選區</Link>
          </div>
      </div>
    );
  }
}



