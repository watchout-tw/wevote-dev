import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {createTransitionHook} from '../universalRouter';

const title = '立委求職中';
const description = '0.0.1';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@erikras',
      'twitter:creator': '@erikras',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
    
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    this.transitionHook = createTransitionHook(store);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <nav className="navbar navbar-default">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <div className={styles.brand}/>
              立委求職中
            </Link>

          
            <ul className="nav navbar-nav">
              <li><Link to={`/issues/marriage-equality`}  className="nav navbar-nav">婚姻平權</Link></li>
              <li><Link to={`/issues/recall`}  className="nav navbar-nav">罷免</Link></li>
              <li><Link to="about">About Us</Link></li>
            </ul>
            
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="https://www.facebook.com/WatchOutTW"
                   target="_blank" title="View on Github">fb</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        

       
      </div>
    );
  }



 
}

