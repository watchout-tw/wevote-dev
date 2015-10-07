import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';


class Record extends Component {
  static propTypes = {
    data : PropTypes.object.isRequired
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
 
  render() {
    const styles = require('./PartyPositionGroup.scss');
    const {data} = this.props;
    const {active} = this.state;
  
    let date = moment.unix(data.date);
  
    let cubeActiveStyle = (active) ? styles.positionCubeActive : "";
    
    //是否為黨團
    let isCaucus = (data.legislator.indexOf("黨團")!== -1);
    let caucusStyle = isCaucus ? styles.caucus : "";

    /* active record */    
    let detailText;
    if(active){
          
          let preview = (data.content.length > 60) ? data.content.slice(0,60)+" ..." : data.content;
          detailText =  (
          <div className={styles.activeBlock}>
              <Link to={`/records/${data.id}`} className={styles.activeCube}>
                  <div className={styles.activeContent}>
                    <div>{date.format('YYYY-MM-DD')} / {data.legislator} / {data.meetingCategory}</div>
                    <div>{preview}</div>
                  </div>
              </Link>
          </div>);
    }
       
 
    return (
      <div className={styles.postionWrap}>
          {detailText}
          
          <Link to={`/records/${data.id}`}
                className={` ${styles.positionCube} ${cubeActiveStyle} ${styles[data.position]} ${caucusStyle }`}
                onMouseEnter={this._toggleActive.bind(this, true)}
                onMouseLeave={this._toggleActive.bind(this, false)}>
          </Link>

      </div>
    )
  }

  props = {
    className: ''
  }
}


export default class PartyPositionGroup extends Component {
  static propTypes = {
   
  }
  constructor(props){ super(props)
    this.state = {
       viewWidth: ''
    }
  }
  _updateViewWidth(){
    console.log("[_updateViewWidth]")
    if(window){
       this.setState({
          viewWidth: window.innerWidth
       })
    }
  }
  componentDidMount(){
    this._updateViewWidth();
     window.addEventListener('resize', this._handleResize.bind(this));
  }
  _handleResize(e){
    this._updateViewWidth();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize.bind(this));
  }
 
  render() {
    const styles = require('./PartyPositionGroup.scss');
    const {data, issueId, issueStatement} = this.props;
    const {viewWidth} = this.state;
    const cubeSize = 20;
    
    let partyTitle = eng2cht(data.party);//KMT->中國國民黨

    /* 這裡是一筆一筆的資料，方框顏色表示立場 */
    let records = data.records.map((item,index)=>{
      return <Record data={item} 
                     key={index} />
    });

    
    /* 計算外面的圓圈大小，跟裡面框框集合的寬度 */

    // 寬度是 record 數=> 開根號，round up 到整數
    let width = Math.ceil(Math.sqrt(records.length))*cubeSize;

    // 外面是一個兩倍大的 div，然後做圓弧
    // boder 目前是 ad-hoc 的兩種寬度，需要再調整
    let borderWidth = (width>140)? 6:4;

    

   

    // 如果圈圈超過畫面寬度，做 translate
    // 同時內部的寬度改成畫面寬度
     
    let translateParams;
    let cubeGroupWidth = width;
    let top = width/2;
    let left = width/2;
    if(width*2 > viewWidth){
        console.log("------------- PartyPositionGroup width > viewWidth ---------------")
        console.log("widht: "+width)
        console.log("viewWidth: "+viewWidth)
        let translateValue = ((width * 2) - viewWidth ) /2;
        translateParams = `translate3d(-${translateValue}px,0,0)`;
        cubeGroupWidth = Math.min(viewWidth, width);// - Math.min(viewWidth, width)%cubeSize;// e.g. 346-6 = 240
    }
    if(viewWidth < width){
       // 變成長方形，需要重新計算 top
       let height = ( records.length / (cubeGroupWidth / cubeSize) ) * 20;
       console.log("*")
       console.log("*")
       console.log("NEW HEIGHT: "+height)
       top = width - (height/2);
       left = width - (cubeGroupWidth/2) - 10;
       console.log("cubeGroupWidth:"+cubeGroupWidth)
       console.log("width:"+width)
       console.log("NEW TOP: "+top)
       console.log("NEW LEFT: "+left)


    }


    // 依照不同的立場設定框框的顏色
    // 外部的大圈
    let outerCircle = {
      width: width * 2,
      height: width * 2,
      boxShadow: `0px 0px 0px ${borderWidth}px ${position2color(data.dominantPosition)}`,
      borderRadius: "50%",
      display: "inline-block",
      verticalAlign: "middle",
      position: "relative",
      margin: "20px 0px",
      transform: translateParams
    }
    

    // 包著小方塊的內圈
    let innerWrap = {
      width: cubeGroupWidth,
      height: cubeGroupWidth,
      position: "absolute",
      top: top,
      left: left,
      paddingRight: "20px"
    }
    

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <Link to={`/parties/${data.party}/${issueId}`}
                      className={styles.partyTitle}>{partyTitle}</Link>
                <div>{`${data.dominantPercentage}% ${eng2cht(data.dominantPosition)}`}</div>
                <div>{issueStatement}</div>
            </div>
            <div style={outerCircle}>
                <div style={innerWrap}>{records}</div>
            </div>
            
        </div>
    );
  }

  props = {
    className: ''
  }
}

