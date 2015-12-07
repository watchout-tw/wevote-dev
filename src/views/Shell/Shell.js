import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Appbar from '../../components/Appbar/Appbar.js';
import Footer from '../../components/Footer/Footer.js';

export default class Shell extends Component {
  render() {
    const {params} = this.props;
    const styles = require('./Shell.scss');
    return (
      <div>
        <div className={styles.spaceBar}></div>
         {this.props.children}
        <Footer/>
        <Appbar params={params}/>
      </div>
    );
  }




}
