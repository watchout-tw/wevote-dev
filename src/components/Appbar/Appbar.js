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
                          <svg className={styles.icon} x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                            <path d="M27,28H5c-0.553,0-1-0.447-1-1V17c0-0.553,0.447-1,1-1h22c0.553,0,1,0.447,1,1v10C28,27.553,27.553,28,27,28z M6,26h20v-8H6
                              V26z M9,28H5c-0.553,0-1-0.447-1-1V13c0-0.553,0.447-1,1-1h4c0.553,0,1,0.447,1,1v14C10,27.553,9.553,28,9,28z M6,26h2V14H6V26z
                              M27,28h-4c-0.553,0-1-0.447-1-1V13c0-0.553,0.447-1,1-1h4c0.553,0,1,0.447,1,1v14C28,27.553,27.553,28,27,28z M24,26h2V14h-2V26z
                              M19,28h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1v5C20,27.553,19.553,28,19,28z M14,26h4v-3h-4V26z
                              M18,18h-4c-0.553,0-1-0.447-1-1V9c0-0.553,0.447-1,1-1h4c0.553,0,1,0.447,1,1v8C19,17.553,18.553,18,18,18z M15,16h2v-6h-2V16z
                              M18.02,10c-0.005,0-0.012,0.001-0.02,0h-4c-0.339,0-0.654-0.171-0.839-0.455s-0.213-0.642-0.075-0.951l2-4.5
                              C15.247,3.732,15.604,3.5,16,3.5s0.753,0.232,0.914,0.594l1.926,4.333c0.113,0.162,0.18,0.36,0.18,0.573
                              C19.02,9.553,18.572,10,18.02,10z M15.539,8h0.922L16,6.962L15.539,8z"/>
                          </svg>
                          <span>議題攻城戰</span>
                    </Link>
                </li>

                <li onClick={this._updateLocation.bind(this,'parties')}>
                    <Link className={`${styles.navItem} ${partiesActive}`}
                          to={`/parties/`}
                          onClick={this._hideMenu.bind(this)}>
                          <svg className={styles.icon} x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                            <path d="M12,24.5c-4.687,0-8.5-3.813-8.5-8.5S7.313,7.5,12,7.5s8.5,3.813,8.5,8.5S16.687,24.5,12,24.5z M12,9.5
                            	c-3.584,0-6.5,2.916-6.5,6.5s2.916,6.5,6.5,6.5s6.5-2.916,6.5-6.5S15.584,9.5,12,9.5z M20,24.5c-4.687,0-8.5-3.813-8.5-8.5
                            	s3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5S24.687,24.5,20,24.5z M20,9.5c-3.584,0-6.5,2.916-6.5,6.5s2.916,6.5,6.5,6.5
                            	s6.5-2.916,6.5-6.5S23.584,9.5,20,9.5z"/>
                            <path d="M16,23c-0.553,0-1-0.447-1-1V10c0-0.553,0.447-1,1-1s1,0.447,1,1v12C17,22.553,16.553,23,16,23z"/>
                          </svg>
                          <span>黨團衝突戰</span>
                    </Link>
                </li>


                <li onClick={this._updateLocation.bind(this,'constituencies')}>
                    <Link className={`${styles.navItem} ${constituenciesActive}`}
                          to={`/constituencies/`}
                          onClick={this._hideMenu.bind(this)}>
                          <svg className={styles.icon} x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                            <path d="M16,28.75C8.97,28.75,3.25,23.03,3.25,16S8.97,3.25,16,3.25S28.75,8.97,28.75,16S23.03,28.75,16,28.75z M16,5.25
                            	C10.072,5.25,5.25,10.072,5.25,16S10.072,26.75,16,26.75S26.75,21.928,26.75,16S21.928,5.25,16,5.25z M21.646,15.458
                            	c-1.517,0-2.75-1.233-2.75-2.75s1.233-2.75,2.75-2.75s2.75,1.233,2.75,2.75S23.162,15.458,21.646,15.458z M21.646,11.958
                            	c-0.413,0-0.75,0.337-0.75,0.75s0.337,0.75,0.75,0.75s0.75-0.337,0.75-0.75S22.059,11.958,21.646,11.958z M16,11.917
                            	c-1.517,0-2.75-1.233-2.75-2.75s1.233-2.75,2.75-2.75s2.75,1.233,2.75,2.75S17.517,11.917,16,11.917z M16,8.417
                            	c-0.413,0-0.75,0.337-0.75,0.75s0.337,0.75,0.75,0.75s0.75-0.337,0.75-0.75S16.413,8.417,16,8.417z M10.125,15.458
                            	c-1.517,0-2.75-1.233-2.75-2.75s1.233-2.75,2.75-2.75s2.75,1.233,2.75,2.75S11.642,15.458,10.125,15.458z M10.125,11.958
                            	c-0.413,0-0.75,0.337-0.75,0.75s0.337,0.75,0.75,0.75s0.75-0.337,0.75-0.75S10.538,11.958,10.125,11.958z M10.208,22.25
                            	c-1.517,0-2.75-1.233-2.75-2.75s1.233-2.75,2.75-2.75s2.75,1.233,2.75,2.75S11.725,22.25,10.208,22.25z M10.208,18.75
                            	c-0.413,0-0.75,0.337-0.75,0.75s0.337,0.75,0.75,0.75s0.75-0.337,0.75-0.75S10.621,18.75,10.208,18.75z M21.646,22.25
                            	c-1.517,0-2.75-1.233-2.75-2.75s1.233-2.75,2.75-2.75s2.75,1.233,2.75,2.75S23.162,22.25,21.646,22.25z M21.646,18.75
                            	c-0.413,0-0.75,0.337-0.75,0.75s0.337,0.75,0.75,0.75s0.75-0.337,0.75-0.75S22.059,18.75,21.646,18.75z M16,25.729
                            	c-1.517,0-2.75-1.233-2.75-2.75s1.233-2.75,2.75-2.75s2.75,1.233,2.75,2.75S17.517,25.729,16,25.729z M16,22.229
                            	c-0.413,0-0.75,0.337-0.75,0.75s0.337,0.75,0.75,0.75s0.75-0.337,0.75-0.75S16.413,22.229,16,22.229z"/>
                          </svg>
                          <span>勇者競技場</span>
                    </Link>
                </li>

                <li onClick={this._updateLocation.bind(this,'about')}>
                    <Link className={`${styles.navItem} ${aboutActive}`}
                          to={`/about/FAQ/`}
                          onClick={this._hideMenu.bind(this)}>
                          <svg className={styles.icon} x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                          	<path d="M9.933,6.733c0,0-1.159-0.146-2.318-0.062S5.028,7.043,5.028,7.043S5.735,8.554,6.791,8.74c1.055,0.186,1.863,0,1.863,0
                          		s-0.148,1.345-0.148,2.897s-0.186,3.911,2.049,5.091s3.228,0.683,3.228,0.683s-0.497,1.428-1.552,2.794s-1.49,2.173-1.49,2.173
                          		s-0.807,0.186-0.745,0.745c0.062,0.559,0.683,0.559,1.055,0.435c0.373-0.124,1.035-0.585,1.593-1.019
                          		c0.559-0.435,1.106-0.865,1.106-0.865s-0.01,1.996,0.673,4.231s1.657,4.297,1.657,4.297s-0.228,0.228-0.145,0.435
                          		s0.331,0.455,1.035,0.331c0.704-0.124,0.828-0.497,0.828-0.497s-0.083-0.579-0.083-1.821s0-1.904,0-1.904s0.541,0.124,1.035,0.169
                          		c0.529,0.048,1.034,0.038,1.034,0.038s0.28,0.686,0.552,1.067c0.24,0.337,0.896,0.754,0.896,0.754s0.083,0.538,0.124,0.786
                          		c0.041,0.248,0.083,0.579,0.083,0.579s-0.248,0.207-0.207,0.373c0.041,0.166,0.373,0.455,1.035,0.29
                          		c0.662-0.166,0.993-0.621,0.993-0.621s0.124-1.159,0-2.318c-0.124-1.159-0.083-2.194-0.083-2.194s0.869-0.124,0.786-1.118
                          		s-0.952-1.035-0.952-1.035s0.166-1.159,0.083-2.939c-0.083-1.78-0.248-3.601-0.248-3.601s0.414-1.368,0.662-2.9
                          		c0.248-1.531,0.865-6.154,0.865-6.154s0.707-0.59,0.583-1.253c-0.124-0.662-0.911-0.538-0.911-0.538s-0.538-0.421-0.874,0.06
                          		c-0.204,0.292,0.005,1.223,0.005,1.223l-1.78,4.387h-0.29c0,0,0.331-1.697-0.331-3.063c-0.662-1.366-1.573-2.194-1.573-2.194
                          		s0.472-1.089,0.555-2.662S18.832,1,18.832,1s-0.809,1.054-1.14,1.923s-0.474,1.843-0.474,1.843s-1.863-0.497-4.139,0.29
                          		S9.933,6.733,9.933,6.733z"/>
                          </svg>
                          <span>FAQ</span>
                    </Link>
                </li>

                <li onClick={this._updateLocation.bind(this,'search')}
                    className={styles.navLi}>
                    <Link className={`${styles.navItem} ${searchActive}`}
                          to={`/search/`}
                          onClick={this._hideMenu.bind(this)}>
                          <svg className={styles.icon} x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                            <path d="M15,7.758c3.86,0,7,3.14,7,7s-3.14,7-7,7s-7-3.14-7-7S11.14,7.758,15,7.758 M15,4.758c-5.523,0-10,4.477-10,10
                          	 s4.477,10,10,10s10-4.477,10-10S20.523,4.758,15,4.758L15,4.758z"/>
                             <rect x="21.587" y="20.347" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -10.3184 23.9681)" width="4.372" height="8.186"/>
                          </svg>
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
