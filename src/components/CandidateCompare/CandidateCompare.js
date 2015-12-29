import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';

import people_name2id from '../../utils/people_name2id';
import identity_district from '../../utils/identity_district';
import eng2cht from '../../utils/eng2cht';
import countLevel from '../../utils/countLevel';

import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';
import PartyFlag from '../../components/PartyFlag/PartyFlag.js';

import getData from '../../data/getData';
const {legislators, people} = getData();

export default class CandidateCompare extends Component {
  constructor(props){super(props)
    this.state = {
        pkCategory: "position",
        filter : true
    }
  }
  _toggleCategory(){
    const {pkCategory} = this.state;
    if(pkCategory==="position"){
      this.setState({
        pkCategory: "bill"
      })
    }else{
      this.setState({
        pkCategory: "position"
      })
    }
  }
  _toggleFilter(){
    this.setState({
      filter: !this.state.filter
    })
  }

  render() {
    const styles = require("./CandidateCompare.scss");
    const {candidateList, area, areaNo} = this.props;
    const {pkCategory, filter} = this.state;


    let candidateCardItems = candidateList
    .filter((people, index)=>{

        if(filter===true){//so many if that i wanna kill myself...
            if(pkCategory==="position"){
                if(people.hasReply || legislators[people.id]){
                   return true;
                }else{
                   return false;
                }
            }else{
                if(people.hasReply){
                   return true;
                }else{
                   return false;
                }

            }
        }else{
          return true;
        }

    })
    .map((people, index)=>{
        return (
              <Card people={people}
                    area={area}
                    areaNo={areaNo}
                    pkCategory={pkCategory}
                    key={`candiate-compare-card-${people.id}-${pkCategory}`}/>
        );
    })

    let legendRecord = require('./images/legend_record.svg');
    let legendPromise = require('./images/legend_promise.svg');


    return (
        <div className={styles.wrap}>
            <div className={styles.actionPanel}>
                <div className={`${styles.actionSet}`}>
                    <div className={`${styles.toggleButton} ${ (pkCategory==="position") ? styles.active:"" }`}
                         onClick={this._toggleCategory.bind(this)}>立場PK</div>
                    <div className={`${styles.toggleButton} ${ (pkCategory==="bill") ? styles.active:"" }`}
                         onClick={this._toggleCategory.bind(this)}>法案PK</div>
                  </div>
                <div className={`${styles.actionSet}`}>
                    <div className={`${styles.toggleButtonB} ${ (filter===true) ? styles.active:"" }`}
                         onClick={this._toggleFilter.bind(this)}>只顯示有資料的</div>
                    <div className={`${styles.toggleButtonB} ${ (filter===false) ? styles.active:"" }`}
                         onClick={this._toggleFilter.bind(this)}>顯示所有參選人</div>
                </div>
            </div>
            <div className={`${styles.legend} ${(pkCategory==="position") ? styles.active: ""}`}>
              <img src={legendRecord}/>
              <img src={legendPromise}/>
            </div>
            {candidateCardItems}
        </div>
    );
  }
}

class Card extends Component {
  render() {
    const styles = require("./CandidateCompare.scss")
    const {people, area, areaNo, pkCategory} = this.props;

    /* ------  現任資訊 ------ */
    let currentInfo;//本區現任立委 or 現任立委，但不是本區

    let isCurrent = identity_district(legislators[people.id], area, areaNo);
    if(isCurrent === 'D'){
       currentInfo = <div className={styles.currentInfo} >現任代表</div>;
    }
    if(isCurrent === 'C'){
       currentInfo = <div className={`${styles.currentInfo} ${styles.wide}`} >現任立委（非本區）</div>;
    }

    /* ------  無聯絡資訊 ------ */
    let noContactInfo = (people.contactAvaliable === false) ? (
      <div className={styles.noContactInfo} >無公開聯絡資訊</div>)
    : "";

    /* -------  表態 ------ */
    //表態
    //REFINE: image duplicated with position table
    let imgHub = {};
    imgHub.aye = require("./images/answers_aye.svg")
    imgHub.nay = require("./images/answers_nay.svg")
    imgHub.none = require("./images/answers_unknown.svg")
    imgHub.refuse = require("./images/answers_unknown.svg")

    //console.log(people)

    let positionEntries = Object.keys(people.positions).map((issueName, j)=>{
        let pos = people.positions[issueName];
        let level = countLevel(pos.recordCount);
        let recordClasses = classnames({
          [styles.record] : true,
          [styles.empty] : level==="empty"
        })

        return (
          <div className={styles.position}>
              <div className={styles.issueName}>{eng2cht(issueName)}</div>
              <div className={recordClasses}>
                  <div className={styles.recordDetail}>{handlePosCht(pos.record, people.id)}</div>
                  <div className={`${styles.recordSquare} ${styles[pos.record]} ${styles[level]}`}></div>
              </div>

              <div className={styles.promise}>
                  <div className={`${styles.promiseDetail} ${(pos.promise === "none" || pos.promise === "refuse") ? styles.none : ""}`}>
                      {handlePromiseCht(pos.promise)}
                  </div>
                  <img className={styles.promiseImg} src={`${imgHub[pos.promise]}`} />
              </div>
          </div>
        )
    })


    /* ------  法案 ------ */
    let billItems = (people.bills||[]).map((value, index)=>{
        return (
            <li key={`${people.id}-${index}`}>{value.goal}</li>
        )
    })
    let billSection = (people.bills[0].goal) ? (
        <div className={styles.billSection}>
            <ul className={styles.billList}>{billItems}</ul>
        </div>
    ):<div className={` ${styles.billSection} ${styles.noReply} `}>尚未回覆</div>;

    let content = (pkCategory==="position") ?  <div>{positionEntries}</div> : <div>{billSection}</div>
    return (
        <div className={styles.card}>
            <Link to={`/people/${people.id}/records/`} className={styles.cardLink}>
                <div className={styles.metaInfo}>
                  {currentInfo}
                  {noContactInfo}
                </div>
            
                <div className={styles.peoplePhoto}>
                   <PeoplePhoto id={people.id}/>
                </div>
                <div className={styles.basicInfo}>
                   <div className={styles.peopleNumber}>{people.number}</div>
                   <div className={styles.peopleName}>{people.name}</div>
                   <div className={styles.partyItem}>
                       <div className={`${styles.partyFlag} ${styles.small} ${styles[people.party]}`}></div>
                       <PartyFlag partyId={people.party}/>
                   </div>
                </div>
                <div>{content}</div>
            </Link>
        </div>


    );
  }

}
function handlePosCht (value, id) {
  if(!value){
    return "非第八屆立委"
  }else{
    if(value==="none"){
      return "根據第八屆立院資料統計，未表態"
    }else if(value==="evading"){
      return "根據第八屆立院資料統計，應表態未表態"
    }else{
      return `根據第八屆立院資料統計，立場為${eng2cht(value)}`;
    }
  }
}
function handlePromiseCht (value){
  switch(value){
    case 'refuse':
      return '不表態';
    case 'none':
      return '未回覆';
    case 'aye':
      return '承諾書回覆：支持';
    case 'nay':
      return '承諾書回覆：反對';

    default:
      return eng2cht(value);
  }
}
