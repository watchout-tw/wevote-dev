import { combineReducers } from 'redux';

import counter from './counter';
import issues from './issues';
import candidates from './candidates';

export default combineReducers({
  counter,
  issues,
  candidates
});
