import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import cht2eng from '../../utils/cht2eng';
import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';


class Record extends Component {
  static propTypes = {
    data : PropTypes.object.isRequired
  }

  // //設定 initial state
  constructor(props) { super(props)
      this.state = { active: false}
  }
  
  _setActive(value, event){
    this.setState({ active: true });
  }

  _setInactive(){  
    this.setState({ active: false });
  }

  render() {
    const styles = require('./CandidateIssueGroup.scss');
    const {data} = this.props;
    const {active} = this.state;

    let date = moment.unix(data.date);

    let detailText = (active) ? (
      <div className={styles.activeCube}>
           <div>{date.format('YYYY-MM-DD')} / {data.legislator} / {data.meetingCategory}</div>
           <div>{data.content}</div>
      </div>): "";

    return (
      <div className={styles.postionWrap}>
           
           {detailText}

          <div className={` ${styles.positionCube} ${styles[data.position]}`}
               onMouseEnter={this._setActive.bind(this)}
               onMouseLeave={this._setInactive.bind(this)}>
          </div>

      </div>
    )
  }

  props = {
    className: ''
  }
}


export default class CandidateIssueGroup extends Component {
  static propTypes = {
    data : PropTypes.object.isRequired,
    issueName: PropTypes.string.isRequired
  }

  render() {
    const styles = require('./CandidateIssueGroup.scss');
    const {data, issueName} = this.props;
    
    //console.log(data);
    
    /* 這裡是一筆一筆的資料，方框顏色表示立場 */
    let records = data.records.map((item,index)=>{
      return <Record data={item} key={index}/>
    });

    /* 寬度是 record 數=> 開根號，round up 到整數 */
    /* $cubeSize: 20px; */
    let width = Math.ceil(Math.sqrt(records.length))*20;
    // 依照紀錄筆數，設定寬度
    let cubes = {
      width: width,
      height: width,
      display: "inline-block",
      position: "relative"
    }

    let positionCountItems = data.positionCounts.map((item, index)=>{
        return (
          <div className={` ${styles.countItem} ${styles[item.position]} `}
               key={index}>{item.count}</div>
        )
    })

    return (
      <div className={styles.wrap}>
          <div className={styles.title}>{eng2cht(issueName)}</div>
          
          <div className={styles.countWrap}>
            <div className={styles.countTotal}>{data.totalCounts}</div>
            <div>{positionCountItems}</div>
          </div>

          <div className={styles.cubesOuterWrap}>
            <div style={cubes}>{records}</div>
          </div>
      </div>
    );
  }

  props = {
    className: 'CandidateIssueGroup'
  }
}

