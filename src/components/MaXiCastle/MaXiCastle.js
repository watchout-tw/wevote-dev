import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
export default class MaXiCastel extends Component {
  render() {
    const styles = require('./MaXiCastle.scss');
    const {embed} = this.props;
    let MaXi = require("./images/castles_maxi.svg");
    
    let coverItemClasses = classnames({
      [styles.coverItem]  : true,
      [styles.embed] : embed
    })
    let linkURL = `//wevote.tw/SP/ma-xi-meet/`;

    return (embed === true) ? (
        <div className={`${styles.wrap} ${styles.embed}`}>
            <a className={coverItemClasses}
               href={linkURL}
               target="_blank">
                <img src={MaXi} 
                     className={styles.coverImg}/>
                <div>超展開SP：馬習會</div>
            </a>
        </div>
    ):
    (
        <div className={styles.wrap}>
            <Link className={coverItemClasses}
                  to={`/SP/ma-xi-meet/`}>
                <img src={MaXi} 
                     className={styles.coverImg}/>
                <div>超展開SP：馬習會</div>
            </Link>
        </div>
    );
  }
}
