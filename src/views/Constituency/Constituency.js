import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import CandidateProfileCards from '../../components/CandidateProfileCards/CandidateProfileCards.js';
import Footer from '../../components/Footer/Footer.js';
import Social from '../../components/Social/Social.js';

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))

export default class Constituency extends Component {
  constructor(props){super(props)
    this.state = {
       degreeY: 0
    }
  }
  componentDidMount(){
      window.addEventListener('mousemove', this._handleMouseMove.bind(this));   
  }
  componentWillUnmount() {
      window.removeEventListener('mousemove', this._handleMouseMove.bind(this));
  }
  _handleMouseMove(e){
      //console.log(`(${e.pageX},${e.pageY})`)
      let midX = window.innerWidth/2;
      let relativeXPos = (e.pageX - midX) / window.innerWidth * 100;
      relativeXPos = relativeXPos/4;
      //console.log("relativeXPos:"+relativeXPos)
      this.setState({
        degreeY: relativeXPos
      })

  }
  render() {
    const styles = require('./Constituency.scss');
    const {area, areaNo} = this.props.params;
    const {degreeY} = this.state;

    let transform = {
      transform: `rotateY(${degreeY}deg) translateZ(00px)`
    }
    return (
      <div className={styles.wrap}>
          <div className={styles.bgWrap}>
              <div className={styles.background}
                   style={transform}></div>
          </div>

          <div className={styles.mainContent}>

              <div className={styles.areaFlag}>
                <div>{area}</div>
                <div>{areaNo}</div>
              </div>
              
                  <CandidateProfileCards area={area}
                                         areaNo={areaNo}/>
              
              <div className={styles.action}>
                  <Link className={styles.actionButton}
                        to={`/constituencies/${area}/${areaNo}/matchgame`}>進入競技場</Link>
                  <div><div className={styles.resultButton}>直接看結果</div></div>
              </div>

          </div>

      </div>
    );
  }
}


