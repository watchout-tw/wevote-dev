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
              <Link to="/">
                <img src={siteLogo} className={styles.siteLogo}/>
              </Link>

              <ul className={`${styles.lists} ${showStyle}`}>
                <li onClick={this._toggleShowMenu.bind(this)}><Link className={styles.navItem} to={`/issues/marriage-equality/parties`} >婚姻平權</Link></li>
                <li onClick={this._toggleShowMenu.bind(this)}><Link className={styles.navItem} to={`/issues/recall/parties`}  >罷免</Link></li>
                <li onClick={this._toggleShowMenu.bind(this)}><Link className={styles.navItem} to={`/issues/referendum/parties`}  >公投</Link></li>
                <li onClick={this._toggleShowMenu.bind(this)}><Link className={styles.navItem} to={`/parties`}  >政黨表態</Link></li>
                <li onClick={this._toggleShowMenu.bind(this)}><Link className={styles.navItem} to={`/about`}>關於我們</Link></li>
              </ul>

              <div className={styles.rightToggle}
                   onClick={this._toggleShowMenu.bind(this)}><i className="fa fa-bars"></i>
          </div>
          </div>
      </nav>
    );
  }




}
