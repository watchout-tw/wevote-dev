import React, {Component, PropTypes} from 'react';

// 看政黨 viewParty
// 看委員 viewLegislator
// 看表態 viewPosition

class OptionItem extends Component {
 
  render() {
    const styles = require('./IssueController.scss');
    const {data, active, handlerSetOption} = this.props;
    
    //let imgURL = (active === true) ? require(`./images/${data.id}-active.svg`):require(`./images/${data.id}.svg`);
    
    let imgURL = require(`./images/${data.id}.svg`);
    
    let itemActive = (active === true) ? styles.optionItemActive : "";
    let imgActive  = (active === true) ? styles.optionImgActive : "";

    return (
      <div className={`${styles.optionItem} ${itemActive}`} onClick={handlerSetOption.bind(null, data.id)}>
          <img className={`${styles.optionImg} ${imgActive}`} src={imgURL} />
          {data.title}
      </div>
    )
  }

  props = {
    className: ''
  }
}


export default class PartyPositionGroup extends Component {
  // static propTypes = {
  //   // count: PropTypes.number,
  //   // increment: PropTypes.func.isRequired,
  //   // className: PropTypes.string
  // }

  render() {
    const styles = require('./IssueController.scss');
    const {options, activeOption, handlerSetOption} = this.props;
    
    
    let optionItems = options.map((value,index)=>{
      
      let active = (value.id === activeOption) ? true : false;
      return <OptionItem data={value} active={active} key={index} handlerSetOption={handlerSetOption}/>
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

