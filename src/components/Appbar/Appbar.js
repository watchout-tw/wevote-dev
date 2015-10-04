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
  _handleDevClear(){
    if(window){
        window.localStorage.clear();
        console.log("cleared.");
        window.location.href = "/";
    }
  }
  render() {

    const styles = require('./Appbar.scss');
    const siteLogo = require('./images/logo.svg');
    const {showMenu} = this.state;
    const {currentIssueName, issues, firstPathName} = this.props;
    let showStyle = (showMenu) ? styles.showMenu : "";

    let issueItems = Object.keys(issues).map((issueId, index)=>{
      let activeStyle = (currentIssueName===issueId) ? styles.active : "";
      return (
        <li key={index}>
            <Link className={` ${styles.navItem} ${activeStyle} `}
                  to={`/issues/${issueId}/parties`} >
                  <i className={`fa ${issues[issueId].icon} ${styles.icon}`}></i>
                  {issues[issueId].title}
            </Link>
        </li>
      )
    })

    
    let partiesActive = (firstPathName === "parties") ? styles.active : "";
    let aboutActive = (firstPathName === "about") ? styles.active : "";
    return (
      <nav className={`${styles.appbar} ${showStyle}`}>
          <div className={styles.inner}>
              <Link to="/" className={styles.siteName}>
                <img src={siteLogo} className={styles.siteLogo}/>
                <div className={styles.siteNameAdhoc}>立委<br/>出任務_</div>
              </Link>

              <div className={styles.devButton}
                   onClick={this._handleDevClear.bind(this)}>清除紀錄
                   <span className={styles.devButtonInfo}>測試時使用</span>
              </div>

              <ul className={`${styles.lists} ${showStyle}`}>
                
                {issueItems}
                
                <li>
                    <Link className={`${styles.navItem} ${partiesActive}`}
                          to={`/parties`}  >
                          <i className={`fa fa-file-text-o ${styles.icon}`}></i>政黨表態</Link></li>
                <li>
                    <Link className={`${styles.navItem} ${aboutActive}`}
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
