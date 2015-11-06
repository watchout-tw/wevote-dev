import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import LegislatorCards from '../../components/LegislatorCards/LegislatorCards.js';
import RecordStream from '../../components/RecordStream/RecordStream.js';

const breakWebVersion = 500; //跟 scss 同步

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
        fixedStream: false
      }
  }
  _onScroll(){
      let node = this.refs.recordStream.getDOMNode();
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
      console.log("card clicked:"+name)
      if(window.innerWidth < breakWebVersion){//手機版本

      }else{//網頁版本
          this.setState({
              activeLegislator: name
          })
      }
  }
 
  render() {
    const styles = require('./Report.scss');
    const {MaXiRecords} = this.props;
    const {activeLegislator, fixedStream} = this.state;

    let recordStreamClasses = classnames({
        [styles.fixed] : fixedStream
    })
    
    return (
    <div className={styles.wrap}>  
        <div className={styles.figTemp}></div>

        <div className={styles.positionSection}>
            <div className={styles.legislatorCards}>
              <LegislatorCards handleClickCard={this._handleClickCard.bind(this)}
                               activeLegislator={activeLegislator}/>
            </div>
            <div className={styles.recordStream} ref="recordStream">
                <div className={recordStreamClasses}>
                    <RecordStream activeLegislator={activeLegislator}/>
                </div>
            </div>
        </div>
    </div>

    ); 
  }
}
