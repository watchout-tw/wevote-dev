import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";
import moment from 'moment';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import candidates_name2id from '../../utils/candidates_name2id';
/*
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
},
*/
export default class PositionRecord extends Component {
  // static propTypes = {
  //   // count: PropTypes.number,
  //   // increment: PropTypes.func.isRequired,
  //   // className: PropTypes.string
  // }

  render() {
    const styles = require('./PositionRecord.scss');
    const {data} = this.props;
    let { legislator, content, positionJudgement, position, meetingCategory } = data;
    let date = moment.unix(data.date);


    return (
      <div className={styles.wrap}>
        <div><Link to={`/candidates/${candidates_name2id(legislator)}`}
                   className={styles.link}>{legislator}</Link> {positionJudgement}</div>
        <div>{date.format('YYYY-MM-DD')} / {meetingCategory}</div>
        <div>{content}</div>
      </div>
    );
  }

  props = {
    className: ''
  }
}

