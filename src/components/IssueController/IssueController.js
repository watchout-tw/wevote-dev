import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const views = [
    {
      'title' : '看政黨',
      'id' : 'VIEW_PARTY',
      'view' : 'parties'
    },
    {
      'title' : '看委員',
      'id' : 'VIEW_LEGISLATOR',
      'view' : 'legislators'
    },
    {
      'title' : '看表態',
      'id' : 'VIEW_POSITION',
      'view' : 'positions'
    }
];
@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class IssueController extends Component {
 
  render() {

    const styles = require('./IssueController.scss');
    const { currentIssue, currentView} = this.props;

    let viewOptionItems = views.map((value,index)=>{

        return <OptionItem data={value} key={index}
                           currentIssue={currentIssue}
                           currentView={currentView} />
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
    const {data, currentIssue, currentView} = this.props;

    let imgURL = require(`./images/${data.id}.svg`);
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
       case "核四":
        issue = "nuclear-power";
        break;
      default:
        issue = "marriage-equality";
    }
    
    let itemActive = (data.view === currentView) ? styles.optionItemActive : styles.optionItemInactive;
    let imgActive  = (data.view === currentView) ? styles.optionImgActive : styles.optionImgInactive;

    return (
        <Link to={`/issues/${issue}/${data.view}#view`}
              className={`${styles.optionItem} ${itemActive}`}>
          <img className={`${styles.optionImg} ${imgActive}`} src={imgURL} />
          {data.title}
        </Link>  
    )
  }

  props = {
    className: ''
  }
}
