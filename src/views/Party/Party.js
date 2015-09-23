import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import {setPartyFilter} from '../../ducks/partyPositions';

import PartyProfile from '../../components/PartyProfile/PartyProfile.js';
import PositionSquare from '../../components/PositionSquare/PositionSquare.js';

import eng2url from '../../utils/eng2url';

@connect(
    state => ({
                 legislators: state.legislators,
                 partyPositions: state.partyPositions
               }),
    dispatch => bindActionCreators({setPartyFilter}, dispatch))

export default class Party extends Component {
  static propTypes = {
      setPartyFilter: PropTypes.func.isRequired,
      partyPositions: PropTypes.object.isRequired
  }
  componentWillMount(){
      const { setPartyFilter } = this.props;
      const id = this.props.params.partyId;
      console.log(id)
      setPartyFilter(id);
  }
  componentWillReceiveProps(nextProps){
      
      const id = this.props.params.partyId;
      const nextId = nextProps.params.partyId;

      if(id !== nextId){
          setPartyFilter(id);
      }

  }
  render() {
    const styles = require('./Party.scss');
    const id = this.props.params.partyId;
    const {partyPositions} = this.props;

    

    const positions = partyPositions.data.positions || {};
    
    let issueGroups = Object.keys(positions).map((currentIssue, index)=>{
        //console.log(positions[currentIssue])
        let issueUrl = eng2url(currentIssue);
        return (<div className={styles.issueBlock} key={index} >
                    <PositionSquare issueName={currentIssue}
                                         data={positions[currentIssue]}/>
                    <Link className={styles.seeMore} to={`/parties/${id}/${issueUrl }`}>看更多</Link>
               </div>)
    })

    const metaData = {
      title: `${partyPositions.data.name}議題表態分析-2016立委求職中`,
      description: `${partyPositions.data.name}對於各項重大議題的表態大解析！趕快來看看${partyPositions.data.name}委員在立法院針對下列重大議題有哪些發言！`,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': `${partyPositions.data.name}議題表態分析-2016立委求職中`,
            'og:description': `${partyPositions.data.name}對於各項重大議題的表態大解析！趕快來看看${partyPositions.data.name}委員在立法院針對下列重大議題有哪些發言！`
          }
      }
     
    };

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <PartyProfile id={id}/>
          <div className={styles.issueWrap}> 
            {issueGroups}
          </div>
      </div>
    );
  }
}
