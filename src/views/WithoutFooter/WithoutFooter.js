import React, {Component, PropTypes} from 'react';

import Appbar from '../../components/Appbar/Appbar.js';
import Social from '../../components/Social/Social.js';

export default class WithoutFooter extends Component {
  render() {
    const {params} = this.props;
    const styles = require('./WithoutFooter.scss');
    return (
      <div>
        <div className={styles.spaceBar}></div>
         {this.props.children}
        <Social />
        <Appbar params={params}/>
      </div>
    );
  }




}
