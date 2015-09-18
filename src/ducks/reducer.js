import { combineReducers } from 'redux';
import counter from './counter';//// will be removed later

import legislators from './legislators';
import issues from './issues';
import parties from './parties';
import records from './records';
import FAQ from './FAQ';


/* For 每個議題表態的三個不同 view */
import partyView from './partyView';
import legislatorView from './legislatorView';
import positionView from './positionView';

import issueController from './issueController';

/* 單一立委的各議題表態 */
import legislatorPositions from './legislatorPositions';
/* 單一政黨的各議題表態 */
import partyPositions from './partyPositions';

export default combineReducers({
  legislators,
  counter,
  issues,
  parties,
  records,

  partyView,
  legislatorView,
  positionView,

  issueController,

  legislatorPositions,
  partyPositions,

  FAQ
});
