import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import DistrictFlag from '../../components/DistrictFlag/DistrictFlag.js';
import PositionTable from '../../components/PositionTable/PositionTable';
import BillTable from '../../components/BillTable/BillTable';
import Social from '../../components/Social/Social.js';

import getDistrictCandidates from '../../utils/getDistrictCandidates';

@connect(
    state => ({candidates: state.candidates}),
    dispatch => bindActionCreators({}, dispatch))

export default class ConstituencyTable extends Component {
  constructor(props){super(props)
    this.state = {
      districtCandidates : getDistrictCandidates(props.candidates, props.params.area, props.params.areaNo)
    }
  }
  render() {
    const styles = require('./ConstituencyTable.scss');
    const {area, areaNo} = this.props.params;
    const {districtCandidates} = this.state;
    return (
      <div>
          <div className={styles.wrap}>
              <DistrictFlag area={area} areaNo={areaNo} />
              <PositionTable unit="people" districtCandidates={districtCandidates}/>
              <BillTable showTitle={true} unit="people" districtCandidates={districtCandidates}/>
              <Social />
          </div>
          <div className={styles.bgHolder}></div>
      </div>
    );
  }
}


