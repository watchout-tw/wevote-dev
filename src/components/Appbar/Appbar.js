import React, {Component, PropTypes} from 'react';
import {Router, Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setToProecessing} from '../../ducks/processingState.js';

@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({setToProecessing}, dispatch))

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
  _onClickIssue(){
    this._hideMenu();
    this.props.setToProecessing();
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
    const siteLogo = require('./images/logo-2.svg');
    const {showMenu, location, issueName} = this.state;
    const {currentIssueName, issues} = this.props;
    const {processing} = this.props;

    let showStyle = (showMenu) ? styles.showMenu : "";

    // let issueItems = Object.keys(issues).map((issueId, index)=>{

    //   //let activeStyle = (currentIssueName===issueId) ? styles.active : "";
    //   let activeStyle = (issueName===issueId) ? styles.active : "";
    //   let symbol = require('./images/symbols_' + issues[issueId].titleEng + '.svg');

    //   return (
    //     <li key={index}
    //         onClick={this._updateLocation.bind(this,issueId)}>
    //         <Link className={`${styles.navItem} ${activeStyle}`}
    //               to={`/issues/${issueId}/`}
    //               onClick={this._onClickIssue.bind(this)}>
    //                 <img src={symbol} className={styles.symbol}/>
    //                 <span>{issues[issueId].title}</span>
    //         </Link>
    //     </li>
    //   )
    // })

    let issuesActive = (location === "issues") ? styles.active : "";
    let constituenciesActive = (location === "constituencies") ? styles.active : "";
    let partiesActive = (location === "parties") ? styles.active : "";
    let aboutActive = (location === "about") ? styles.active : "";

    let symbol_parties = require('./images/symbols_parties.svg');
    let symbol_about = require('./images/symbols_about.svg');
    let menu = require('./images/menu.svg');

    return (
      <nav className={`${styles.appbar} ${showStyle}`}>
          <div className={styles.inner}>
              <Link to="/" className={styles.siteName}
                    onClick={this._hideMenu.bind(this)}>
                <img src={siteLogo} className={styles.siteLogo}/>
              </Link>

              <ul className={`${styles.lists} ${showStyle}`}>

                <li onClick={this._updateLocation.bind(this,'issues')}>
                    <Link className={`${styles.navItem} ${issuesActive}`}
                          to={`/issues/`}
                          onClick={this._hideMenu.bind(this)}>
                            <img src={symbol_about} className={styles.symbol}/>
                            <span>議題攻城戰</span>
                    </Link>
                </li>

                <li onClick={this._updateLocation.bind(this,'constituencies')}>
                    <Link className={`${styles.navItem} ${constituenciesActive}`}
                          to={`/constituencies/`}
                          onClick={this._hideMenu.bind(this)}>
                            <img src={symbol_about} className={styles.symbol}/>
                            <span>勇者競技場</span>
                    </Link>
                </li>

                <li onClick={this._updateLocation.bind(this,'parties')}>
                    <Link className={`${styles.navItem} ${partiesActive}`}
                          to={`/parties/`}
                          onClick={this._hideMenu.bind(this)}>
                            <img src={symbol_about} className={styles.symbol}/>
                            <span>黨團衝突戰</span>
                    </Link>
                </li>

                <li onClick={this._updateLocation.bind(this,'about')}>
                    <Link className={`${styles.navItem} ${aboutActive}`}
                          to={`/about/FAQ`}
                          onClick={this._hideMenu.bind(this)}>
                            <img src={symbol_about} className={styles.symbol}/>
                            <span>FAQ</span>
                    </Link>
                </li>
              </ul>

              <div className={styles.rightToggle} onClick={this._toggleShowMenu.bind(this)}>
                <img src={menu}/>
              </div>
          </div>
      </nav>
    );
  }




}
