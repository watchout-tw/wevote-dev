export default function getPeopleTableData(legislatorPositions, disctrictCandidates){
    let TableData = {};
    let issueList = ["marriageEquality", "recall", "referendum", "nuclearPower", "courseGuide", "justiceReform"];//Hmmm....
    console.log(disctrictCandidates)
    console.log(legislatorPositions)
    
    disctrictCandidates.map((people, index)=>{
        TableData[people.id] = {
            name: people.name,
            id: people.id,
            party: people.party,
            positions: {},
            bills: people.bills
        };

        issueList.map((issueName, i)=>{

            // 各議題立場
            TableData[people.id].positions[issueName] = {};

            //第八屆有這個立委，紀錄過去表態立場
            if(legislatorPositions[people.name]){
                if(legislatorPositions[people.name].positions[issueName]){
                    
                    let recordPosition = legislatorPositions[people.name].positions[issueName].dominantPosition;
                    TableData[people.id].positions[issueName].record = recordPosition;
                    
                    legislatorPositions[people.name].positions[issueName].positionCounts.map((value,i)=>{
                        if(value.position === recordPosition){
                            TableData[people.id].positions[issueName].recordCount = value.count;
                        }
                    })
                    if(recordPosition === "none"){
                        TableData[people.id].positions[issueName].recordCount = 0;
                    }
                        
                }
            }
            //紀錄承諾的立場
            TableData[people.id].positions[issueName].promise = people.positions[issueName].promise.position;

        })

    });
   
    return TableData;
    
}
/*
data = {
  "1": 
    "name" : "丁守中",
    "id" : "1",
    "party" : "KMT",
    "positions" :
      {
        "marriageEquality": {
            "record": "aye",
            "promise" : "none"
        }
      },
*/