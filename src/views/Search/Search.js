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
    this.state = {
      keyword: "",
      keyup: false
    }
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
    const {keyword,keyup} = this.state;
    //console.log("keyup:"+keyup)

    let resultArray = [];
    Object.keys(candidates)
          .map((peopleId, index)=>{
              let shouldReturn = false;
              if(keyword){
                let people = candidates[peopleId];
                if(people.name.indexOf(keyword)!==-1){
                  shouldReturn = true;
                }
              }
              

              if(shouldReturn){
                resultArray.push(candidates[peopleId]);
              }

          })

    let resultItems = resultArray.map((people, index)=>{
        return (
            <Link to={`/people/${people.id}/promises/`}
                  className={styles.candidate}
                  key={`${people.id}-${i}`}>
                
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
              <h2>區域立委候選人・姓名搜尋</h2>
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