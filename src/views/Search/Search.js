import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import classnames from 'classnames';
import PeoplePhoto from '../../components/PeoplePhoto/PeoplePhoto.js';
import eng2cht from '../../utils/eng2cht';
import district2cht from '../../utils/district2cht';
import district_sub2cht from '../../utils/district_sub2cht';
import eng2party_short from '../../utils/eng2party_short';

import getData from '../../data/getData';
const {candidates} = getData();


export default class Search extends Component {
  constructor(props){super(props)

    //建立索引 index
    let searchIndex = this._onCreateSearchIndex();

    this.state = {
      keyword: "",
      keyup: false,
      searchIndex: searchIndex
    }
  }
  _onCreateSearchIndex(){
    let searchIndex = [];
    const pattern=/([A-Z]+)([a-z]+)/;
    Object.keys(candidates)
          .map((peopleId, index)=>{
                let people = candidates[peopleId];
                let engIndex = people.name.search(pattern);
                //有英文姓名，拆成兩半，英文的部分轉小寫
                if(engIndex !== -1){
                    let chtText = people.name.substring(0,engIndex);
                    let engText = people.name.substring(engIndex);
                    engText = engText.toLowerCase();

                    searchIndex.push({
                        id: peopleId,
                        name: chtText
                    })
                    searchIndex.push({
                        id: peopleId,
                        name: engText
                    })
                    
                }else{
                    //只有中文，直接 input
                    searchIndex.push({
                        id: peopleId,
                        name: people.name
                    })
                }
          });
    //console.log(searchIndex);
    return searchIndex;

  }
  _onChange(e){
    //console.log(e.target.value)
    this.setState({
      keyword: e.target.value,
      keyup: false
    })
  }
  _onKeyUp(){
    if(this.state.keyup === false){
        setTimeout(()=>{
          //console.log("timeout")
          this.setState({
            keyup: true
          })
        }, 3000)
    }
    
  }
  render(){
    const styles = require('./Search.scss');
    let {keyword} = this.state;
    const {keyup, searchIndex} = this.state;
    //console.log("keyup:"+keyup)

    let resultArray = [];
    searchIndex.map((value, index)=>{
        let shouldReturn = false;
        if(keyword){
            keyword = keyword.toLowerCase();
            if(value.name.indexOf(keyword)!==-1){
                shouldReturn = true;
            }
        }
        
        if(shouldReturn){
            resultArray.push(candidates[value.id]);
        }

    })

    let resultItems = resultArray.map((people, index)=>{
        return (
            <Link to={`/people/${people.id}/promises/`}
                  className={styles.candidate}
                  key={`${people.id}-${index}`}>
                
                <div className={styles.photo}>
                    <PeoplePhoto id={people.id}/>
                </div>

                <div className={styles.partyItem}>
                    <div className={`${styles.partyFlag} ${styles.small} ${styles[people.party]}`}></div>
                </div>
                <div className={styles.partyText}>{eng2party_short(people.party)}</div>
                     
                <div className={`${styles.nameItem} ${styles.ia} ${styles.black} ${styles.line}`} >
                     {people.name}
                </div>
                <div className={styles.districtInfo}>
                 {district2cht(people.districtArea)}
                 {district_sub2cht(people.districtArea,people.districtNo)}
                </div>
            </Link>
        )
    })

    let noResultText = <div className={styles.noResult}>沒有姓名符合的候選人</div>;
    let resultCount = (resultArray.length > 0) ? <div className={styles.resultCount}>{resultArray.length}個結果</div> : "";
    let indicator = (
        <div className={styles.indicator}>
          <span></span>
          <span></span>
          <span></span>
        </div>
    )
    let bottomInfo;
    if(keyword && resultArray.length === 0){
        bottomInfo = (keyup) ? noResultText : indicator;
    }
    
    let hintText = (keyword) ? "" : "輸入立委姓名";

    return (
      <div className={styles.wrap}>
          <div>
              <h2 className={styles.title}>區域立委候選人・姓名搜尋</h2>
              <input className={styles.input}
                     onChange={this._onChange.bind(this)}
                     onKeyUp={this._onKeyUp.bind(this)}/>
              <div className={styles.inputHint}>{hintText}</div>
          </div>
         
          <div className={styles.resultSection}>  
              {resultCount}           
              {resultItems}
          </div>
          <div>{bottomInfo}</div>

      </div>
    );
  }
}