import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import {setLegislatorFilter} from '../../ducks/legislatorPositions';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';

import PositionSquare from '../../components/PositionSquare/PositionSquare.js';
import RecordTable from '../../components/RecordTable/RecordTable.js';

import url2eng from '../../utils/url2eng';
import eng2cht from '../../utils/eng2cht';

@connect(
    state => ({
                  legislators: state.legislators,
                  legislatorPositions: state.legislatorPositions,
                  issues: state.issues
               }),
    dispatch => bindActionCreators({setLegislatorFilter}, dispatch))

export default class PeopleIssue extends Component {
  static propTypes = {
      setLegislatorFilter: PropTypes.func.isRequired,
      legislatorPositions: PropTypes.object.isRequired
  }
  //設定 initial state
  constructor(props) { super(props)
      this.state = {
          showMenu: false,
      }
  }
  _toggleMenu(){  
    this.setState({ showMenu: !this.state.showMenu });
  }
  componentWillMount(){
      const { legislators, setLegislatorFilter } = this.props;
      const id = this.props.params.peopleId;
      const name = legislators[id].name;
      setLegislatorFilter(name);
  }
  componentWillReceiveProps(nextProps){
      
      const id = this.props.params.peopleId;
      const nextId = nextProps.params.peopleId;

      if(id !== nextId){
          const { legislators, setLegislaotrFilter } = this.props;
          const name = legislators[nextId].name;
          setLegislatorFilter(name);
      }

  }
  render() {
    const styles = require('./PeopleIssue.scss');
    const id = this.props.params.peopleId;
    const issueURL = this.props.params.issueName;


    const {legislatorPositions, issues, legislators} = this.props;
    const issue = issues[issueURL];
    const {showMenu} = this.state;

    const issueDataName = url2eng(issueURL);
    const issueName = eng2cht(issueURL);

    const legislator = legislators[id];
    const {name, partyCht} = legislator;

    if(!legislatorPositions.data.positions) return <div></div>;

    const position = legislatorPositions.data.positions[issueDataName];
    const dominantPosition = legislatorPositions.data.positions[issueDataName].dominantPosition;

    let issueMenu = (showMenu===true) ? (Object.keys(issues).map((currentIssueName,i)=>{
        let active = (issueURL === currentIssueName) ? styles.menuActive : "";
        return  <Link className={` ${styles.menu} ${active}`}
                      to={`/people/${id}/${currentIssueName}`} 
                      key={i}>{issues[currentIssueName].title}</Link>;
        
    })) : "";

    

    /* SEO */

    let description;
    
    switch(dominantPosition){
      case 'unknown':
      description = `${name}對${issue.statement}立場模糊，${name}為${partyCht}立委，為什麼在${issue.statement}上立場模糊？`;
      break;
      
      case 'none':
      description = `${name}沒有針對${issue.statement}的表態資料，${name}為${partyCht}立委，為什麼在${issue.statement}上沒有表態？`;
      break
      
      default://aye, nay
      description = `${name}${eng2cht(dominantPosition)}${issue.statement}，${name}為${partyCht}立委，為什麼${eng2cht(dominantPosition)}${issue.statement}？`;

    }

    const metaData = {
      title: `${name}對於${issueName}的表態-立委求職中`,
      description: description
     
    };
    
   
    return (
      <div className={styles.wrap}> 
          <DocumentMeta {...metaData}/>
          <PeopleProfile id={id} />
    
          <div className={styles.main}>
              <div className={styles.summary}> 
                  <PositionSquare issueName={issueDataName}
                                       data={position} />
                  <div className={styles.menuBlock}>
                      <div className={styles.menuTitle}
                           onClick={this._toggleMenu.bind(this)}>更換議題</div>
                      {issueMenu}
                  </div>
              </div>
              <div className={styles.table}>
                  <RecordTable data={position}/> 
              </div>

          </div>
      </div>
    );
  }
}
