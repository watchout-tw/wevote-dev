import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {setActiveView} from '../../ducks/issueController';

@connect(
    state => ({ issueController: state.issueController}),
    dispatch => bindActionCreators({setActiveView}, dispatch))

export default class IssueController extends Component {

  /* 一定要寫，因為要把滑鼠動作 bind 到 function，如果沒寫，component 可能還沒 mount，就無法 bind */

  static propTypes = {
    issueController: PropTypes.object.isRequired,
    setActiveView: PropTypes.func.isRequired
  }

  render() {

    const styles = require('./IssueController.scss');
    const { issueController, setActiveView, currentIssue } = this.props;

    let {views, activeView} = issueController;

    let bindSetActiveView = setActiveView.bind(this);

    let viewOptionItems = views.map((value,index)=>{

        let active = (value.id === activeView) ? true : false;
        return <OptionItem data={value} active={active} handler={bindSetActiveView} key={index}
                           currentIssue={currentIssue} />
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
    data: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired
  }
  render() {
    const styles = require('./IssueController.scss');
    const {data, active, handler} = this.props;

    let imgURL = require(`./images/${data.id}.svg`);

    let itemActive = (active === true) ? styles.optionItemActive : "";
    let imgActive  = (active === true) ? styles.optionImgActive : "";

    let link = "", issue = "";
    switch(this.props.currentIssue.title) {
      case "罷免":
        issue = "recall";
        break;
      case "公投":
        issue = "referendum";
        break;
      default:
        issue = "marriage-equality";
    }
    switch(data.title) {
      case "看委員":
        link = `/issues/${issue}/legislators`;
        break;
      case "看表態":
        link = `/issues/${issue}/positions`;
        break;
      default:
        link = `/issues/${issue}/parties`;
    }

    return (
      <div className={`${styles.optionItem} ${itemActive}`}>
        <Link to={link}>
          <img className={`${styles.optionImg} ${imgActive}`} src={imgURL} />
          {data.title}
        </Link>
      </div>
    )
  }

  props = {
    className: ''
  }
}
