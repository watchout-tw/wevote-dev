import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {createTransitionHook} from '../universalRouter';

import './normalize.scss';

import Appbar from '../components/Appbar/Appbar.js';
import Footer from '../components/Footer/Footer.js';
import Social from '../components/Social/Social.js';

const title = "立委出任務-2016立委投票資訊站";
const description = "2016立委選舉票該投給誰？「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委與下任候選人立場，並分析政黨針對議題的整體立場。想透過議題更了解你的選區立委嗎？請上「立委出任務」！";
const image = './images/logo.png';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'zh_TW',
      'og:title': title,
      'og:description': description,
      'og:type' : 'website'
    }
  }
};


@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };
  constructor(props){ super(props)
    this.state = {
      location: ""
    }
  }

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
    const {issues, params} = this.props;
    const {location} = this.state;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <div className={styles.invisible}>
            <Link to={`/404`}>404</Link>
            <Link to={`/8th-legislators`}>8th-legislators</Link>
        </div>
        <div className={styles.spaceBar}></div>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <Footer/>
        <Social />
        <Appbar currentIssueName={params.issueName}
                issues={issues}
                firstPathName={location}
                params={params}/>
      </div>
    );
  }




}
