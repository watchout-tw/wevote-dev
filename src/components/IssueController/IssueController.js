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
    setActiveView: PropTypes.func.isRequired
  }

  render() {
    const styles = require('./IssueController.scss');
    const { issueController, setActiveView } = this.props;
   
    let {views, activeView} = issueController;

    let bindSetActiveView = setActiveView.bind(this);

    let viewOptionItems = views.map((value,index)=>{

        let active = (value.id === activeView) ? true : false;
        return <OptionItem data={value} active={active} handler={bindSetActiveView} key={index}/>

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
 
  render() {
    const styles = require('./IssueController.scss');
    const {data, active, handler} = this.props;
    
    let imgURL = require(`./images/${data.id}.svg`);

    let itemActive = (active === true) ? styles.optionItemActive : "";
    let imgActive  = (active === true) ? styles.optionImgActive : "";
    
    return (
      <div className={`${styles.optionItem} ${itemActive}`} onClick={handler.bind(null, data.id)}>
          <img className={`${styles.optionImg} ${imgActive}`} src={imgURL} />
          {data.title}
      </div>
    )
  }

  props = {
    className: ''
  }
}

