import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';

import classnames from 'classnames';

import eng2party_short from '../../utils/eng2party_short';

/* Stage1: roll */
import PartyRolls from '../../components/PartyRolls/PartyRolls';
/* Stage2: matchgame */
import PartyMatchGame from '../../components/PartyMatchGame/PartyMatchGame';
/* Stage3: bill */
import PartyBills from '../../components/PartyBills/PartyBills';


export default class Parties extends Component {
  constructor(props){ super(props)
        this.state = {
             stage: "initial" /* initial, roll, matchgame, bill */
        }
  }
  _onSetStage(value){
    window.scrollTo(0,0);
    this.setState({
      stage: value
    })
  }
  render() {
    const styles = require('./Parties.scss');
    const {stage} = this.state;
    let content;
    switch(stage){
        case 'initial':
          content = (
            <div div className={styles.initialWrap}>
                <div className={styles.story}>
                  <p>黨團衝突戰，將由各地勇者所組成不同的黨團，以團體戰的方式爭奪立法聖殿中的勇者席位。在這場團體戰鬥中，誰能爭取最多席位，同樣考驗島嶼主人的智慧。</p>
                  <p>挑戰任務即刻啟動！</p>
                  
                </div>
                <div className={styles.actions}>
                    <div className={styles.goMatch}
                         onClick={this._onSetStage.bind(this, "roll")}>進入挑戰</div>
                    <div><Link to={`/parties-table/`}
                          className={styles.goTable}>直接看結果</Link></div>
                </div>
            </div>
            
          );
        break;

        case 'roll':
          content = <PartyRolls onSetStage={this._onSetStage.bind(this)}/>
        break;

        case 'matchgame':
          content = <PartyMatchGame onSetStage={this._onSetStage.bind(this)}/>
        break;

        case 'bill':
          content = (
              <div className={styles.billWrap}>
                  <PartyBills outerLink={true}/>
                  <div className={styles.billComplete}>
                      <div>黨團衝突戰任務完成了！</div>
                  </div>
              </div>
          )
        break;

    }
    /* <div className='shareaholic-canvas' data-app='share_buttons' data-app-id='21117200'></div> prod */

    const title = `政黨票投票攻略-各政黨議題表態大公開-沃草2016立委出任務`;
    const description = `2016立委選舉「政黨票」怎麼投？想知道各政黨的不分區參戰名單嗎？想知道各政黨對於議題表態與優先法案的未來承諾嗎？快來進行政黨成分分析，政黨票投票最佳攻略！`;
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description,
            'og:type' : 'website'
          }
      }
    };
    
    return (
      <div>
          <DocumentMeta {...metaData}/>
          <div className={styles.wrap}>
            <ProgressBar stage={stage} />
            {content}
          </div>
      </div>
    );

  }
}
class ProgressBar extends Component {
    render(){
      const styles = require('./Parties.scss');
      const {stage} = this.props;
      if(stage === "initial") return <div></div>;

      const allStages = [
      {
        "id":"roll",
        "title":"參戰名單" 
      }, 
      { 
        "id":"matchgame",
        "title":"成分分析"
      }, 
      {
        "id":"bill",
        "title":"戰鬥目標"
      }];
      let complete = true;
      let stageItems = allStages.map((s,i)=>{
          let current = false;
          if(s.id === stage){
             complete = false;
             current = true;
          }
          let sClasses = classnames({
            [styles.sItem] : true,
            [styles.complete] : complete === true,
            [styles.current] : current === true
          })
          let cClasses = classnames({
            [styles.circle] : true,
            [styles.complete] : complete === true,
            [styles.current] : current === true
          })
          return (
            <div className={sClasses}>
               <div className={cClasses}></div>
               {s.title}
            </div>
          )
      });
      return (
          <div className={styles.stageWrap}>
              {stageItems}
          </div>
      )
    }
}

