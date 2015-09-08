import React, {Component, PropTypes} from 'react';


function position_eng_to_cht (position_eng) {
    switch(position_eng){
      case 'for':
        return '贊成';
      case 'against':
        return '反對';
      case 'unknow':
        return '模糊'
    }
}

function position_eng_to_color (position_eng) {
    switch(position_eng){
      case 'for':
        return '#00FFB0';
      case 'against':
        return '#FF0055';
      case 'unknow':
        return '#FFF800'
    }
}

function party_eng_to_cht (party_eng) {
    console.log(party_eng);
    switch(party_eng){
      case 'KMT':
        return '中國國民黨';
      case 'DPP':
        return '民主進步黨';
      case 'PFP':
        return '親民黨';
      case 'TSU':
        return '台灣團結聯盟';
      default:
        return '<未定義的政黨英文>';
    }
}


class Record extends Component {
 
  render() {
    const styles = require('./PartyPositionGroup.scss');
    const {data} = this.props;
    console.log(data);

    return (
      <div className={` ${styles.postionCube}  ${styles[data.Position]}`}>
       
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

  render() {
    const styles = require('./PartyPositionGroup.scss');
    const {data, party} = this.props;

    /*
      計算比例，不確定是不是應該在這裡做
    */
    let count = {}; count.for = 0, count.against = 0, count.unknown = 0;
    let records = data.map((value, index)=>{
        count[value.Position]++;
        return <Record data={value}/>;
    });
    //console.log(count);
    
    /* 換成 array */
    let countSort = [];
    Object.keys(count).map((value, index)=>{
        countSort.push(
        {
          "position": value, 
          "count": count[value]
        }
        );
    });
    //console.log(countSort);

    /* sort */
    countSort.sort((a,b)=>{
      return b.count-a.count;
    });
    // 最高票排在前面
    // console.log(countSort);
    // 中國國民黨
    // xx.xx% 反對xxxxx

    let party_cht = party_eng_to_cht(data[0].Party);
    let percentage = Math.round((countSort[0].count / records.length * 100), -2);
    let position_cht = position_eng_to_cht(countSort[0].position);
    let sentence = `${percentage}% ${position_cht}`;
    let statement = "婚姻不限性別";




    
    /* 寬度是 record 數=> 開根號，round up 到整數 */
    /* $cubeSize: 20px; */
    let width = Math.ceil(Math.sqrt(records.length))*20;

    /* 外面是一個兩倍大的 div，然後做圓弧 */
    let borderWidth = (width>140)? 6:4;

    let cubesWrap = {
      width: width * 2,
      height: width * 2,
      boxShadow: `0px 0px 0px ${borderWidth}px ${position_eng_to_color(countSort[0].position)}`,
      borderRadius: "50%",
      display: "inline-block",
      verticalAlign: "middle",
      position: "relative",
      margin: "20px 20px"
    }

    let cubes = {
      width: width,
      height: width,
      position: "absolute",
      top: width/2,
      left: width/2
    }

    return (
      <div className={styles.wrap}>
        <div>{party_cht}</div>
        <div>{sentence}</div>
        <div>{statement}</div>
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

