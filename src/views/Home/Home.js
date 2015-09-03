import React, {Component} from 'react';
import {Link} from 'react-router';
import CounterButton from '../../components/CounterButton/CounterButton.js';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            
            <h1>React Redux Example</h1>
            <p>1234</p>
            
            <CounterButton />
          </div>
        </div>
      </div>
    );
  }
}
