import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import Home from 'views/Home/Home.js';
import About from 'views/About/About.js';
import Issue from 'views/Issue/Issue.js';

import LegislatorList from 'views/LegislatorList/LegislatorList.js';

import People from 'views/People/People.js';
import PeopleIssue from 'views/PeopleIssue/PeopleIssue.js';

import PartyList from 'views/PartyList/PartyList.js';
import Party from 'views/Party/Party.js';
import PartyIssue from 'views/PartyIssue/PartyIssue.js';

import Record from 'views/Record/Record.js';

import NotFound from 'views/NotFound/NotFound.js';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/issues/:issueName" component={Issue}/>
      
      <Route path="/8th-legislators" component={LegislatorList}/>
      
      <Route path="/people/:peopleId" component={People}/>
      <Route path="/people/:peopleId/:issueName" component={PeopleIssue}/>
      <Route path="/parties" component={PartyList}/>
      <Route path="/parties/:partyId" component={Party}/>
      <Route path="/parties/:partyId/:issueName" component={PartyIssue}/>
      <Route path="/records/:recordId" component={Record}/>
      <Route path="/about" component={About}/>
      <Route path="/about/:tabName" component={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}

