import { combineReducers } from 'redux';

import candidates from './candidates';
import counter from './counter';
import issues from './issues';

import partyView from './partyView';
import legislatorView from './legislatorView';
import positionView from './positionView';

import issueController from './issueController';

export default combineReducers({
  candidates,
  counter,
  issues,

  partyView,
  legislatorView,
  positionView,

  issueController
});
