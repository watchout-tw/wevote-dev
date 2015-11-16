import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import Shell from 'views/Shell/Shell.js';

import Home from 'views/Home/Home.js';

import Report from 'views/Report/Report.js';

import About from 'views/About/About.js';
import Issue from 'views/Issue/Issue.js';

import LegislatorList from 'views/LegislatorList/LegislatorList.js';

import People from 'views/People/People.js';
import PeopleIssue from 'views/PeopleIssue/PeopleIssue.js';

import PartyList from 'views/PartyList/PartyList.js';
import Parties from 'views/Parties/Parties.js';
import Party from 'views/Party/Party.js';
import PartyIssue from 'views/PartyIssue/PartyIssue.js';

import Record from 'views/Record/Record.js';
import Clarify from 'views/Clarify/Clarify.js';

import Subscribe from 'views/Subscribe/Subscribe.js';
import SubscribeState from 'views/SubscribeState/SubscribeState.js';

import Embed from 'views/Embed/Embed.js';
import WithoutFooter from 'views/WithoutFooter/WithoutFooter.js';
import WithAppbarOnly from 'views/WithAppbarOnly/WithAppbarOnly.js';

import MatchGame from 'views/MatchGame/MatchGame.js';
import MatchGameParty from 'views/MatchGameParty/MatchGameParty.js';

import Issues from 'views/Issues/Issues.js';
import Constituencies from 'views/Constituencies/Constituencies.js';
import Constituency from 'views/Constituency/Constituency.js';

import NotFound from 'views/NotFound/NotFound.js';

export default function(store) {
  return (
    <Route component={App}>
        <Route path="/embed" component={Embed}/>
        <Route component={WithAppbarOnly}>
            <Route path="/parties/matchgame" component={MatchGameParty}/>
        </Route>
        <Route component={WithoutFooter}>
            <Route path="/subscribe" component={Subscribe}/>
        </Route>
        <Route component={Shell}>
            <Route path="/" component={Home}/>
            
            <Route path="/SP/ma-xi-meet" component={Report}/>
  
            <Route path="/issues/" component={Issues}/>

            <Route path="/constituencies/" component={Constituencies}/>
            <Route path="/constituencies/:area/:areaNo" component={Constituency}/>
            <Route path="/constituencies/:area/:areaNo/matchgame" component={MatchGame}/>
      
            <Route path="/issues/:issueName" component={Issue}/>
            <Route path="/issues/:issueName/:viewName" component={Issue}/>
            
            <Route path="/8th-legislators" component={LegislatorList}/>
            
            <Route path="/people/:peopleId/records/" component={People}/>
            <Route path="/people/:peopleId/records/:issueName" component={PeopleIssue}/>
            
            <Route path="/parties" component={Parties}/>
            
            <Route path="/parties/:partyId/records/" component={Party}/>
            <Route path="/parties/:partyId/records/:issueName" component={PartyIssue}/>
            
            <Route path="/records/:recordId" component={Record}/>
            
            <Route path="/about" component={About}/>
            <Route path="/about/:tabName" component={About}/>
            <Route path="/about/:tabName/:focus" component={About}/>
            
            <Route path="/clarify" component={Clarify}/>
            <Route path="/subscribe/:state" component={SubscribeState}/>
            
            <Route path="/404" component={NotFound}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Route>
  );
}
