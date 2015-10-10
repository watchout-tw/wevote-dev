import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import people_name2id from '../../utils/people_name2id';

import PeopleAvatar from '../../components/PeopleAvatar/PeopleAvatar.js';
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
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  constructor(props){super(props)
    this.state = {
      active: false
    }
  }
  _toggleActive(value, event){
    this.setState({
      active: value
    })
  }

  render () {
    const { data, currentIssueName } = this.props;
    const { active } = this.state;
    const styles = require('./PositionLegislatorGroup.scss');
    
    let {id, name, party, records} = data;
    let imgActiveStyle = (active)? styles.avatarImgActive : "";
    
     /* active record */    
    let detailText;
    let recordCount = 0;
    if(records)
        recordCount = records.length;

    if(active===true){
        detailText = ( 
            <div className={styles.activeCube}>
                <div>{name}</div>
                 {recordCount} 筆表態資料  
            </div>
        );
    }

    return (
        <Link to={`/people/${people_name2id(name)}/${currentIssueName}`}
              className={styles.avatarItem}
              onMouseEnter={this._toggleActive.bind(this, true)}
              onMouseLeave={this._toggleActive.bind(this, false)}>
         
          {detailText}
          
          <div className={`${styles.avatarImg} ${imgActiveStyle} ${styles[party]}`}>
            <PeopleAvatar id={people_name2id(name)} />
          </div>
          
        </Link>
    );

  }
}


export default class PositionLegislatorGroup extends Component {
  static propTypes = {
    
    data: PropTypes.object.isRequired,
    issueStatement: PropTypes.string.isRequired
    
  }
  constructor(props){ super(props)
    this.state = {
       viewWidth: ""
    }
  }
  _updateViewWidth(){
    if(window){
        this.setState({
           viewWidth: window.innerWidth
        })
    }
  }

  componentDidMount(){
    this._updateViewWidth();
    window.addEventListener('resize', this._updateViewWidth.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateViewWidth.bind(this));
  }
  _calculateLayout(){
    let viewWidth = this.state.viewWidth;
    let recordCount = this.props.data.legislators.length;
    let cubeSize = 50;

    // 依照資料數量，應該有的大小
    // record 數=> 開根號，round up 到整數
    // 盡量排成正方形
    let originalWidth = Math.ceil(Math.sqrt(recordCount))*cubeSize;
    let outerCircleSize = originalWidth*1.4;

    // boder 目前是 ad-hoc 的兩種寬度，需要再調整
    let borderWidth = (originalWidth>140)? 6:4;


    let translateParams;

    // 在畫面夠大的時候，結果的預設值
    let finalWidth = originalWidth;
    let top = originalWidth/5;///5 is ad-hoc /// NeedFix
    let left = originalWidth/5;

    // 在畫面不夠大的時候，把 viewWidth 算到整數倍的 cubeSize
    // 算到剛好 cubeSize 的倍數是為了之後要 translate 到中間時，比較準確
    viewWidth = (viewWidth/cubeSize)*cubeSize;

    // 超過畫面大小，最外圈要 translate
    if(outerCircleSize > viewWidth){
        let translateValue = Math.ceil(((originalWidth * 1.4) - viewWidth ) / 2 / cubeSize) * cubeSize;
        translateParams = `translate3d(-${translateValue}px,0,0)`;
    }

    // 需要變成長方形，需要重新計算 top, left
    if(viewWidth < originalWidth){
       finalWidth = Math.floor(viewWidth / cubeSize) * cubeSize;
       
       let rowCount = Math.floor(viewWidth / cubeSize);
       let height = Math.ceil(recordCount / rowCount) * cubeSize;

       top = outerCircleSize/2 - (height/2);

       //left 另外要加上「放不下的空間 / 2」
       let unusedSpace = viewWidth - (Math.floor(viewWidth / cubeSize) * cubeSize);
       left = outerCircleSize/2 - (viewWidth/2) + (unusedSpace/2);
       
    }

    let result = {
       originalWidth: originalWidth,
       finalWidth: finalWidth,
       top: top,
       left: left,
       borderWidth: borderWidth,
       translateParams: translateParams
    };
    //console.log(result)

    return result;
  }

  render() {
    const styles = require('./PositionLegislatorGroup.scss');
    const {data, currentIssueName, issueStatement} = this.props;
    const layoutMath = this._calculateLayout();

    let title = `我${eng2cht(data.position)}${issueStatement}`;
    if(data.position === "unknown")
      title = "我立場模糊";
    if(data.position === "evading")
      title = "我應該表態\n卻沒有表態"

    /* 這裡是立委們 */
    let legislators = data.legislators.map((item,index)=>{
      return <LegislatorAvatar 
              data={item} key={index} 
              currentIssueName={currentIssueName}/>
    });

   
    // 外部的大圈
    let outerCircle = {
      width: layoutMath.originalWidth * 1.4,
      height: layoutMath.originalWidth * 1.4,
      boxShadow: `0px 0px 0px ${layoutMath.borderWidth}px ${position2color(data.position)}`,
      borderRadius: "50%",
      display: "inline-block",
      verticalAlign: "middle",
      position: "relative",
      margin: "20px 0px",
      transform: layoutMath.translateParams,
      "-ms-transform": layoutMath.translateParams,
      "-webkit-transform": layoutMath.translateParams
    }
    // 包著單一立委的內圈
    let innerWrap = {
      width: layoutMath.finalWidth,
      height: layoutMath.finalWidth,
      position: "absolute",
      top: layoutMath.top,
      left: layoutMath.left
    }

    return (
      <div className={styles.wrap}>
            <div className={styles.header}>
                {title}
            </div>
            <div style={outerCircle}>
                <div style={innerWrap}>{legislators}</div>
            </div>    
      </div>
    );
  }

  props = {
    className: ''
  }
}

