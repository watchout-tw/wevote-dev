import React, {Component} from 'react';
export default class Social extends Component {
  render() {
  	const styles = require('./Social.scss');
    return (
        <div className={styles.socialWrap}>
          <a className={styles.watchoutLogo} href="https://www.facebook.com/WatchOutTW" target="_blank"></a>
        </div>
    );
  }
}
