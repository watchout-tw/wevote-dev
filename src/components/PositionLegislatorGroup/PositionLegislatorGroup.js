import React, {Component, PropTypes} from 'react';
import cht2eng from '../../utils/cht2eng';
import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';

/*
{
    "name": "黃昭順",
    "party": "KMT",
    "records": [
        {
            "id": 1,
            "issue": "婚姻平權",
            "legislator": "黃昭順",
            "party": "KMT",
            "date": 1336665600,
            "category": "發言",
            "content": "本院黃委員昭順，針對近日同性婚姻合法化爭議，認為人生而平等，同性婚姻權益等同於異性之婚姻權，應與其享婚姻中相同的權利與義務，亦應受憲法婚姻自由之保障，對於同性婚姻也應採取理解並尊重之態度，儘速修正相關法令，以期落實平等原則，特向行政院提出質詢。",
            "positionJudgement": "贊成同性婚姻合法化",
            "position": "aye",
            "clarificationContent": "",
            "clarificationLastUpdate": "",
            "lyURL": "http://lci.ly.gov.tw/LyLCEW/communique1/final/pdf/101/32/LCIDC01_1013201.pdf",
            "meeting": "院會",
            "meetingCategory": "院會書面質詢"
        }
    ],
    "dominantPosition": "aye",
    "dominantPercentage": 100
},*/
class LegislatorAvatar extends Component {
  _onClickHandler(){
    
    const { data, setToActiveRecord, setToActiveLegislator } = this.props;
   
    setToActiveLegislator(data.name);
    setToActiveRecord(data.records);

  }

  render () {
    const {data, activeLegislator} = this.props;
    const styles = require('./PositionLegislatorGroup.scss');

    let {party, name} = data;
    let imgURL;

    let imgActiveStyle = (activeLegislator === name)? styles.avatarImgActive : "";
    
    if(activeLegislator === name){
    console.log("****")
    console.log(activeLegislator);
    console.log(name);
    }
    
    try {
      imgURL = require("./images/avatar/"+name+".png");
    }catch(e){
      imgURL = require("./images/default.jpg");
    }
    
    return (
        <img className={`${styles.avatarImg} ${imgActiveStyle} ${styles[party]}`}
             src={imgURL}
             onClick={this._onClickHandler.bind(this)} />
    );

  }
}


export default class PositionLegislatorGroup extends Component {
  // static propTypes = {
  //   // count: PropTypes.number,
  //   // increment: PropTypes.func.isRequired,
  //   // className: PropTypes.string
  // }

  constructor(props) { super(props)
      this.state = {
          active: false
      }
  }
  
  _setActive(value, event){
    this.setState({ active: true });
  }

  _setInactive(){  
    this.setState({ active: false });
  }

  render() {
    const styles = require('./PositionLegislatorGroup.scss');
    const {data, issueStatement, setToActiveRecord, setToActiveLegislator, activeLegislator} = this.props;
    const {active} = this.state;
    
    /* 這裡是立委們 */
    let legislators = data.legislators.map((item,index)=>{
      return <LegislatorAvatar data={item} key={index} 
              setToActiveRecord={setToActiveRecord} setToActiveLegislator={setToActiveLegislator} activeLegislator={activeLegislator}/>
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
      boxShadow: `0px 0px 0px ${borderWidth}px ${position2color(data.position)}`,
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

