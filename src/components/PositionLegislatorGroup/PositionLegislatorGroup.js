import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import rectInCircleLayout from '../../utils/rectInCircleLayout';

import people_name2id from '../../utils/people_name2id';
import PeopleAvatar from '../../components/PeopleAvatar/PeopleAvatar.js';

import {loadCandidates} from '../../ducks/candidates.js';

@connect(
    state => ({ 
      candidates: state.candidates.data
    }),
    dispatch => bindActionCreators({loadCandidates}, dispatch))
export default class PositionLegislatorGroup extends Component {
  constructor(props){ super(props)
      this.state = {
        candidatesLoaded: false,
        candidates: "",
        viewWidth: ""
      }
  }
  componentWillMount(){
    this.props.loadCandidates();
  }
  componentWillReceiveProps(nextProps){
    if( nextProps.candidates){
      this.setState({
          candidatesLoaded: true,
          candidates: nextProps.candidates.value
      })  
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
    const {candidatesLoaded} = this.state;
    if(!candidatesLoaded) return <div></div>;
    
    const styles = require('./PositionLegislatorGroup.scss');
    const {data, issueURL, userPosition, issueStatement} = this.props;
    const {parties} = this.props;
    const {candidates} = this.state;

    let title = `我${eng2cht(data.position)}${issueStatement}`;
    if(data.position === "unknown")
      title = "我立場模糊";
    if(data.position === "evading")
      title = "我應該表態\n卻沒有表態"

    /* 這裡是立委們 */
    let legislators = data.legislators.map((item,index)=>{
      return <LegislatorAvatar data={item} 
                               key={index}
                               issueURL={issueURL}
                               candidates={candidates}/>
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
    const { data, issueURL, candidates } = this.props;
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
            <PeopleAvatar id={people_name2id(name)} candidates={candidates}/>
          </div>
          <div className={styles.avatarName}>{name}</div>

        </Link>
    );

  }
}


