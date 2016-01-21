import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';

import CandidateProfileCards from '../../components/CandidateProfileCards/CandidateProfileCards.js';
import DistrictFlag from '../../components/DistrictFlag/DistrictFlag.js';
import CandidateCompare from '../../components/CandidateCompare/CandidateCompare.js';

import district2cht from '../../utils/district2cht';
import district_sub2cht from '../../utils/district_sub2cht';

import parseToLegislatorPosition from '../../utils/parseToLegislatorPosition';
import getDistrictCandidates from '../../utils/getDistrictCandidates'; //該區參選人資訊
import getDistrictLegislators from '../../utils/getDistrictLegislators'; //現任立委資訊
import getPeopleTableData from '../../utils/getPeopleTableData';

import getData from '../../data/getData';
const {records, legislators, candidates, issues} = getData();

export default class Constituency extends Component {

  constructor(props){ super(props)
    const {area, areaNo} = props.params;

    let legislatorPositions = parseToLegislatorPosition(records, issues, legislators);
    let candidateList = getDistrictCandidates(candidates, area, areaNo);/* Object */
    let tableData = getPeopleTableData(legislatorPositions, candidateList);
    let legislatorList = getDistrictLegislators(legislators, area, areaNo);

    let allCandidates = [];
    let comparableCandidates = [];//有過去紀錄 or 有未來承諾的候選人, 目前沒用到
    let noDataCandidates = [];

    //console.log(tableData)
    let replyCount = 0;
    let hasPositionDataCount = 0;
    candidateList.map((people, index)=>{
        var combined = {
          id: people.id,
          name: people.name,
          number: people.number,
          isElected: people.isElected,
          party: people.party,
          hasReply: people.hasReply,
          positions: tableData[people.id].positions,
          bills: people.bills,
          contactAvaliable: people.contactAvaliable
        };
        allCandidates.push(combined);
        if(people.hasReply){
           replyCount++;
        }
        if(people.hasReply || legislators[people.id]){//已回覆，或者是第八屆立委
            comparableCandidates.push(combined);
            hasPositionDataCount++;
        }else{
            noDataCandidates.push(combined);
        }

    })

    this.state = {
        candidateList: candidateList,
        legislatorList: legislatorList,
        allCandidates: allCandidates,
        comparableCandidates: comparableCandidates,
        noDataCandidates: noDataCandidates,
        replyCount: replyCount,
        hasPositionDataCount: hasPositionDataCount
    }
  }

  render() {
    const styles = require('./Constituency.scss');
    const {area, areaNo} = this.props.params;
    const {candidateList, legislatorList, allCandidates, comparableCandidates, noDataCandidates,
           replyCount, hasPositionDataCount} = this.state;
    let noItem = (areaNo) ? <div>第{areaNo}選區</div> : "";

    //應選 x 名
    let shouldElect = 1;
    if(["LAB","MAB"].indexOf(area) !== -1){
       shouldElect = 3;
    }

    //本區現任立委
    let currentLegislatorItems = legislatorList.map((people, index)=>{
        let hasResignInfo, separatorItem;
        if(people.hasResigned === true){
           hasResignInfo = "（已離職）";
        }
        if(index !== legislatorList.length -1){
           separatorItem = "、";
        }
        return (
          <span key={index}>
            <Link to={`/people/${people.id}/records/`}
                  className={`${styles.ia} ${styles.black}`}>{people.name}</Link>
            {hasResignInfo}{separatorItem}
          </span>
        )
    })

    //本區當選立委
    let electedCount = 0;
    let electedLegislatorItems = allCandidates.map((people, index)=>{
        let separatorItem = (electedCount > 0) ? "、" : "";
        
        if(people.isElected === true){
            electedCount++;
            return (
              <span key={`elected-${index}`}>
                <Link to={`/people/${people.id}/promises/`}
                      className={`${styles.ia} ${styles.black}`}>{people.name}</Link>
                {separatorItem}
              </span>
            )
        }
    })

    //顯示參選人數跟回覆率
    let replyStatus = (comparableCandidates.length > 0) ? (
      ""
      ): (
      <div className={styles.replyRate}>*本區候選人全員失蹤中，需要你的關心</div>);

    let cardSection = (
      <CandidateCompare area={area}
                        areaNo={areaNo}
                        candidateList={allCandidates}/>
    );
    //協尋中
    let wantedSection = (noDataCandidates.length > 0) ? <Wanted noDataCandidates={noDataCandidates} /> : "";


    //SEO
    const title = `${district2cht(area)}${district_sub2cht(area,areaNo)}立委候選人表態承諾大公開-沃草2016立委出任務`;
    const description = `${district2cht(area)}${district_sub2cht(area,areaNo)}立委候選人參戰名單有誰？想知道候選人對議題有什麼表態立場？又推出了什麼優先推動法案？快來了解{某一區域}候選人的未來承諾，投票前不能錯過的最佳攻略！`;
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description
          }
      }
    };

    return (
      <div className={styles.wrap}>
          <DocumentMeta {...metaData}/>
          <div className={styles.mainContent}>
              <DistrictFlag area={area} areaNo={areaNo} />
              <div className={styles.districtInfo}>
                  <h3 className={styles.electCount}>{allCandidates.length}人參選，已選出{shouldElect}位勇者：{electedLegislatorItems}</h3>
                  <div className={styles.currentLegislators}>
                      第八屆代表：{currentLegislatorItems}
                  </div>
              </div>
              {replyStatus}
              {cardSection}
              {wantedSection}
          </div>
          <div className={styles.bgHolder}></div>

      </div>
    );
  }
}
class Wanted extends Component {
  render(){
      const {noDataCandidates} = this.props;
      const styles = require('./Constituency.scss');

      let missingTitle = require("./images/missing.svg");
      //沒有資料的立委們
      let noDataCandidateItems = noDataCandidates.map((people, index)=>{
          let separatorItem;
          if(index !== noDataCandidates.length -1){
             separatorItem = "、";
          }
          return (
            <span className={styles.noDataCandidate}>
                <div className={styles.partyItem}>
                    <div className={`${styles.partyFlag} ${styles.small} ${styles[people.party]}`}></div>
                </div>
                <Link to={`/people/${people.id}/promises/`}
                      className={`${styles.nameItem} ${styles.ia} ${styles.black}`} >{people.name}
                </Link>
                {separatorItem}
            </span>
          );
      });

      return (
          <div className={styles.partyRoll}>
              <div className={`${styles.partyRollEndpoint} ${styles.top}`}>
                  <img src={missingTitle}
                       className={styles.missingTitle}/>
              </div>
              <div className={styles.partyRollMain}>
                  <div className={styles.missingText}>
                      <div className={styles.largeText}>{noDataCandidates.length}</div>
                      <div className={styles.smallText}>人失蹤中</div>
                  </div>
                  <div className={styles.intro}>
                      <p>以下候選人並非第八屆立委，沒有過去表態紀錄，目前也尚未回覆表態承諾書。</p>
                      <p>失蹤的候選人，需要你的關心，讓更多選民認識他們。</p>
                  </div>
                  {noDataCandidateItems}
                  <div className={styles.wantedLinkWrap}>
                    <Link className={styles.wantedLink}
                          to={`/wanted/`}>前往協尋</Link>
                  </div>
              </div>
              <div className={`${styles.partyRollEndpoint} ${styles.bottom}`}></div>
          </div>
      )
  }
}
