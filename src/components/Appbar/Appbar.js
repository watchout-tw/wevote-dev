import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


export default class Appbar extends Component {
  static propTypes = {
    
  }

  render() {
    
    const styles = require('./Appbar.scss');
    return (
      <nav className="navbar navbar-default">
          
            <Link to="/" className="navbar-brand">
              <div className={styles.brand}/>
              立委求職中
            </Link>

            <ul className={styles.lists}>
              <li><Link to={`/issues/marriage-equality`}  className="nav navbar-nav">婚姻平權</Link></li>
              <li><Link to={`/issues/recall`}  className="nav navbar-nav">罷免</Link></li>
              <li><Link to="about">About Us</Link></li>
            </ul>
            
        
      </nav>
    );
  }



 
}

