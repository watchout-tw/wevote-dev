import React, {Component} from 'react';
import {Link} from 'react-router';
export default class NotFound extends Component {
  
 
  render() {
  	const styles = require('./NotFound.scss');
    let door = require('./images/door.png');
    let light = require('./images/light.png');
    return (
        <div className={styles.wrap}>
            <div className={styles.notFoundText}>
            	<div className={styles.title}>這裡發生的事，很恐怖～不要問～</div>
            	<div className={styles.meta}>快點傳送門，回到冒險的一開始吧！</div>
            </div>
            <div className={styles.imgBlock}>
                <Link to={`/`}>
                	<img src={door} 
                         className={styles.door}/>
                </Link>
               
               
                <Link to={`/`}>
                    <img src={light}
           	             className={styles.light}/>
           	    </Link>
           	    
           	</div>
           	
        </div>
    );
  }
}
