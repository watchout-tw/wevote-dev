import React, {Component} from 'react';
export default class Social extends Component {
  render() {
  	const styles = require('./Social.scss');
    return (
        <div className={styles.socialWrap}>
          <p className={styles.urgentText}>戰況緊急<br/>揪團參戰</p>
          <p className={styles.shareText}>按這裡分享</p>
        	<div className='shareaholic-canvas' data-app='share_buttons' data-app-id='21117200'></div>
        </div>
    );
  }
}
