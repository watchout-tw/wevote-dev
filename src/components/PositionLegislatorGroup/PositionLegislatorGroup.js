import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import rectInCircleLayout from '../../utils/rectInCircleLayout';

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
    const { data, issueURL } = this.props;
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
        <Link to={`/people/${people_name2id(name)}/records/${issueURL}`}
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
  render() {
    const styles = require('./PositionLegislatorGroup.scss');
    const {data, issueURL, userPosition, issueStatement} = this.props;
    const {parties} = this.props;

    let title = `我${eng2cht(data.position)}${issueStatement}`;
    if(data.position === "unknown")
      title = "我立場模糊";
    if(data.position === "evading")
      title = "我應該表態\n卻沒有表態"

    /* 這裡是立委們 */
    let legislators = data.legislators.map((item,index)=>{
      return <LegislatorAvatar
              data={item} key={index}
              issueURL={issueURL}/>
    });

    const layoutStyles = rectInCircleLayout(
      this.state.viewWidth,
      50,
      this.props.data.legislators.length,
      data.position,
    );

    let userPositionItem;
    if(data.position === userPosition){
       userPositionItem = 
        <div className={styles.userPositionBlock}>
            <div className={styles.userPositionText}>與你立場相同</div> 
        </div>
    }

    return (
      <div className={styles.wrap}>
        {userPositionItem}
        <div className={styles.header}>{title}</div>
        
        <div style={layoutStyles.margin}>
          <div style={layoutStyles.circle}>
            <div style={layoutStyles.rect}>{legislators}</div>
          </div>
        </div>
      </div>
    );
  }

  props = {
    className: ''
  }
}
