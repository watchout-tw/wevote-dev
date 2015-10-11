import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

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

    return (
        <div className={styles.qaBox}>
             <div className={styles.qaQuestion}
                  onClick={this._toggleShow.bind(this)}>
                      <div className={styles.index}>{index}</div>
                      <div className={styles.mainQuestion}>{data.question}</div>
                  </div>
             <div className={` ${styles.qaAnswer} ${answerShowHideStyle}`}>
                  {answerParagraphs}
             </div>
        </div>
    );
  }

  props = {
    className: 'Item'
  }
}

@connect(
    state => ({ FAQ: state.FAQ}),
    dispatch => bindActionCreators({}, dispatch))

export default class FAQ extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired

  }
  render() {

    const styles = require('./FAQ.scss');
    const {data} = this.props.FAQ;

    let QItems = data.map((item, index)=>{
        return <Item data={item} key={index} index={index+1}/>

    })
    return (
      <div>
           {QItems}
      </div>

    )
  }

  props = {
    className: 'FAQ'
  }
}
