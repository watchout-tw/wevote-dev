import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import InteractiveIssue from '../../components/InteractiveIssue/InteractiveIssue.js';

@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  static propTypes = {
     issues: PropTypes.object.isRequired
  }

  constructor(props) { super(props)   
      this.state = {
        currentView: 'parties',
        interactive: true
      }
  }
  _toggleInteractive(){
      this.setState({
          interactive: !this.state.interactive
      })
  }
  
  render(){
    
      const styles = require('./Issue.scss');
      const {issues} = this.props;
      const currentIssueName = this.props.params.issueName;
      const {currentView, interactive} = this.state; //this.props.params.view || "parties";
      
      let main = (interactive) ? (
          <InteractiveIssue issues={issues} 
                            currentIssueName={currentIssueName}
                            currentView={currentView} />
      ):"not interactive";

      return (
        <div className={styles.wrap}>
             <div className={styles.interactiveControl}
                  onClick={this._toggleInteractive.bind(this)}>(測試用) Toggle!</div>
             {main}
        </div>
      )
  }
}

