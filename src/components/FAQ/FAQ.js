import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import getData from '../../data/getData';
const FAQ_DATA = getData().FAQ;

export default class FAQ extends Component {

  render() {
    const styles = require('./FAQ.scss');
    const {data} = FAQ_DATA;

    let QItems = data.map((item, index)=>{
        return <Item data={item} key={index} index={index+1}/>
    })
    return (
      <div>{QItems}</div>
    )
  }

  props = {
    className: 'FAQ'
  }
}
class Item extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
    this.state = {
        showAnswer: false
    }
  }
  _toggleShow(){

    this.setState({
        showAnswer: !this.state.showAnswer
    })
  }
  render() {

    const styles = require('./FAQ.scss');
    const {data, index} = this.props;
    const {showAnswer} = this.state;

    let answerParagraphs = data.answer.map((p, i)=>{
        return (
            <p key={i}>{p}</p>
        )
    })
    let answerShowHideStyle = (showAnswer) ? styles.show : styles.hide;
    let linkToWanted = (data.question === "勇者競技場的資料是如何收集的？") ? (
        <Link to={`/wanted/`} 
              className={`${styles.ia} ${styles.bright}`}>前往協尋</Link>
    ) : "";
    return (
        <div className={styles.qaBox}>
             <div className={styles.qaQuestion}
                  onClick={this._toggleShow.bind(this)}>
                      <div className={styles.index}>{index}</div>
                      <div className={styles.mainQuestion}>{data.question}</div>
                  </div>
             <div className={` ${styles.qaAnswer} ${answerShowHideStyle}`}>
                  {answerParagraphs}
                  {linkToWanted}
             </div>
        </div>
    );
  }

  props = {
    className: 'Item'
  }
}
