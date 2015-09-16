import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

import moment from 'moment';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import position2points from '../../utils/position2points';
import candidates_name2id from '../../utils/candidates_name2id';

import CandidateAvatar from '../../components/CandidateAvatar/CandidateAvatar.js';

class Record extends Component {
  static propTypes = {
    data : PropTypes.object.isRequired
  }


  render() {
    const styles = require('./RecordTable.scss');
    const {data} = this.props;
   
    let date = moment.unix(data.date);

    return (
      <div className={styles.aRecordRow}>        
         <div className={` ${styles.positionCube} ${styles[data.position]}`}></div>
         <Link to={`/records/${data.id}`}
               className={styles.date}>{date.format('YYYY-MM-DD')}</Link>
         <div className={styles.category}>{data.category}</div>

         <Link to={`/candidates/${candidates_name2id(data.legislator)}`} className={styles.avatar}>
              <CandidateAvatar id={candidates_name2id(data.legislator)}/>
              <div className={styles.avatarName}>{data.legislator}</div>
         </Link>
         <div className={styles.content}>{data.content}</div>
      </div>
    )
  }

  props = {
    className: ''
  }
}


export default class RecordTable extends Component {
  static propTypes = {
    setToActiveRecord: PropTypes.func.isRequired
  
  }
  //設定 initial state
  constructor(props) { super(props)
      this.state = {
          categoryFilter: '所有',
          sortingOption: '按時序排',
          ascending: false,
      }
  }
  _setCategoryFilter(value, event){  
    this.setState({ categoryFilter: value });
  }
  _setSortingOption(value, event){  
    if(this.state.sortingOption === value){
      this.setState({ ascending: !this.state.ascending });
    }else{
      this.setState({ sortingOption: value });
    }
    console.log(this.state)
  }
  render() {
    const styles = require('./RecordTable.scss');
    const {data} = this.props;

    const categoryFilters = ['所有','提案','發言','表決'];
    const {ascending, categoryFilter, sortingOption} = this.state;

    const sortingOptions = ['按時序排','按立場排'];
    

    ///////
    let records = data.records
    .filter((item, index)=>{
        if(categoryFilter==='所有'){
            return item
        }else{
            if(item.category === categoryFilter)
                return item;
        }
    })
    .sort((a,b)=>{

        if(sortingOption === '按立場排'){
            if(ascending){
                return position2points(a.position)-position2points(b.position);
            }else{
                return position2points(b.position)-position2points(a.position);
            }

        }else{
            if(ascending){
                return a.date-b.date;
            }else{
                return b.date-a.date;
            }

        }
        
        
    })
    .map((item,index)=>{
        return <Record data={item} key={index}/>
    });


    //////
    let options = categoryFilters.map((v,i)=>{
        let active = (v===categoryFilter) ? styles.controlButtonActive : "";
        return <div className={`${styles.controlButton} ${active}`}
                    key={i} 
                    onClick={this._setCategoryFilter.bind(this,v)}>
                    {v}</div>
    });

    ////
    let sortings = sortingOptions.map((v,i)=>{
        let active = (v===sortingOption) ? styles.sortingButtonActive : "";
        return <div className={`${styles.sortingButton} ${active}`}
                    key={i} 
                    onClick={this._setSortingOption.bind(this,v)}>
                    {v}</div> 
    })

    return (
      <div className={styles.wrap}>
            <div className={styles.controls}>
              {options}
              <div className={styles.sortingButtons}>{sortings}</div>
            </div>
            {records}
      </div>
    );
  }

  props = {
    className: ''
  }
}

