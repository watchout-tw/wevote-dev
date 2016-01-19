import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

import getFinalMap from '../../utils/getFinalMap';
import eng2cht from '../../utils/eng2cht';

import ResultMap from '../../components/ResultMap/ResultMap';

export default class Home extends Component {
  constructor(props){super(props)
    this.state = {
      data : getFinalMap()
    }

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
    const {data} = this.state;

    //console.log(JSON.stringify(data));
    //console.log(data);

    let issueBlocks = Object.keys(data).map((issueName,i)=>{
        return <Issue issue={data[issueName]} issueName={issueName}/>
    })
    return (
      <div className={styles.home}>
          <DocumentMeta {...metaData}/>

          <div className={styles.innerWrap}>
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
    const {issue, issueName} = this.props;
    return (
      <div>
          <h2>{eng2cht(issueName)}</h2>
          <ResultMap title="8th" data={issue["8th"]} />
          <ResultMap title="9th" data={issue["9th"]} />
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