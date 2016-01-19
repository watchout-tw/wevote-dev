import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

import getFinalMap from '../../utils/getFinalMap';
import eng2cht from '../../utils/eng2cht';
import cht2eng from '../../utils/cht2eng';
import district2cht from '../../utils/district2cht';
import district_sub2cht from '../../utils/district_sub2cht';
import people_name2id from '../../utils/people_name2id';

import ResultMap from '../../components/ResultMap/ResultMap';
import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto';

import getData from '../../data/getData';
const {legislators, candidates} = getData();

export default class Home extends Component {
  constructor(props){super(props)
    this.state = {
      data : getFinalMap(),
      activeArea: "",
      activeAreaNo: ""
    }

  }
  _setActive(area, areaNo){
    this.setState({
      activeArea: area,
      activeAreaNo: areaNo
    })
    //console.log("**"+area+", "+areaNo+"**")
  }
  _getLegislatorParty(name){
    let id = people_name2id(name);
    let parties = legislators[id].parties;
    let party = cht2eng(parties[parties.length - 1].partyCht);
    return party;
  }
  render() {
    const title = "沃草！立委出任務 - 2016立委投票攻略";
    const description = "2016立委選舉票該投給誰？「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委與下任候選人立場，並分析政黨對於議題表態和優先法案的未來承諾。想了解你的選區立委嗎？想知道政黨票怎麼投嗎？請上「立委出任務」！";
    const metaData = {
      title: title,
      description: description,
      meta: {
        charSet: 'utf-8',
        'og:title': title,
        'og:description': description,
        'og:type' : 'website'
      }
    };

    //
    const styles = require('./Home.scss');
    const {data, activeArea, activeAreaNo} = this.state;
    let fixTopBlock;
    let legislator8th = {}, legislator9th = {};
    if(activeArea && activeAreaNo){

       legislator8th.name = (data.marriageEquality["8th"][activeArea][activeAreaNo]) ? data.marriageEquality["8th"][activeArea][activeAreaNo].legislator : "無";
       legislator9th.name = data.marriageEquality["9th"][activeArea][activeAreaNo].legislator;

       legislator8th.id = people_name2id(legislator8th.name);
       legislator9th.id = people_name2id(legislator9th.name);

       legislator8th.party = eng2cht(this._getLegislatorParty(legislator8th.name));
       let id9th = people_name2id(legislator9th.name);
       legislator9th.party = eng2cht(candidates[id9th].party);

       fixTopBlock = (
            <div className={styles.fixedTop}>
                <div className={styles.districtTitle}>
                    {district2cht(activeArea)}{district_sub2cht(activeArea,activeAreaNo)}
                </div>
                <div className={styles.peopleItem}>
                    <div>第八屆</div>
                    <div className={`${styles.peopleAvatar} ${styles[cht2eng(legislator8th.party)]}`}>
                        <PeoplePhoto id={legislator8th.id}/></div>
                    {legislator8th.name}
                    <div>{legislator8th.party}</div>
                </div>
                <div className={styles.peopleItem}>
                    <div>第九屆</div>
                    <div className={`${styles.peopleAvatar} ${styles[cht2eng(legislator9th.party)]}`}>
                        <PeoplePhoto id={legislator9th.id}/></div>
                    {legislator9th.name}
                    <div>{legislator9th.party}</div>
                </div>
            </div>
        );
    }
    let issueBlocks = Object.keys(data).map((issueName,i)=>{
        return <Issue issue={data[issueName]} issueName={issueName} setActive={this._setActive.bind(this)}
                      activeArea={activeArea} activeAreaNo={activeAreaNo}/>
    })
    return (
      <div className={styles.home}>
          <DocumentMeta {...metaData}/>

          <div className={styles.innerWrap}>
              {fixTopBlock}
              {issueBlocks}
          </div>
          <div className={styles.invisible}>
              <Link to={`/404`}>404</Link>
              <Link to={`/8th-legislators`}>8th-legislators</Link>
              <Link to ={`/9th-candidates`}>/9th-candidates</Link>
              <Link to={`/embed`}>embed</Link>
          </div>
      </div>
    );
  }
}
class Issue extends Component {
  
  render() {
    const styles = require('./Home.scss');
    const {issue, issueName, setActive, activeArea, activeAreaNo} = this.props;
    return (
      <div>
          <h2>{eng2cht(issueName)}</h2>
          <ResultMap title="8th" data={issue["8th"]} setActive={setActive}
                     activeArea={activeArea} activeAreaNo={activeAreaNo} />
          <ResultMap title="9th" data={issue["9th"]} setActive={setActive}
                     activeArea={activeArea} activeAreaNo={activeAreaNo} />
      </div>
    );
  }
}
/*
    marriageEquality : {
        "8th" : {
            "TPE" : {
                "1" : {
                    "legislator" : "丁守中",
                    "positioin" : "aye"
                },
                "2" : {
    
                }
            }
        },
        "9th" : {
            
        }
    }

*/