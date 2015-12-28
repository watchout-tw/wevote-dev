import React, {Component, PropTypes} from 'react';
import {Router, Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setToProecessing} from '../../ducks/processingState.js';

@connect(
    state => ({}),
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
    const {location} = this.state;
    let issueName = (params.issueName) ? params.issueName : '';
    this.setState({
        issueName: issueName
    })

    //for search 後離開
    let l = window.location.pathname;
    if(l.indexOf("search")=== -1 && location === "search"){
       this.setState({
         location: ""
       })
    }

  }
  componentDidMount(){
    this._mountCheck("issues");
    this._mountCheck("parties");
    this._mountCheck("constituencies");
    this._mountCheck("about");
    this._mountCheck("search");

  }
  _mountCheck(v){
    let path = window.location.pathname;
    if(path.indexOf(v)!==-1){
        this.setState({
          location: v
        })
    }
  }

  render() {

    const styles = require('./Appbar.scss');
    const siteLogo = require('./images/logo-3.svg');
    const {showMenu, location, issueName} = this.state;
    const {currentIssueName} = this.props;
    const {processing} = this.props;

    let showStyle = (showMenu) ? styles.showMenu : "";

    let issuesActive = (location === "issues") ? styles.active : "";
    let partiesActive = (location.indexOf("parties")!==-1) ? styles.active : "";
    let constituenciesActive = (location === "constituencies") ? styles.active : "";
    
    let aboutActive = (location === "about") ? styles.active : "";
    let searchActive = (location === "search") ? styles.active : "";

    let symbol_issues = require('./images/symbols_issues.svg');
    let symbol_parties = require('./images/symbols_parties.svg');
    let symbol_constituencies = require('./images/symbols_constituencies.svg');
    let symbol_about = require('./images/symbols_about.svg');
    let search = require('./images/search.svg');
    
    let menu = require('./images/menu.svg');


    return (
      <nav className={`${styles.appbar} ${showStyle}`}>
          <div className={styles.inner}>
              <Link to="/" className={styles.siteName}
                    onClick={this._hideMenu.bind(this)}>
                <img src={siteLogo} className={styles.siteLogo} onClick={this._updateLocation.bind(this,'/')}/>
              </Link>

              <ul className={`${styles.lists} ${showStyle}`}>

                <li onClick={this._updateLocation.bind(this,'issues')}>
                    <Link className={`${styles.navItem} ${issuesActive}`}
                          to={`/issues/`}
                          onClick={this._hideMenu.bind(this)}>
                            <img src={symbol_issues} className={styles.symbol}/>
                            <span>議題攻城戰</span>
                    </Link>
                </li>

                <li onClick={this._updateLocation.bind(this,'parties')}>
                    <Link className={`${styles.navItem} ${partiesActive}`}
                          to={`/parties/`}
                          onClick={this._hideMenu.bind(this)}>
                            <img src={symbol_parties} className={styles.symbol}/>
                            <span>黨團衝突戰</span>
                    </Link>
                </li>


                <li onClick={this._updateLocation.bind(this,'constituencies')}>
                    <Link className={`${styles.navItem} ${constituenciesActive}`}
                          to={`/constituencies/`}
                          onClick={this._hideMenu.bind(this)}>
                        <img src={symbol_constituencies} className={styles.symbol}/>
                        <span>勇者競技場</span>
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

                <li onClick={this._updateLocation.bind(this,'search')}
                    className={styles.navLi}>
                    <Link className={`${styles.navItem} ${searchActive}`}
                          to={`/search`}
                          onClick={this._hideMenu.bind(this)}>
                            <img src={search} className={styles.searchImg}/> 
                            <span>搜尋</span>      
                    </Link>
                </li>
              </ul>

              <div className={styles.rightToggle}
                    onClick={this._toggleShowMenu.bind(this)}>
                    <img src={menu}/>
              </div>
              
          </div>
      </nav>
    );
  }




}
