import React, {Component, PropTypes} from 'react';
import cht2eng from '../../utils/cht2eng';
import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';


class Record extends Component {
 
  render() {
    const styles = require('./PartyPositionGroup.scss');
    const {data, setActive, reset} = this.props;
    
    return (
      <div className={` ${styles.postionCube}  ${styles[data.position]}`}
           onClick={setActive}
           onMouseEnter={setActive}
           >
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
  //設定 initial state
  constructor(props) { super(props)
      this.state = {
          activeRecord: ""
      }
  }

  _setActiveRecord(value, event){
    console.log("oh, set active record.")
    console.log(value);
    this.setState({ activeRecord: value });
  }

   _resetActiveRecord(){
    
    this.setState({ activeRecord: "" });
  }

  render() {
    const styles = require('./PartyPositionGroup.scss');
    const {data, issueStatement} = this.props;
    const {activeRecord} = this.state;
    
    let partyTitle = eng2cht(data.party);//KMT->中國國民黨




    /* 這裡是一筆一筆的資料，方框顏色表示立場 */
    let records = data.records.map((item,index)=>{
      return <Record data={item} key={index} 
                     setActive={this._setActiveRecord.bind(this, item)}
                     reset={this._resetActiveRecord.bind(this)}/>
    });

    /*
     * 計算外面的圓圈大小，跟裡面框框集合的寬度
     */

    /* 寬度是 record 數=> 開根號，round up 到整數 */
    /* $cubeSize: 20px; */
    let width = Math.ceil(Math.sqrt(records.length))*20;

    /* 外面是一個兩倍大的 div，然後做圓弧 */
    /* boder 目前是 ad-hoc 的兩種寬度，需要再調整 */ ////////////
    let borderWidth = (width>140)? 6:4;

    // 依照不同的立場設定框框的顏色
    let cubesWrap = {
      width: width * 2,
      height: width * 2,
      boxShadow: `0px 0px 0px ${borderWidth}px ${position2color(data.dominantPosition)}`,
      borderRadius: "50%",
      display: "inline-block",
      verticalAlign: "middle",
      position: "relative",
      margin: "20px 20px"
    }

    // 依照紀錄筆數，設定內圈的寬度
    let cubes = {
      width: width,
      height: width,
      position: "absolute",
      top: width/2,
      left: width/2
    }

    return (
      <div className={styles.wrap}>
        <div>{partyTitle}</div>
        <div>{`${data.dominantPercentage}% ${eng2cht(data.dominantPosition)}`}</div>
        <div>{issueStatement}</div>
        <div style={cubesWrap}>
          <div style={cubes}>{records}</div>
        </div>
        <div className={styles.activeRecord}>
          <div>{activeRecord.date}</div>
          <div>{activeRecord.legislator}</div>
          <div>{activeRecord.content}</div>
          <div>{activeRecord.meetingCategory}</div>
        </div>
      </div>
    );
  }

  props = {
    className: ''
  }
}

