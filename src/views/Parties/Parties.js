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
      innerWidth: 400
    }
  }
  
  componentDidMount(){
    this.setState({
      innerWidth: window.innerWidth
    })
    window.addEventListener('scroll', this._onResize.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this._onResize.bind(this));
  }
  _onResize(){
      this.setState({
        innerWidth: window.innerWidth
      })
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
  
  render() {
    const styles = require('./Parties.scss');
    const {partyBlock} = this.props;
    const {focus, innerWidth} = this.state;
   

    let partyRollItems = Object.keys(partyBlock).map((partyId, index)=>{
       
        return (
            <PartyRoll key={`party-roll-${partyId}-${index}`}
                       data={partyBlock[partyId]}
                       index={index}
                       focus={focus}
                       innerWidth={innerWidth}
                       onChangeFocus={this._onChangeFocus.bind(this)} />
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
    let pageButtons = (
      <div className={styles.tempAction}>
          <button onClick={this._onChangeFocus.bind(this, focus-1)}>Pre</button>
          <button onClick={this._onChangeFocus.bind(this, focus+1)}>Next</button>        
      </div>
    )
    let containerStyle = (innerWidth <= 800) ? {
      width: `${Object.keys(partyBlock).length * (innerWidth-50)}px`,
      marginBottom: "50px"
    }:{};
    return (
      <div className={styles.wrap}>
          <div className={styles.partyFlow}>
            <div style={containerStyle}>
                {partyRollItems}
            </div>
          </div>
          <div className={styles.actions}>
              <Link to={`/parties-matchgame/`}
                    className={styles.goMatch}>進入挑戰</Link>
              <div><Link to={`/parties-table/`}
                    className={styles.goTable}>直接看結果</Link></div>
          </div>
      </div>
    );
  }
}
function calculateTransfromStyle(index, focus, layout){
      /* 越靠近 focus, rotate 越小 */

      let Y = 0, X = layout.leftXbase, Z = layout.leftZ; /* focus */
      let vertical = 0;

      if(index < focus){
          let diff = focus - index; 
          Y =  layout.leftYbase + diff * layout.leftYeach;
          X =  layout.leftXbase + diff * layout.leftXeach;
          Z =  150;
          vertical = 100;

      }else if(index > focus){
          let diff = index - focus;
          Y = layout.rightYbase - diff * layout.rightYeach;
          X = layout.rightXbase + diff * layout.rightXeach + 200;
          Z = layout.rightZ;
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
      const {data, index, focus, innerWidth, onChangeFocus} = this.props;
      
      // width > 800
      let webLayout = {
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
     
      

      let transformStyle = (innerWidth > 800) ? 
          calculateTransfromStyle(index, focus, webLayout):{};

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
