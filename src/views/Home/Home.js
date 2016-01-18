import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import getFinalCompare from '../../utils/getFinalCompare';
import eng2cht from '../../utils/eng2cht';

export default class Home extends Component {
  constructor(props){super(props)
    this.state = {
      data : getFinalCompare()
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

    let positionBlocks = ["aye","nay","unknown","evading","refuse","none"].map((pos,i)=>{
        let position8th = <Position pos={issue["8th"][pos] || []} posName={pos} />;
        let position9th = <Position pos={issue["9th"][pos] || []} posName={pos} />;

        return (
          <div>
            <h3>{pos2cht(pos)}</h3>
            <div className={styles.flexWrap}>
              <div className={styles.flexEven}>{position8th}</div>
              <div className={styles.flexEven}>{position9th}</div>
            </div>
          </div>

        )
    })
    

    // let position8th = Object.keys(issue["8th"]).map((pos, i)=>{
    //     return <Position pos={issue["8th"][pos]} posName={pos} />
    // })

    // let position9th = Object.keys(issue["9th"]).map((pos, i)=>{
    //     return <Position pos={issue["9th"][pos]} posName={pos} />
    // })

    return (
      <div>
          <h2>{eng2cht(issueName)}</h2>
          {positionBlocks}
      </div>
    );
  }
}
class Position extends Component {
  
  render() {
    const styles = require('./Home.scss');
    const {pos, posName} = this.props;
    let details = pos.map((r,i)=>{
        return (
            <div className={`${styles.peopleItem} ${styles[r.party]}`}>
                <div className={styles.peopleName}>{r.name}</div>
                <div className={styles.source}>{r.source}</div>
            </div>
        )
    })
    return (
      <div>
        <div>{pos.length}</div>
        <div className={`${styles.detailBlock}`}>
            {details}
        </div>
      </div>
    );
  }
}
function pos2cht(value){
  switch(value){
    case 'aye':
      return '贊成'
      break;
    case 'unknown':
      return '模糊'
      break;
    case 'nay':
      return '反對'
      break;
    case 'evading':
      return '應表態未表態'
      break;
    case 'none':
      return '未表態'
      break;
    case 'refuse':
      return '不表態'
      break;

  }
}
/*
    marriageEquality : {
        "8th" : {
            "aye" : [{ name:, party:DPP },]
            "unknown" : []
            "nay" : []
            "none" : []
        },
        "9th" : {
            "aye" : [{ name:, party:DPP },]
            "unknown" : []
            "nay" : []
            "none" : []
        }
    }

*/
