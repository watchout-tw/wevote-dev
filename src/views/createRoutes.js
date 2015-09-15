import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import Home from 'views/Home/Home.js';
import About from 'views/About/About.js';
import Issue from 'views/Issue/Issue.js';
import CandidateList from 'views/CandidateList/CandidateList.js';
import Candidate from 'views/Candidate/Candidate.js';
import CandidateIssue from 'views/CandidateIssue/CandidateIssue.js';
import PartyList from 'views/PartyList/PartyList.js';


import NotFound from 'views/NotFound/NotFound.js';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/issues/:issueName" component={Issue}/>
      <Route path="/candidates" component={CandidateList}/>
      <Route path="/candidates/:candidateId" component={Candidate}/>
      <Route path="/candidates/:candidateId/:issueName" component={CandidateIssue}/>
      <Route path="/parties" component={PartyList}/>
      <Route path="/about" component={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}

