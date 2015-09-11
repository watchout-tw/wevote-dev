import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    
    
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            
           
          </div>
        </div>
      </div>
    );
  }
}
