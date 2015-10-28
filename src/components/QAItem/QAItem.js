import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class QAItem extends Component {
  static propTypes = {
      
  }
  constructor(props){ super(props)
      this.state = {
          
      }
  }
  _onAnswer(choice, e){
    const {data, recordHandler} = this.props;

    console.log("----")
    console.log(data.id)
    console.log(choice)
    
    recordHandler(data.id, choice)
  }
  render() {
    const styles = require("./QAItem.scss")
    const {data, currentQAItemIndex, userVote} = this.props;

    let qaItemClasses = classnames({
      [styles.QAItem] : true,
      [styles.isActive] : data.order <= currentQAItemIndex
    })

 // <Answer completed={this.state.completed}
              //         data={options}
              //         id={id}
              //         userVote={this.props.userVote} />
              //{toNextItem}
    return (
        <div className={qaItemClasses}
             id={data.id}>
            <div className={styles.questionContent}>
                <div className={styles.questionTitle}>{data.order+1}. {data.title}</div>
                <div className={styles.questionDescription}>{data.description}</div>
                <div className={styles.optionSection}>
                    <OptionItem value="aye"  title="贊成"  isUserVote={userVote==='aye'} 
                                onAnswerHandler={this._onAnswer.bind(this)}/>
                    <OptionItem value="nay"  title="反對"  isUserVote={userVote==='nay'} 
                                onAnswerHandler={this._onAnswer.bind(this)}/>
                    <OptionItem value="none" title="沒意見" isUserVote={userVote==='none'} 
                                onAnswerHandler={this._onAnswer.bind(this)}/>
                </div>
            </div>
            <div className={styles.resultContnet}>
                
            </div>
        </div>
    );
  }
}
class OptionItem extends Component {
  
  render() {
    const styles = require("./QAItem.scss")
    const {value, title, isUserVote, onAnswerHandler} = this.props;
    let optionClasses = classnames({
        [styles.optionItem]: true,
        [styles.isChoosed]: isUserVote
    });

    return (
        <div className={`${optionClasses} ${styles[value]}`}
             onClick={onAnswerHandler.bind(null, value)}>{title}</div>
    );
  }
}
