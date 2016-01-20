import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

import getFinalMap from '../../utils/getFinalMap';
import eng2cht from '../../utils/eng2cht';
import cht2eng from '../../utils/cht2eng';
import eng2url from '../../utils/eng2url';
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
        activeAreaNo: "",
        x: 0,
        y: 0,
        activeIssue: "marriageEquality",
        viewWidth: ""
      }
  }
  componentDidMount(){
    let w = window.innerWidth;
    this.setState({
        viewWidth: w
    })
  }
  _setActive(area, areaNo, x, y){
      this.setState({
        activeArea: area,
        activeAreaNo: areaNo,
        x: x,
        y: y
      })
      //console.log("**"+area+", "+areaNo+"**")
  }
  _getLegislatorParty(name){
      let id = people_name2id(name);
      let parties = legislators[id].parties;
      let party = cht2eng(parties[parties.length - 1].partyCht);
      return party;
  }
  _resetActive(){
      this.setState({
        activeArea: "",
        activeAreaNo: ""
      })
  }
  _onSetActiveIssue(name, e){
      this.setState({
          activeIssue: name
      })
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
    const {data, activeArea, activeAreaNo, x, y, activeIssue, viewWidth} = this.state;
    let fixTopBlock = <div className={styles.fixedTop}></div>;
    let legislator8th = {}, legislator9th = {};
    if(activeArea && activeAreaNo){

        legislator8th.name = (data.marriageEquality["8th"][activeArea][activeAreaNo]) ? data.marriageEquality["8th"][activeArea][activeAreaNo].legislator : "無";
        legislator9th.name = data.marriageEquality["9th"][activeArea][activeAreaNo].legislator;
  
        legislator8th.id = people_name2id(legislator8th.name);
        legislator9th.id = people_name2id(legislator9th.name);
  
        legislator8th.party = eng2cht(this._getLegislatorParty(legislator8th.name));
        let id9th = people_name2id(legislator9th.name);
        legislator9th.party = eng2cht(candidates[id9th].party);
  
        /////
        let coordinateX = x + 110, coordinateY = y+50;
        if(coordinateX < 0){
            coordinateX = 0;
        }
        if(coordinateX > viewWidth - 220){
            coordinateX = viewWidth - 220;
        }
        ////名字太長
        let displayName8th = legislator8th.name;
        let displayName9th = legislator9th.name;
        if(displayName8th === "鄭天財Sra·Kacaw"){
           displayName8th = "鄭天財";
        }
        if(displayName9th === "鄭天財Sra·Kacaw"){
           displayName9th = "鄭天財";
        }
        //
        //避免  無 -> 丁守中, ad-hoc quick fix
        let peopleBefore = (
            <div className={styles.peopleItem}>
                <div className={`${styles.peopleAvatar} ${styles[cht2eng(legislator8th.party)]}`}>
                    <PeoplePhoto id={legislator8th.id}/>
                </div>
                <b>{displayName8th}</b>
                <div>{legislator8th.party}</div>
            </div>
        );
        if(legislator8th.id === "1" && legislator8th.name !== "丁守中"){
          peopleBefore = (
            <div className={styles.peopleItem}>
                <div className={`${styles.peopleAvatar} ${styles.noPeople}`}>
                </div>
                <b>{displayName8th}</b>    
            </div>
          );
        }

        //
        let arrowImg = require("./images/icon_arrow.svg");

        fixTopBlock = (
            <div className={`${styles.fixedTop} ${styles.active}`}> 
                <div className={styles.districtTitle}>
                    {district2cht(activeArea)}{district_sub2cht(activeArea,activeAreaNo)}
                </div>
                {peopleBefore}
                <img src={arrowImg} className={styles.arrowImg} />
                <div className={styles.peopleItem}>
                    <div className={`${styles.peopleAvatar} ${styles[cht2eng(legislator9th.party)]}`}>
                        <PeoplePhoto id={legislator9th.id}/>
                    </div>
                    <b>{displayName9th}</b>
                    <div>{legislator9th.party}</div>
                </div>
            </div>
        );
    }
    let issueController = (viewWidth >= 800) ? Object.keys(data).map((issueName,i)=>{
        return (
          <div className={`${styles.issueTab} ${(issueName===activeIssue)?styles.active:""}`}
               onClick={this._onSetActiveIssue.bind(this, issueName)}>
              {eng2cht(issueName)}
          </div>
        );      
    }): "";
    let issueBlocks = Object.keys(data).map((issueName,i)=>{
        if(issueName===activeIssue || viewWidth < 800){
            //目前 active 的議題或者手機版
            return  <Issue issue={data[issueName]} issueName={issueName} 
                           setActive={this._setActive.bind(this)}
                           resetActive={this._resetActive.bind(this)}
                           activeArea={activeArea} activeAreaNo={activeAreaNo}
                           viewWidth={viewWidth}/>
        }      
    })
    return (
      <div className={styles.home}>
          <DocumentMeta {...metaData}/>

          <div className={styles.innerWrap}>
              <header className={styles.header}>
                  <h1 className={styles.title}>新國會議題地圖解密：<br/>一分鐘看懂議題表態變化</h1>
                  <p className={styles.intro}>2016關鍵大戰結束，議題板塊有什麼變化呢？贊成/反對的勢力如何消長？你家選區的議題表態翻盤了嗎？讓我們來看看選前選後各區域立委的表態！</p>
                  <p className={styles.meta}>資料統計說明：選前地圖表態資料，根據過去第八屆各選區立委在立法院的發言、提案、表決等官方紀錄；選後地圖表態資料，根據各選區立委當選人所回覆問卷之表態紀錄，統計至 2016.1.16 為止。</p>
                  <div className={styles.legend}>
                      <b>圖例說明</b>
                      <div className={styles.positions}>
                          <div className={styles.position}>
                              <div className={`${styles.cube} ${styles.aye}`}></div>
                              <div className={styles.legendText}>贊成</div>
                          </div>
                          <div className={styles.position}>
                              <div className={`${styles.cube} ${styles.nay}`}></div>
                              <div className={styles.legendText}>反對</div>
                          </div>
                          <div className={styles.position}><div className={`${styles.cube} ${styles.none}`}></div>
                              <div className={styles.legendText}>未表態｜不表態｜模糊</div>
                          </div>
                      </div>
                  </div>
              </header>
              
              {issueController}
              <div className={styles.issueBlocks}>
                {fixTopBlock}
                {issueBlocks}
              </div>
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
    const {issue, issueName, setActive, resetActive, activeArea, activeAreaNo, viewWidth} = this.props;
    let issueTitle = (viewWidth < 800) ? <h3 className={styles.issueTitle}>{eng2cht(issueName)}</h3> : "";
    return (
      <div className={styles.issue}>
          {issueTitle}
          <KeyPoints issueName={issueName} viewWidth={viewWidth}/>
          <div className={styles.mapWrap}>
              <div className={styles.maps}>
                  <ResultMap title="8th" data={issue["8th"]} setActive={setActive} resetActive={resetActive}
                             activeArea={activeArea} activeAreaNo={activeAreaNo} 
                             viewWidth={viewWidth}/>
                  <ResultMap title="9th" data={issue["9th"]} setActive={setActive} resetActive={resetActive}
                             activeArea={activeArea} activeAreaNo={activeAreaNo} 
                             viewWidth={viewWidth}/>
              </div>
          </div>
          <Link to={`/issues/${eng2url(issueName)}/`}
                className={styles.goToIssue}>深入了解【{eng2cht(issueName)}】議題</Link>
      </div>
    );
  }
}
class KeyPoints extends Component {
  render(){
    const styles = require('./Home.scss');
    const {issueName, viewWidth} = this.props;
    let data = KeyPointsData[issueName];
    let content;
    if(data){
        let inner = data.map((item,i)=>{
           return <li key={`${issueName}-${i}`}>{item}</li>
        })
        let titleText = (viewWidth >= 800) ? `${eng2cht(issueName)}・觀戰重點` : "觀戰重點";
        content = (
          <div>
              <h3 className={styles.keypointsTitle}>{titleText}</h3>
              <ol>{inner}</ol>
          </div>
        );
    }
    return (
        <div className={styles.keypointsWrap}>{content}</div>
    )
  }
}
const KeyPointsData = {
    "marriageEquality" : [
      "贊成立委由5位提升到16位，大量集中在台北市、新北市。",
      "過去態度為反對者幾乎全部落選，僅原住民立委孔文吉成功連任。",
      "願意承諾贊成的立委當選人中，國民黨僅一位蔣萬安、時代力量三位全部贊成、其餘均為民進黨。",
      "贊成立委人數雖大幅提升，但是不表態立委人數仍然很多，超過七成。",
      "現在承諾中完全沒有表態反對的立委，可能因為抱持反對立場的立委比較不願意回覆問卷。"
    ],
    "recall" : [
      "贊成立委人數明顯提升，且集中在台北市、新北市、台中市、台南市、高雄市等都會地區，或許因為都會地區候選人回覆問卷意願較高。",
      "苗栗陳超明、台中江啟臣，現在雖未回覆，但過去態度為反對。",
      "部分過去態度為贊成的立委，現在並未回覆。",
      "現在承諾中完全沒有表態反對的立委，可能因為抱持反對立場的立委比較不願意回覆問卷。"
    ],
    "referendum" : [
      "贊成立委人數明顯提升，且集中在台北市、新北市、台中市、台南市、高雄市等都會地區，或許因為都會地區候選人回覆問卷意願較高。",
      "過去態度為反對者如張慶忠、盧嘉辰、徐欣瑩，本次皆未參選或落選。",
      "部分過去態度為贊成的立委，現在並未回覆。",
      "現在承諾中完全沒有表態反對的立委，可能因為抱持反對立場的立委比較不願意回覆問卷。"
    ],
    "nuclearPower" : [
      "有核電廠的新北市第一選區、第十二選區、屏東縣第三選區，當選立委皆願意承諾核四停建。",
      "費鴻泰、賴士葆、蔣乃辛等多位立委，現在雖未回覆，但過去態度為反對。",
      "部分過去態度為贊成的立委，現在並未回覆。",
      "現在承諾中完全沒有表態反對的立委，可能因為抱持反對立場的立委比較不願意回覆問卷。"
    ],
    "courseGuide" : [
      "贊成立委人數明顯提升，且集中在台北市、新北市、台中市、台南市、高雄市等都會地區，或許因為都會地區候選人回覆問卷意願較高。",
      "過去態度為反對者有蔣乃辛、楊瓊瓔（落選）。",
      "部分過去態度為贊成的立委，現在並未回覆。",
      "現在承諾中完全沒有表態反對的立委，可能因為抱持反對立場的立委比較不願意回覆問卷。"
    ],
    "justiceReform" : [
      "贊成立委人數明顯提升，且集中在台北市、新北市、台中市、台南市、高雄市等都會地區，或許因為都會地區候選人回覆問卷意願較高。",
      "過去態度為反對者，如謝國樑、丁守中、林鴻池、廖正井、呂學樟、林瓊瓔、黃偉哲、林國正，本次皆未參選或落選。",
      "部分過去態度為贊成的立委，現在並未回覆。",
      "現在承諾中完全沒有表態反對的立委，可能因為抱持反對立場的立委比較不願意回覆問卷。"
    ]
}
/*
    marriageEquality : {
        "8th" : {
            "TPE" : {
                "1" : {
                    "legislator" : "丁守中",
                    "position" : "aye"
                },
                "2" : {
    
                }
            }
        },
        "9th" : {
            
        }
    }

*/