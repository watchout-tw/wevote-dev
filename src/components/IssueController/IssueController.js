import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {setToViewParty, setToViewLegislator, setToViewPosition} from '../../ducks/issueController';

const VIEW_PARTY = 'VIEW_PARTY';
const VIEW_LEGISLATOR = 'VIEW_LEGISLATOR';
const VIEW_POSITION = 'VIEW_POSITION';

@connect(
    state => ({ issueController: state.issueController}),
    dispatch => bindActionCreators({setToViewParty, setToViewLegislator, setToViewPosition}, dispatch))

export default class IssueController extends Component {
  /* 一定要寫，因為要把滑鼠動作 bind 到 function，如果沒寫，component 可能還沒 mount，就無法 bind */
  static propTypes = {
    setToViewParty: PropTypes.func.isRequired,
    setToViewLegislator: PropTypes.func.isRequired,
    setToViewPosition: PropTypes.func.isRequired
  }

  render() {
    const styles = require('./IssueController.scss');
    const { issueController, setToViewParty, setToViewLegislator, setToViewPosition } = this.props;
    // console.log(issueController);
    console.log(this.props);
   
   

    let {options, activeOption} = issueController;

    let bindSetToViewParty = setToViewParty.bind(this);
    let bindSetToViewLegislator = setToViewLegislator.bind(this);
    let bindSetToViewPosition = setToViewPosition.bind(this);

    let optionItems = options.map((value,index)=>{
      
      let active = (value.id === activeOption) ? true : false;
      
      let handler;
      switch(value.id){
          case VIEW_PARTY:
            handler = bindSetToViewParty;
            break;

          case VIEW_LEGISLATOR:
            handler = bindSetToViewLegislator;
            break;

          case VIEW_POSITION:
            handler = bindSetToViewPosition;
            break;

          default:
            handler = bindSetToViewParty;
      }
     
     
      return <OptionItem data={value} active={active} handler={handler} key={index}/>
    })

    return (
      <div className={styles.wrap}>
           {optionItems} 
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
      <div className={`${styles.optionItem} ${itemActive}`} onClick={handler}>
          <img className={`${styles.optionImg} ${imgActive}`} src={imgURL} />
          {data.title}
      </div>
    )
  }

  props = {
    className: ''
  }
}

