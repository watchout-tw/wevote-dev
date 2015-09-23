import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {createTransitionHook} from '../universalRouter';

import './normalize.scss';

import Appbar from '../components/Appbar/Appbar.js';
import Footer from '../components/Footer/Footer.js';

const title = '立委求職中';
const description = '「2016立委求職中」是一個提供選民了解立委候選人議題表態的網站。我們整理分析第八屆立委對重大議題的表態立場，提供選民了解候選人的價值理念。 「2016立委求職中」希望能夠做到更多的資訊揭露，改變台灣民主政治。'
const image = './logo.png';

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
      'og:description': description
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
        <Appbar/>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }



 
}

