import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import PeopleProfile from '../../components/PeopleProfile/PeopleProfile.js';
import IssueGroup from '../../components/IssueGroup/IssueGroup.js';

import eng2url from '../../utils/eng2url';
import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';

/*
:category => {"records", "promises", "list"}
歷史紀錄
未來承諾
不分區名單
*/

@connect(
    state => ({  
                 legislators: state.legislators,
                 candidates: state.candidates,
                 records: state.records,
                 issues: state.issues,
                 people: state.people
               }),
    dispatch => bindActionCreators({}, dispatch))

export default class People extends Component {
  constructor(props){ super(props)
      this.state = {
        legislatorPositions: parseToLegislatorPosition(props.records, props.issues, props.legislators)
      }
      //console.log(parseToLegislatorPosition(props.records, props.issues, props.legislators))
  }
  render() {
    const styles = require('./People.scss');
    
    const id = this.props.params.peopleId;
    const category = this.props.params.category;

    //立委基本資料
    const {people} = this.props;
    const currentPeople = people[id];

    
    //content
    let content;

    //SEO
    let title, description;

    switch(category){
      case 'records':
        const {legislatorPositions} = this.state;
        const currentLegislatorPosition = legislatorPositions[currentPeople.name];
        
        if(currentLegislatorPosition){//有第八屆的資料
            content = <IssueGroup id={id} currentLegislatorPosition={currentLegislatorPosition}/>
        }else{
            content = <div>無歷史表態紀錄：非第八屆立委。</div>
        }

        //SEO
        title = `${currentPeople.name}戰鬥策略分析-沃草2016立委出任務`;
        description = `${currentPeople.name}對於各項重大議題之城的戰鬥策略大解析！趕快來看看${currentPeople.name}在立法院針對下列重大議題說了些什麽！`;

      break;

      case 'promises':
        content = <PartyPromises id={id} />

        title = `${currentPeople.name}對於議題與法案的未來承諾-沃草2016立委出任務`;
        description = `${currentPeople.name}的未來承諾大公開！趕快來看看${currentPeople.name}各項重大議題的戰鬥策略與優先法案的戰鬥目標！`;
    
      break;

      
    }

   
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description,
            'og:type' : 'website'
          }
      }
    };

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <PeopleProfile id={id} />
          <ul className={styles.innerTag}>
              <li><Link to={`/people/${id}/records/`} 
                        className={ category==="records" ? styles.active : ""}>歷史紀錄</Link></li>
              <li><Link to={`/people/${id}/promises/`} 
                        className={ category==="promises" ? styles.active : ""}>未來承諾</Link></li>
          </ul>

          <div className={styles.innerWrap}>
            {content}
          </div>
          <div className={styles.bottomWrap}>
            <h2>看同選區其他立委</h2>
            非參選人怎麼辦？
          </div>
      </div>
    );
  }
}
