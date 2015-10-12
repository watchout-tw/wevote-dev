import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import rectInCircleLayout from '../../utils/rectInCircleLayout';

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
    const styles = require('./PartyPositionGroup.scss');
    const {data, issueURL, userPosition, issueStatement} = this.props;
    const {parties} = this.props;

    let partyTitle = eng2cht(data.party);//KMT->中國國民黨

    let records = data.records.map((item,index)=>{
      return <Record data={item}
                     key={index} />
    });

    let partyHasPositionPercentage = Math.round((data.hasPositionCount/parties[data.party].hasBeenCount) * 100, 0);
    const layoutStyles = rectInCircleLayout(
      this.state.viewWidth,
      20,
      this.props.data.records.length,
      data.dominantPosition,
      partyHasPositionPercentage
    );


    let userPositionItem;
    if(data.dominantPosition === userPosition){
       let imgURL = require("./images/favicon.png");
       userPositionItem = 
        <div className={styles.userPositionBlock}>
            <div className={styles.userPositionText}>與你立場相同</div>
            <img src={imgURL} className={styles.userPositionImg} />
        </div>
    }

    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          {userPositionItem}
          <Link to={`/parties/${data.party}/records/${issueURL}`} className={`${styles.partyTitle} ${styles.ia} ${styles.bright}`}>{partyTitle}</Link>
          <div className={styles.metaTitle}>{`${partyHasPositionPercentage}%的立委曾經表態`}</div>
          <div className={styles.metaTitle}>表態紀錄中{`${data.dominantPercentage}%${eng2cht(data.dominantPosition)}`}</div>
          
        </div>
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
