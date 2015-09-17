import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


export default class Appbar extends Component {
  
  render() {
    
    const styles = require('./Appbar.scss');
    const siteLogo = require('./images/logo.svg');

    return (
      <nav className={styles.appbar}>
          
            <Link to="/">
              <img src={siteLogo} className={styles.siteLogo}/>
            </Link>

            <ul className={styles.lists}>
              <li><Link className={styles.navItem} to={`/issues/marriage-equality`} >婚姻平權</Link></li>
              <li><Link className={styles.navItem} to={`/issues/recall`}  >罷免</Link></li>
              <li><Link className={styles.navItem} to={`/issues/referendum`}  >公投</Link></li>
              <li><Link className={styles.navItem} to={`/parties`}  >政黨表態</Link></li>
              <li><Link className={styles.navItem} to={`/about`}>關於本站</Link></li>
            </ul>
            
        
      </nav>
    );
  }



 
}

