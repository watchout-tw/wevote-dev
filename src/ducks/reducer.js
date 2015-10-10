import { combineReducers } from 'redux';
import counter from './counter';//// will be removed later

import legislators from './legislators';
import issues from './issues';
import parties from './parties';
import records from './records';
import FAQ from './FAQ';

/* 單一立委的各議題表態 */
import legislatorPositions from './legislatorPositions';


export default combineReducers({
  legislators,
  counter,
  issues,
  parties,
  records,

  legislatorPositions,

  FAQ
});
