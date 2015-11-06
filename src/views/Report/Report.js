import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import LegislatorCards from '../../components/LegislatorCards/LegislatorCards.js';
import RecordStream from '../../components/RecordStream/RecordStream.js';

const breakWebVersion = 730; //跟 scss 同步

@connect(
    state => ({
                  MaXiRecords: state.MaXiRecords
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Report extends Component {
  static propTypes = {
      
  }
  constructor(props){ super(props)
      let array = Object.keys(props.MaXiRecords);//default 為第一位立委
      
      this.state = {
        activeLegislator: array[0],
        fixedStream: false,
        meetFilterValue: "all",
        procedureFilterValue: "all",
        showControls: false
      }
  }
  _onScroll(){
      let node = this.refs.positionSection.getDOMNode();
      let rect = node.getBoundingClientRect();
      let {fixedStream} = this.state;
      // console.log(rect.top)
      // console.log(document.body.scrollTop)
      if(rect.top <= 0 && fixedStream === false){//set fixed
          this.setState({
             fixedStream: true
          })
      }
      if(rect.top >= 0 && fixedStream === true){//set fixed
          this.setState({
             fixedStream: false
          })
      }
      
  }
  componentDidMount(){
      window.addEventListener("scroll", this._onScroll.bind(this));
  }
  componentWillUnmount(){
     window.removeEventListener("scroll", this._onScroll.bind(this));
  }
  _handleClickCard(name, event){
      
      this.setState({
          activeLegislator: name
      })
      
  }
  
  _onChangeMeetFilter(){
    let node = this.refs.meetFilter.getDOMNode();
    console.log(node.value)
    this.setState({
        meetFilterValue: node.value
    })

  }
  _onChangeProcedureFilter(){
    let node = this.refs.procedureFilter.getDOMNode();
    console.log(node.value)
    this.setState({
        procedureFilterValue: node.value
    })
  }
 
  render() {
    const styles = require('./Report.scss');
    const {MaXiRecords} = this.props;
    const {activeLegislator, fixedStream, meetFilterValue, procedureFilterValue, showControls} = this.state;

    let legislatorCardsClasses = classnames({
        [styles.legislatorCards] :true,
        [styles.fixed] : fixedStream
    })
    let legislatorControlClasses = classnames({
        [styles.legislatorControls] :true,
        [styles.fixed] : fixedStream
    })
    let controlBodyClasses = classnames({
        [styles.selectBlocks] : true,
        [styles.show] : showControls,
    })

    let recordStreamClasses = classnames({
        [styles.fixedStream] : fixedStream
    })
    
    return (
    <div className={styles.wrap}>  
        <div className={styles.figTemp}></div>

        <div className={styles.positionSection} ref="positionSection">

            <div className={legislatorCardsClasses}>
              <div className={legislatorControlClasses}>
                  
                  <div className={controlBodyClasses}>
                      <div className={styles.selectBlock}>
                          支持會面
                          <select onChange={this._onChangeMeetFilter.bind(this)}
                                  ref="meetFilter">
                            <option value="all">所有</option>
                            <option value="aye">贊成</option>
                            <option value="nay">反對</option>
                            <option value="unknown">模糊</option>
                            <option value="none">？</option>
                          </select>
                      </div>  
                      <div className={styles.selectBlock}>
                          本次程序
                          <select onChange={this._onChangeProcedureFilter.bind(this)}
                                  ref="procedureFilter">
                            <option value="all">所有</option>
                            <option value="transparent">公開透明</option>
                            <option value="blackbox">黑箱</option>
                            <option value="unknown">模糊</option>
                            <option value="none">？</option>
                          </select>
                      </div>  
                  </div>
              </div>
              <LegislatorCards handleClickCard={this._handleClickCard.bind(this)}
                               activeLegislator={activeLegislator}
                               meetFilterValue={meetFilterValue}
                               procedureFilterValue={procedureFilterValue}/>
            </div>
            <div className={styles.recordStream} >
                <div className={recordStreamClasses}>
                    <RecordStream activeLegislator={activeLegislator}/>
                </div>
            </div>
        </div>
    </div>

    ); 
  }
}
