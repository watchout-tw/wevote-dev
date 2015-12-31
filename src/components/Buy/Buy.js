import React, {Component} from 'react';
import classnames from 'classnames';

export default class Buy extends Component {
  constructor(props){ super(props)
    this.state = {
        show: false
    }
  }
  componentDidMount(){
    setTimeout(()=>{
          this.setState({
            show: true
          })

    },1000)
   
  }
  _close(){
    this.setState({ show: false })
  }
  render() {
    const styles = require('./Buy.scss');
    const {show} = this.state;  
    let wrapClasses = classnames({
      [styles.wrap] : true,
      [styles.show] : show === true
    })
    let closeIcon = require("./images/close.svg");
    let mainImg = require("./images/flying.png");
    return (
      <div className={wrapClasses}>
          <img src={closeIcon} 
               className={`${styles.closeIcon} ${styles.webOnly}`} onClick={this._close.bind(this)}/>
          <img src={mainImg} className={styles.mainImg}/>
          <span className={styles.mobileOnly}>
              <a href="http://solda.io/products/47542"
                 target="_blank"
                 className={styles.title}>限量攻略</a>
              </span>
          <span className={styles.webOnly}>
              <a href="http://solda.io/products/47542"
                 target="_blank"
                 className={styles.title}>攻略手冊<br/>限量特賣中</a>
          </span>
      </div>
    );
  }
}
