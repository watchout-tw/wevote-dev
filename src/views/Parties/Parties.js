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
          focus: "KMT",
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
      this.setState({
          focus: value
      })  
  }
  render() {
    const styles = require('./Parties.scss');
    const {partyBlock} = this.props;
    const {focus, innerWidth} = this.state;
   
    /* current display party */
    let data = partyBlock[focus];
    let columnItems = data.list.map((v,i)=>{
        return <li>{v}</li>
    });
    let columnClasses = classnames({
      [styles.columnBlock] : true,
      [styles.twoColumns] : data.list.length >= 17
    })
    let partyRollItem = (
        <div className={styles.partyRoll}>
              <h2 className={styles.partyTitle}>
                  {data.title}參戰名單
              </h2>
              <section className={columnClasses}>
                  <ol>{columnItems}</ol>
              </section>
        </div> 
    );

    return (
      <div className={styles.wrap}>
          <div className={styles.partyFlow}>
              {partyRollItem}
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

