import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import district2cht from '../../utils/district2cht';

export default class DistrictFlag extends Component { 
  render() {
    const styles = require('./DistrictFlag.scss');
    const {area, areaNo} = this.props;
    let noItem = (areaNo) ? <div>第{areaNo}選區</div> : "";

    return (
      <div className={styles.areaFlag}>
          <div>{district2cht(area)}</div>
          {noItem}
          <Link to={`/constituencies/`} 
                className={styles.flagMeta}>看其他選區</Link>
      </div>
    );
  }
}


