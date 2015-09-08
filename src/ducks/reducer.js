import { combineReducers } from 'redux';

import candidates from './candidates';
import counter from './counter';
import issues from './issues';
import positionRecords from './positionRecords';

export default combineReducers({
  candidates,
  counter,
  issues,
  positionRecords
});
