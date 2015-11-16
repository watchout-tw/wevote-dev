import React, {Component} from 'react';
import Appbar from '../../components/Appbar/Appbar.js';

export default class WithoutFooter extends Component {
  render() {
    const {params} = this.props;
    const styles = require('./WithAppbarOnly.scss');
    return (
      <div>
        <div className={styles.spaceBar}></div>
         {this.props.children}
        <Appbar params={params}/>
      </div>
    );
  }
}
