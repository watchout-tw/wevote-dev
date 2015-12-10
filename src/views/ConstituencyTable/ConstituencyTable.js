import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class ConstituencyTable extends Component {
  constructor(props){super(props)
  }
  render() {
    const styles = require('./ConstituencyTable.scss');
    const {area, areaNo} = this.props.params;
    return (
      <div className={styles.wrap}>
          {area} {areaNo}
      </div>
    );
  }
}


