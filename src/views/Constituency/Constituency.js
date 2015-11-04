import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import CandidateProfileCards from '../../components/CandidateProfileCards/CandidateProfileCards.js';
import Footer from '../../components/Footer/Footer.js';
import Social from '../../components/Social/Social.js';

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class Constituency extends Component {
  constructor(props){super(props)
    this.state = {
    }
  }
  render() {
    const styles = require('./Constituency.scss');
    const {area, areaNo} = this.props.params;
    
    return (
      <div className={styles.wrap}>
          <div className={styles.areaFlag}>
            <div>{area}</div>
            <div>{areaNo}</div>
          </div>
          <CandidateProfileCards area={area}
                                 areaNo={areaNo}/>
      </div>
    );
  }
}


