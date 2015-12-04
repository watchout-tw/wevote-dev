import React, {Component} from 'react';
export default class Social extends Component {
  render() {
  	const styles = require('./Social.scss');
    return (
        <div className={styles.socialWrap}>
        	<div class='shareaholic-canvas' data-app='share_buttons' data-app-id='21117200'></div>
          	<a className={styles.watchoutLogo} href="https://www.facebook.com/WatchOutTW" target="_blank"></a>
        </div>
    );
  }
}
