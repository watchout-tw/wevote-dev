import React, {Component, PropTypes} from 'react';
import cht2eng from '../../utils/cht2eng';
import eng2cht from '../../utils/eng2cht';



function position_eng_to_color (position_eng) {
    switch(position_eng){
      case 'aye':
        return '#00FFB0';
      case 'nay':
        return '#FF0055';
      case 'unknown':
        return '#FFF800'
    }
}



class Record extends Component {
 
  render() {
    const styles = require('./PositionPartyGroup.scss');
    const {data} = this.props;
    
    return (
      <div className={` ${styles.postionCube}  ${styles[data.party]}`}>
      
      </div>
    )
  }

  props = {
    className: ''
  }
}


export default class PositionPartyGroup extends Component {
  // static propTypes = {
  //   // count: PropTypes.number,
  //   // increment: PropTypes.func.isRequired,
  //   // className: PropTypes.string
  // }

  render() {
    const styles = require('./PositionPartyGroup.scss');
    const {data, issueStatement} = this.props;
  

    console.log(data);

    

    /* 這裡是一筆一筆的資料，方框顏色表示立場 */
    let records = data.records.map((item,index)=>{
      return <Record data={item} index={index}/>
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
      boxShadow: `0px 0px 0px ${borderWidth}px ${position_eng_to_color(data.position)}`,
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

    let title = `我${eng2cht(data.position)}${issueStatement}`;
    if(data.position === "unknown")
      title = "我立場模糊";


    return (
      <div className={styles.wrap}>
        <div>{title}</div>
      
        <div style={cubesWrap}>
          <div style={cubes}>{records}</div>
        </div>
      </div>
    );
  }

  props = {
    className: ''
  }
}

