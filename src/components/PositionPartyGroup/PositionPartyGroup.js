import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import rectInCircleLayout from '../../utils/rectInCircleLayout';

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
  render() {
    const styles = require('./PositionPartyGroup.scss');
    const {data, issueId, issueStatement} = this.props;

    let title = `我${eng2cht(data.position)}${issueStatement}`;
    if(data.position === "unknown")
      title = "我立場模糊";

    let records = data.records.map((item,index)=>{
      return <Record data={item}
                     key={index} />
    });

    const layoutStyles = rectInCircleLayout(
      this.state.viewWidth,
      20,
      this.props.data.records.length,
      data.position,
    );

    return (
      <div className={styles.wrap}>
        <div className={styles.header}>{title}</div>
        <div style={layoutStyles.margin}>
          <div style={layoutStyles.circle}>
            <div style={layoutStyles.rect}>{records}</div>
          </div>
        </div>
      </div>
    );
  }

  props = {
    className: ''
  }
}
