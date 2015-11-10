import { combineReducers } from 'redux';

import legislators from './legislators';
import issues from './issues';
import parties from './parties';
import records from './records';
import MaXiRecords from './MaXiRecords';
import FAQ from './FAQ';

import processingState from './processingState';

import candidates from './candidates';
import candidateDynamicData from './candidateDynamicData';

export default combineReducers({
  legislators,
  issues,
  parties,
  records,
  MaXiRecords,
  FAQ,
  processingState,
  candidates,
  candidateDynamicData
});
