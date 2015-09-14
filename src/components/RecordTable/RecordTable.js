import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import cht2eng from '../../utils/cht2eng';
import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';


class Record extends Component {
  static propTypes = {
    data : PropTypes.object.isRequired
  }


  render() {
    const styles = require('./RecordTable.scss');
    const {data} = this.props;
   
    let date = moment.unix(data.date);

    return (
      <div className={styles.aRecordRow}>        
         <div className={` ${styles.positionCube} ${styles[data.position]}`}></div>
         <div className={styles.date}>{date.format('YYYY-MM-DD')}</div>
         <div className={styles.category}>{data.category}</div>
         <div className={styles.content}>{data.content}</div>
      </div>
    )
  }

  props = {
    className: ''
  }
}


export default class PartyPositionGroup extends Component {
  static propTypes = {
    setToActiveRecord: PropTypes.func.isRequired
  
  }

  render() {
    const styles = require('./RecordTable.scss');
    const {data} = this.props;
    
    let records = data.records.map((item,index)=>{
      return <Record data={item} key={index}/>
    });

    return (
      <div className={styles.wrap}>
            {records}
      </div>
    );
  }

  props = {
    className: ''
  }
}

