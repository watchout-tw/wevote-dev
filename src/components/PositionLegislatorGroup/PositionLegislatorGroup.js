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

class LegislatorAvatar extends Component {
  render () {
    const {data} = this.props;
    const styles = require('./PositionLegislatorGroup.scss');

    let {party, name} = data;
    let imgURL;

    try {
      imgURL = require("./images/avatar/"+name+".png");
    }catch(e){
      imgURL = require("./images/default.jpg");
    }
    
    return (
        <img className={`${styles.avatarImg} ${styles[party]}`}
             src={imgURL} />
    );

  }
}


export default class PositionLegislatorGroup extends Component {
  // static propTypes = {
  //   // count: PropTypes.number,
  //   // increment: PropTypes.func.isRequired,
  //   // className: PropTypes.string
  // }

  render() {
    const styles = require('./PositionLegislatorGroup.scss');
    const {data, issueStatement} = this.props;
    
    //   let partyTitle = eng2cht(data.party);//KMT->中國國民黨
   

    /* 這裡是立委們 */
    let legislators = data.legislators.map((item,index)=>{
      return <LegislatorAvatar data={item} index={index}/>
    });

    /*
     * 計算外面的圓圈大小，跟裡面框框集合的寬度
     */

     /* 寬度是 record 數=> 開根號，round up 到整數 */
     /* $cubeSize: 20px; */
     let width = Math.ceil(Math.sqrt(data.legislators.length))*50;//51 = 40 + 4 + 6, i.e. width + margin + border-width*2

     /* 外面是一個兩倍大的 div，然後做圓弧 */
     /* boder 目前是 ad-hoc 的兩種寬度，需要再調整 */ ////////////
     let borderWidth = (width>140)? 6:4;

    // 依照不同的立場設定框框的顏色
    let cubesWrap = {
      width: width * 1.4,
      height: width * 1.4,
      boxShadow: `0px 0px 0px ${borderWidth}px ${position_eng_to_color(data.position)}`,
      borderRadius: "50%",
      display: "inline-block",
      verticalAlign: "middle",
      position: "relative",
      margin: "20px 20px"
    }

    // 依照紀錄筆數，設定內圈的寬度
    /* /5 是什麼 ad-hoc 的數字⋯⋯ */
    let cubes = {
      width: width,
      height: width,
      position: "absolute",
      top: width/5,
      left: width/5
    }

    let title = `我${eng2cht(data.position)}${issueStatement}`;
    if(data.position === "unknown")
      title = "我立場模糊";


    return (
      <div className={styles.wrap}>
         <div className={styles.title}>{title}</div>
         <div style={cubesWrap}>
            <div style={cubes}>{legislators}</div>
         </div>
      </div>
    );
  }

  props = {
    className: ''
  }
}

