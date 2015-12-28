import records from "./records.js";
import issues from "./issues.js";

import legislators from "./legislators.js";
import candidates from "./candidates.js";
import people from "./people.js";

import parties from "./parties.js";
import partyBlock from "./partyBlock";
import partyPromises from "./partyPromises";

import dataMeta from "./dataMeta";
import FAQ from "./FAQ.js";

export default function get(){
	
    return {
    	records: records(),
    	issues: issues(),

    	legislators: legislators(),
    	candidates: candidates(),
    	people: people(),

    	parties: parties(),
    	partyBlock: partyBlock(),
    	partyPromises: partyPromises(),

        dataMeta: dataMeta(),
        FAQ: FAQ()
    };
}