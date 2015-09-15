import { combineReducers } from 'redux';
import counter from './counter';//// will be removed later

import candidates from './candidates';
import issues from './issues';
import parties from './parties';


/* For 每個議題表態的三個不同 view */
import partyView from './partyView';
import legislatorView from './legislatorView';
import positionView from './positionView';

import issueController from './issueController';

/* 單一立委的各議題表態 */
import candidatePositions from './candidatePositions';
/* 單一政黨的各議題表態 */
import partyPositions from './partyPositions';

export default combineReducers({
  candidates,
  counter,
  issues,
  parties,

  partyView,
  legislatorView,
  positionView,

  issueController,

  candidatePositions,
  partyPositions
});
