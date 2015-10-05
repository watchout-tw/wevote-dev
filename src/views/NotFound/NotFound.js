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
            	<div className={styles.title}>404! 這裡沒有任務!</div>
            	<div className={styles.meta}>（但是有一個任務傳送門）</div>
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
