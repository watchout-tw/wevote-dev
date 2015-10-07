import React, {Component, PropTypes} from 'react';
import {Router, Link} from 'react-router';


export default class Appbar extends Component {
  constructor(props){ super(props)
    const {params} = props;
    let issueName = (params.issueName) ? params.issueName : '';

    this.state = {
        showMenu: false,
        location: "",
        issueName: issueName
    }
  }
  _toggleShowMenu(){
    this.setState({
        showMenu: !this.state.showMenu
    });
  }
  _hideMenu(){
    this.setState({
        showMenu: false
    });
  }
  _updateLocation(value, event){
    this.setState({
        location: value
    })
  }
  componentWillReceiveProps(nextProps){
    const {params} = nextProps;
    let issueName = (params.issueName) ? params.issueName : '';
    this.setState({
        issueName: issueName
    })
  }

  render() {

    const styles = require('./Appbar.scss');
    const siteLogo = require('./images/logo.png');
    const {showMenu, location, issueName} = this.state;
    const {currentIssueName, issues} = this.props;
    
    let showStyle = (showMenu) ? styles.showMenu : "";

    let issueItems = Object.keys(issues).map((issueId, index)=>{
      
      //let activeStyle = (currentIssueName===issueId) ? styles.active : "";
      let activeStyle = (issueName===issueId) ? styles.active : "";

      return (
        <li key={index}
            onClick={this._updateLocation.bind(this,issueId)}>
            <Link className={` ${styles.navItem} ${activeStyle} `}
                  to={`/issues/${issueId}`}
                  onClick={this._hideMenu.bind(this)} >
                  <i className={`fa ${issues[issueId].icon} ${styles.icon}`}></i>
                  {issues[issueId].title}
            </Link>
        </li>
      )
    })

    let partiesActive = (location === "parties") ? styles.active : "";
    let aboutActive = (location === "about") ? styles.active : "";

    return (
      <nav className={`${styles.appbar} ${showStyle}`}>
          <div className={styles.inner}>
              <Link to="/" className={styles.siteName}>
                <img src={siteLogo} className={styles.siteLogo}/>
              </Link>

              <ul className={`${styles.lists} ${showStyle}`}>
                
                {issueItems}
                
                <li onClick={this._updateLocation.bind(this,'parties')}>
                    <Link className={`${styles.navItem} ${partiesActive}`}
                          to={`/parties`}
                          onClick={this._hideMenu.bind(this)}  >
                          <i className={`fa fa-file-text-o ${styles.icon}`}></i>政黨表態</Link></li>
                <li onClick={this._updateLocation.bind(this,'about')}>
                    <Link className={`${styles.navItem} ${aboutActive}`}
                          to={`/about`}
                          onClick={this._hideMenu.bind(this)}>
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
