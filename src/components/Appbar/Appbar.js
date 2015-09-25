import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


export default class Appbar extends Component {
  constructor(props){ super(props)
    this.state = {
        showMenu: false
    }
  }
  _toggleShowMenu(){
    this.setState(
      {
        showMenu: !this.state.showMenu
      }
    );

  }
  render() {

    const styles = require('./Appbar.scss');
    const siteLogo = require('./images/logo.svg');
    const {showMenu} = this.state;
    let showStyle = (showMenu) ? styles.showMenu : "";
    
    return (
      <nav className={`${styles.appbar} ${showStyle}`}>
          <div className={styles.inner}>
              <Link to="/" className={styles.siteName}>
                <img src={siteLogo} className={styles.siteLogo}/>
                <div className={styles.siteNameAdhoc}>立委<br/>出任務_</div>
              </Link>

              <ul className={`${styles.lists} ${showStyle}`}>
                <li onClick={this._toggleShowMenu.bind(this)}>
                    <Link className={styles.navItem} 
                          to={`/issues/marriage-equality/parties`} >
                          <i className={`fa fa-heart ${styles.icon}`}></i>婚姻平權</Link></li>
                <li onClick={this._toggleShowMenu.bind(this)}>
                    <Link className={styles.navItem} 
                          to={`/issues/recall/parties`}  >
                          <i className={`fa fa-thumbs-down ${styles.icon}`}></i>罷免</Link></li>
                <li onClick={this._toggleShowMenu.bind(this)}>
                    <Link className={styles.navItem} 
                          to={`/issues/referendum/parties`}  >
                          <i className={`fa fa-gavel ${styles.icon}`}></i>公投</Link></li>
                <li onClick={this._toggleShowMenu.bind(this)}>
                    <Link className={styles.navItem} 
                          to={`/issues/nuclear-power/parties`}  >
                          <i className={`fa fa-gavel ${styles.icon}`}></i>核四</Link></li>
                <li onClick={this._toggleShowMenu.bind(this)}>
                    <Link className={styles.navItem} 
                          to={`/parties`}  >
                          <i className={`fa fa-file-text-o ${styles.icon}`}></i>政黨表態</Link></li>
                <li onClick={this._toggleShowMenu.bind(this)}>
                    <Link className={styles.navItem} 
                          to={`/about`}>
                          <i className={`fa fa-smile-o ${styles.icon}`}></i>關於我們</Link></li>
              </ul>

              <div className={styles.rightToggle}
                   onClick={this._toggleShowMenu.bind(this)}><i className="fa fa-bars"></i>
          </div>
          </div>
      </nav>
    );
  }




}
