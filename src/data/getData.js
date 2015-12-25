import getRecords from "./getRecords";
import getCandidates from "./getCandidates";

export default function get(){
	
    return {
    	records: getRecords(),
    	candidates: getCandidates()
    };
}