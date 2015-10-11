import { combineReducers } from 'redux';

import legislators from './legislators';
import issues from './issues';
import parties from './parties';
import records from './records';
import FAQ from './FAQ';

export default combineReducers({
  legislators,
  issues,
  parties,
  records,
  FAQ
});
