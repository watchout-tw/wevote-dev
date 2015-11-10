import React, {Component} from 'react';
import {Link} from 'react-router';
import SubscribeComponent from '../../components/SubscribeComponent/SubscribeComponent.js';

export default class Subscribe extends Component {
  render() {
    const styles = require('./Subscribe.scss');
    let subscribeImg = require('./images/subscribe.png');

    return (
      <div className={styles.wrap}>
          <div className={styles.innerWrap}>
              <div className={styles.stamp}>
                  <img src={subscribeImg} className={styles.subscribeImg} />
              </div>
              <SubscribeComponent/>   
          </div>
      </div>
  
    );
  }
}
