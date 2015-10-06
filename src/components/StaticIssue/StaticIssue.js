import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import IssueFigure from '../../components/IssueFigure/IssueFigure.js';
import Slideshow from '../../components/Slideshow/Slideshow.js';

@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class StaticIssue extends Component {
  static propTypes = {
     issues: PropTypes.object.isRequired
  }

  constructor(props) { super(props)   
      
  }
  
  render(){
    
      const styles = require('./StaticIssue.scss');
      const {issues, currentView, currentIssueName, setCurrentView} = this.props;
      const currentIssue = issues[currentIssueName];
      console.log("static issues")
      return (
        <div className={styles.wrap}>
            <div className={styles.innerWrap}>
                <Slideshow currentIssue={currentIssue} 
                           topic={currentIssue.title}/>
                           
                <IssueFigure currentView={currentView}
                             currentIssue={currentIssue}
                             currentIssueName={currentIssueName}
                             setCurrentView={setCurrentView} /> 

             </div>
        </div>
      )
  }
}
