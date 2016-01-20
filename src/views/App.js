import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {createTransitionHook} from '../universalRouter';
import Buy from '../components/Buy/Buy.js';
import './normalize.scss';

const title = "沃草！立委出任務 - 2016立委投票攻略";
const description = "2016立委選舉票該投給誰？「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委與下任候選人立場，並分析政黨對於議題表態和優先法案的未來承諾。想了解你的選區立委嗎？想知道政黨票怎麼投嗎？請上「立委出任務」！";

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:title': title,
      'og:description': description,
      'og:site_name': title
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

  componentDidMount(){
    if(window){
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      
        // ga('create', 'UA-48524226-20', 'auto');
        // ga('require', 'displayfeatures');
        // ga('send', 'pageview');
    }
  }
  render() {
    const {issues, params} = this.props;
    const {location} = this.state;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }




}
