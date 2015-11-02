import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import Footer from '../../components/Footer/Footer.js';
import Social from '../../components/Social/Social.js';

import {load} from '../../ducks/candidates.js';

@connect(
    state => ({
                candidates: state.candidates.data
              }),
    dispatch => bindActionCreators({load}, dispatch))

export default class Constituencies extends Component {
  constructor(props){super(props)
    this.state = {
      candidates: ""
    }

  }
  componentWillMount(){
    this.props.load();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.candidates){
      let remoteData = [];
      // when this data was used multitimes, move it to utilities
      nextProps.candidates.value.map((value,index)=>{
          if(value['選區'] === '1'){
              remoteData.push({
                  name: value['姓名'],
                  marriageEquality: {
                    position: value['婚姻平權-立場'],
                    statement: value['婚姻平權-補充意見']
                  }
              })
          }
      })
      this.setState({
        candidates: remoteData
      })
    }
  }
  render() {
    const styles = require('./Constituencies.scss');
    const {load} = this.props;
    const {candidates} = this.state;
    let candidateItem;
    if(candidates){
      candidateItem = candidates.map((value,index)=>{
          return (
            <div key={index}>{value.name}
              <div>婚姻平權立場：{value.marriageEquality.position}</div>
              <div>補充意見：{value.marriageEquality.statement}</div>
            </div>
          )
      })
    }
   
   
    return (
      <div className={styles.constituencies}>
          {candidateItem}
        
        
         <button onClick={load}>Reload from server</button>
      </div>
    );
  }
}


