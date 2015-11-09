import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";

export default class MaXiCastel extends Component {
  render() {
    const styles = require('./MaXiCastle.scss');
    let MaXi = require("./images/castles_maxi.svg");
    return (
        <div className={styles.wrap}>
            <Link className={styles.coverItem}
                  to={`/SP/ma-xi-meet/`}>
                <img src={MaXi} 
                     className={styles.coverImg}/>
                <div>超展開SP：馬習會</div>
            </Link>
        </div>
    );
  }
}
