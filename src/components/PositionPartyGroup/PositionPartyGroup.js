import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';


class Record extends Component {
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

  render() {
    const styles = require('./PositionPartyGroup.scss');
    const {data} = this.props;
    const {active} = this.state;

    let date = moment.unix(data.date);
    let cubeActiveStyle = "";

    //是否為黨團
    let isCaucus = (data.legislator.indexOf("黨團")!== -1);
    let caucusStyle = isCaucus ? styles.caucus : "";

    if(active)
       cubeActiveStyle = styles.positionCubeActive;

    /* active record */
    let detailText;
    if(active){
          let date = moment.unix(data.date);

          let preview = (data.content.length > 40) ? data.content.slice(0,40)+"..." : data.content;
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
      <div className={styles.positionWrap}>

          {detailText}

          <Link to={`/records/${data.id}`}
                className={` ${styles.positionCube} ${cubeActiveStyle} ${styles[data.party]} ${caucusStyle} `}
                onMouseEnter={this._toggleActive.bind(this, true)}
                onMouseLeave={this._toggleActive.bind(this, false)} >
          </Link>

      </div>
    )
  }

  props = {
    className: ''
  }
}


export default class PositionPartyGroup extends Component {
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
    let recordCount = this.props.data.records.length;
    let cubeSize = 20;

    // 依照資料數量，應該有的大小
    // record 數=> 開根號，round up 到整數
    // 盡量排成正方形
    let originalWidth = Math.ceil(Math.sqrt(recordCount))*cubeSize;

    // boder 目前是 ad-hoc 的兩種寬度，需要再調整
    let borderWidth = Math.ceil(originalWidth/14 < 2 ? 2 : originalWidth/14);//(originalWidth>140)? 6:4;
    let outerCircleSize = originalWidth*2;

    let translateParams;

    // 在畫面夠大的時候，結果的預設值
    let finalWidth = originalWidth;
    let top = originalWidth/2;
    let left = originalWidth/2;

    // 在畫面不夠大的時候，把 viewWidth 算到整數倍的 cubeSize
    // 算到剛好 cubeSize 的倍數是為了之後要 translate 到中間時，比較準確
    viewWidth = Math.floor(viewWidth/cubeSize)*cubeSize;


    // 超過畫面大小，最外圈要 translate
    if(outerCircleSize > viewWidth){
        let translateValue = outerCircleSize/2 - viewWidth/2 + (20);//因為最外面的 wrap 有 20 的 margin;
        translateParams = `translate3d(-${translateValue}px,0,0)`;
    }

    // 需要變成長方形，需要重新計算 top
    if(viewWidth < originalWidth){
       finalWidth = viewWidth;

       let rowCount = viewWidth / cubeSize;
       let height = ( recordCount / rowCount ) * cubeSize;
       top = outerCircleSize/2 - (height/2);
       left = outerCircleSize/2 - (finalWidth/2);
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
    const styles = require('./PositionPartyGroup.scss');
    const {data, issueId, issueStatement} = this.props;
    const layoutMath = this._calculateLayout();

    let title = `我${eng2cht(data.position)}${issueStatement}`;
    if(data.position === "unknown")
      title = "我立場模糊";

    let records = data.records.map((item,index)=>{
      return <Record data={item}
                     key={index} />
    });

    // 外部的大圈
    let outerCircle = {
      width: layoutMath.originalWidth * 2,
      height: layoutMath.originalWidth * 2,
      boxShadow: `0px 0px 0px ${layoutMath.borderWidth}px ${position2color(data.position)}`,
      borderRadius: "50%",
      display: "inline-block",
      verticalAlign: "middle",
      position: "relative",
      margin: '' + (layoutMath.borderWidth) + 'px 0',//"20px 0px",
      transform: layoutMath.translateParams,
      "-ms-transform": layoutMath.translateParams,
      "-webkit-transform": layoutMath.translateParams
    }
    // 包著小方塊的內圈
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
            <div className={styles.margin}>
                <div style={outerCircle}>
                    <div style={innerWrap}>{records}</div>
                </div>
            </div>

        </div>
    );
  }

  props = {
    className: ''
  }
}
