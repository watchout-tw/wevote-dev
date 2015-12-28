import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import DocumentMeta from 'react-document-meta';

import PositionTable from '../../components/PositionTable/PositionTable';
import BillTable from '../../components/BillTable/BillTable';
import Social from '../../components/Social/Social.js';

import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getPartiesTableData from '../../utils/getPartiesTableData';
import eng2url from '../../utils/eng2url';

export default class PartiesTable extends Component {
  
  render() {
    const styles = require('./PartiesTable.scss');
   
    //seo
    const title = `政黨票投票攻略-各政黨表態及法案大公開-沃草2016立委出任務`;
    const description = `2016立委選舉「政黨票」怎麼投？想知道各政黨對於議題表態與優先法案嗎？各政黨未來承諾大公開，政黨票投票最佳攻略！`;
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description,
            'og:type' : 'website'
          }
      }
    };
    return (
      <div>
          <DocumentMeta {...metaData}/>
          <div className={styles.wrap}>
              <PositionTable unit="parties" />
              <BillTable unit="parties"/>
              <Social />
          </div>
          <div className={styles.bgHolder}></div>
      </div>
    );
  }
}
