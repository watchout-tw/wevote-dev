import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const views = [
    {
      'title' : '看政黨',
      'icon': 'IssueController_party',
      'view' : 'parties'
    },
    {
      'title' : '看委員',
      'icon': 'IssueController_person',
      'view' : 'legislators'
    },
    {
      'title' : '看表態',
      'icon': 'IssueController_position',
      'view' : 'positions'
    },
    {
      'title' : '看分析',
      'icon': 'IssueController_analysis',
      'view' : 'analysis'
    }
];
@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class IssueController extends Component {

  render() {

    const styles = require('./IssueController.scss');
    const { currentIssue, currentView, setCurrentView} = this.props;

    let viewOptionItems = views.map((value,index)=>{

        return <OptionItem data={value} key={index}
                           currentIssue={currentIssue}
                           currentView={currentView}
                           setCurrentView={setCurrentView} />
    })

    return (
      <div className={styles.wrap}>
           {viewOptionItems}
      </div>
    );
  }

  props = {
    className: ''
  }
}

class OptionItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  render() {
    const styles = require('./IssueController.scss');
    const {data, currentIssue, currentView, setCurrentView} = this.props;

    let imgURL = require(`./images/${data.icon}.svg`);
    let active = false;

    let link = "", issue = "";
    switch(currentIssue.title) {
      case "婚姻平權":
        issue = "marriage-equality";
        break;
      case "罷免":
        issue = "recall";
        break;
      case "公投":
        issue = "referendum";
        break;
       case "核能":
        issue = "nuclear-power";
        break;
      default:
        issue = "marriage-equality";
    }

    let itemActive = (data.view === currentView) ? styles.optionItemActive : styles.optionItemInactive;
    let imgActive  = (data.view === currentView) ? styles.optionImgActive : styles.optionImgInactive;

    return (
        <div className={`${styles.optionItem} ${itemActive}`}
             onClick={setCurrentView.bind(null, data.view)}>
          <img className={`${styles.optionImg} ${imgActive}`} src={imgURL} />
          <div className={styles.optionText}>{data.title}</div>
          <Link className={styles.invisible}
                to={`/issues/${issue}/${data.view}`}>link</Link>
        </div>
    )
  }

  props = {
    className: ''
  }
}
