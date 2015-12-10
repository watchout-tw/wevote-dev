import { combineReducers } from 'redux';

import legislators from './legislators';
import issues from './issues';
import parties from './parties';
import records from './records';
import MaXiRecords from './MaXiRecords';
import FAQ from './FAQ';

import candidates from './candidates';
import people from './people';

import partyBlock from './partyBlock';
import partyPromises from './partyPromises';

import processingState from './processingState';

export default combineReducers({
  legislators,
  issues,
  parties,
  records,
  MaXiRecords,
  FAQ,
  
  candidates,

  partyBlock,
  partyPromises,

  processingState,

  people

});
