import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import QAItem from '../../components/QAItem/QAItem';

@connect(
    state => ({issues: state.issues}),
    dispatch => bindActionCreators({}, dispatch))

export default class MatchGame extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      this.state = {
          currentQAItemIndex: 0,
          userChoices: {
            // Format // "Question0":"aye"
          }
      }
  }
  _recordUserChoice(id, choice) {

      let currentChoices = this.state.userChoices;
      if(currentChoices[id]){
         return;//如果已經回答過，不再重複登記
      }

      currentChoices[id] = choice;
      this.setState({
          userChoices: currentChoices,
          currentQAItemIndex: this.state.currentQAItemIndex+1
      });
  }
  render() {
    const styles = require("./MatchGame.scss")
    const {issues} = this.props;
    const {currentQAItemIndex, userChoices} = this.state;

    let qaSet = Object.keys(issues).map((issueId, index)=>{
        return {
            id: `Question${index}`,
            order: index,
            title: issues[issueId].title,
            description: issues[issueId].question
        }
    })
    let qaItems = qaSet.map((value,index)=>{
        return <QAItem key={`qaitem${index}`}
                       data={value}
                       currentQAItemIndex={currentQAItemIndex}
                       userVote={userChoices[value.id]}
                       recordHandler={this._recordUserChoice.bind(this)} />
    })
    return (
        <div className={styles.MatchGame}>
            {qaItems}
        </div>
    );
  }
}
