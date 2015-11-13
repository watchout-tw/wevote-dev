import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import prefixr from 'react-prefixr';

@connect(
    state => ({
                partyBlock: state.partyBlock   
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Parties extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
    this.state = {
      focus: 0,
      windowWidth: 0,
      leftYbase: -10,
      leftYeach: 0,
      leftXbase: -300, /* 捲軸寬度的一半 */
      leftXeach: -300,
      leftZ: 100,
      rightYbase: 10,
      rightYeach: 0,
      rightXbase: -300, /* 捲軸寬度的一半 */
      rightXeach: 300, 
      rightZ: 100
    }
  }

  _onChangeFocus(value, event){
      console.log("set focus to:"+value)
      const maxIndex = Object.keys(this.props.partyBlock).length-1;
      if(value >= 0 && value <= maxIndex){
          this.setState({
            focus: value
          })
      }
  }
  _onUpdate(){
      console.log(this.refs.leftYbase.getDOMNode())
      let leftYbase = Number(this.refs.leftYbase.getDOMNode().value),
          leftYeach = Number(this.refs.leftYeach.getDOMNode().value),
          leftXbase = Number(this.refs.leftXbase.getDOMNode().value),
          leftXeach = Number(this.refs.leftXeach.getDOMNode().value),
          leftZ = Number(this.refs.leftZ.getDOMNode().value),
          rightYbase = Number(this.refs.rightYbase.getDOMNode().value),
          rightYeach = Number(this.refs.rightYeach.getDOMNode().value),
          rightXbase = Number(this.refs.rightXbase.getDOMNode().value),
          rightXeach = Number(this.refs.rightXeach.getDOMNode().value),
          rightZ = Number(this.refs.rightZ.getDOMNode().value);
      this.setState({
          leftYbase: leftYbase,
          leftYeach: leftYeach,
          leftXbase: leftXbase,
          leftXeach: leftXeach,
          leftZ: leftZ,
          rightYbase: rightYbase,
          rightYeach: rightYeach,
          rightXbase: rightXbase, 
          rightXeach: rightXeach,
          rightZ: rightZ
      })
  }
  componentDidMount(){
      this.setState({
          windowWidth: window.innerWidth
      })
  }
  render() {
    const styles = require('./Parties.scss');
    const {partyBlock} = this.props;
    const {focus, windowWidth} = this.state;
    let {
      leftYbase,
      leftYeach,
      leftXbase,
      leftXeach,
      leftZ,
      rightYbase,
      rightYeach,
      rightXbase, 
      rightXeach, 
      rightZ
    } = this.state;

    let partyRollItems = Object.keys(partyBlock).map((partyId, index)=>{
       
        return (
            <PartyRoll key={`party-roll-${partyId}-${index}`}
                       data={partyBlock[partyId]}
                       index={index}
                       focus={focus}
                       onChangeFocus={this._onChangeFocus.bind(this)}

                       leftYbase={leftYbase}
                       leftYeach={leftYeach}
                       leftXbase={leftXbase}
                       leftXeach={leftXeach}
                       leftZ={leftZ}

                       rightYbase={rightYbase}
                       rightYeach={rightYeach}
                       rightXbase={rightXbase}
                       rightXeach={rightXeach}
                       rightZ={rightZ} />
        )
    })
    
    let paramsControl = (
        <div>
            <div className={styles.tempAction}>
                <button onClick={this._onUpdate.bind(this)}>update</button>
            </div>
  
            <div className={styles.control}>
                <div className={styles.controlItem}>
                    <h1>Left</h1>
                    <div>Y rotate base: <input ref="leftYbase" placeholder="-10"/></div>
                    <div>Y rotate eachItem: <input ref="leftYeach" placeholder="0"/></div>
                    <div>X base: <input ref="leftXbase" placeholder="-300"/></div>
                    <div>X each: <input ref="leftXeach" placeholder="-300"/></div>
                    <div>Z translate: <input ref="leftZ" placeholder="100"/></div>
                </div>
                <div className={styles.controlItem}>
                    <h1>Right</h1>
                    <div>Y rotate base: <input ref="rightYbase" placeholder="10"/></div>
                    <div>Y rotate eachItem: <input ref="rightYeach" placeholder="0"/></div>
                    <div>X base: <input ref="rightXbase" placeholder="-300"/></div>
                    <div>X each: <input ref="rightXeach" placeholder="300"/></div>
                    <div>Z translate: <input ref="rightZ" placeholder="100"/></div>
                </div>
            </div>
        </div>
    )
    return (
      <div className={styles.wrap}>
          <div className={styles.partyFlow}>
              {partyRollItems}
          </div>
          <div className={styles.tempAction}>
              <button onClick={this._onChangeFocus.bind(this, focus-1)}>Pre</button>
              <button onClick={this._onChangeFocus.bind(this, focus+1)}>Next</button>        
          </div>
      </div>
    );
  }
}
function calculateTransfromStyle(index, focus, 
                                 leftYbase, leftYeach, leftXbase, leftXeach, leftZ,
                                 rightYbase, rightYeach, rightXbase, rightXeach, rightZ){
      /* 越靠近 focus, rotate 越小 */

      let Y = 0, X = leftXbase, Z = leftZ; /* focus */
      let vertical = 0;

      if(index < focus){
          let diff = focus - index; 
          Y =  leftYbase + diff * leftYeach;
          X =  leftXbase + diff * leftXeach;
          Z =  150;
          vertical = 100;

      }else if(index > focus){
          let diff = index - focus;
          Y = rightYbase - diff * rightYeach;
          X = rightXbase + diff * rightXeach + 200;
          Z = rightZ;
          vertical = 100;
      }

      return prefixr({
        transform: `rotateY(${Y}deg) translate3d(${X}px,${vertical}px,${Z}px)`,
        zIndex: `${ 10- Math.abs(focus-index) }`
      })
}
class PartyRoll extends Component {
  render(){
      const styles = require('./Parties.scss');
      const {data, index, focus, onChangeFocus} = this.props;
      let {
        leftYbase,
        leftYeach,
        leftXbase,
        leftXeach,
        leftZ,
        rightYbase,
        rightYeach,
        rightXbase, 
        rightXeach,
        rightZ
      } = this.props;

      let transformStyle = calculateTransfromStyle(index, focus,
        leftYbase,
        leftYeach,
        leftXbase,
        leftXeach,
        leftZ,
        rightYbase,
        rightYeach,
        rightXbase,
        rightXeach, 
        rightZ
      );

      let rollClasses = classnames({
        [styles.partyRoll] : true,
        [styles.focus] : index === focus
      });
      
      let columnItems = data.list.map((v,i)=>{
          return <li>{v}</li>
      })
      let columnBlockClass = classnames({
          [styles.columnBlock] : true,
          [styles.twoColumn] : data.list.length > 17
      })


      return (
        <div className={rollClasses}
             style={transformStyle}
             onClick={onChangeFocus.bind(null, index)}>
              <h2 className={styles.partyTitle}>
                  {data.title}參戰名單
              </h2>
              <section className={columnBlockClass}>
                  <ol>{columnItems}</ol>
              </section>
        </div>
      )
  }
}
