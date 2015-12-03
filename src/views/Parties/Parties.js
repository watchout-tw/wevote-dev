import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
          content = <PartyRolls/>
        break;

        case 'matchgame':
          content = <PartiesMatchGame/>
        break;

        case 'bill':
          content = <PartyBills/>
        break;

    }
   
    return <div className={styles.wrap}>{content}</div>;

  }
}

