import React, {Component} from 'react';

export default class NotFound extends Component {
  render() {
  	const styles = require('./NotFound.scss');

    return (
      <div className={styles.wrap}>
        <h1>糟糕，是 404 ！</h1>
        <p>阿草找不到你要的這個頁面～～</p>
      </div>
    );
  }
}
