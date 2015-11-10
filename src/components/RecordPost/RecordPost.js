import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';

import handlePos from '../../utils/handlePos';

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class RecordPost extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)

  }
  render() {
    const styles = require('./RecordPost.scss');
    const {totalLength, r} = this.props;
    let date = moment.unix(r.date);
        let postClasses = classnames({
          [styles.recordPost] :  true,
          [styles.multiple]   :  totalLength > 1
        })
        return (
            <div className={postClasses}>
                <div className={styles.recordMeta}>{`${date.format('YYYY-MM-DD')} ${r.meeting}`}</div>
                <div className={styles.quote}>
                    {r.content}
                </div>
                <div className={styles.recordPosisition}>
                    <div className={`${styles.recordPosisitionTitle} ${styles.recordPosisitionRow}`}>本則表態立場</div>
                    <div className={styles.recordPosisitionRow}>支持會面：{handlePos(r.supportMaXiMeet)}</div>
                    <div className={styles.recordPosisitionRow}>本次程序：{handlePos(r.positionOnProcedure)}</div>
                </div>
                <div className={styles.recordSource}>
                    <a  className={`${styles.ia} ${styles.bright}`}
                        target="_blank"
                        href={r.sourceURL}>資料來源</a></div>
            </div>
        )
  }
}
