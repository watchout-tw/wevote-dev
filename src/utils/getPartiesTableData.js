export default function getPartiesTableData(partyPositions, partyPromises){
    let TableData = {};
    let issueList = ["marriageEquality", "recall", "referendum", "nuclearPower"];//Hmmm....
    
    Object.keys(partyPromises).map((partyId, index)=>{
        
        //TableData
        TableData[partyId] = {
            name: partyPromises[partyId].name,
            id: partyId,
            party: partyId,
            positions: {}
        };
       
        issueList.map((issueName, i)=>{

            /* 推動三法案 */
            TableData[partyId].bills = partyPromises[partyId].bills;

            /* 各議題立場 */
            TableData[partyId].positions[issueName] = {};

            //第八屆有這個政黨，紀錄過去表態立場
            if(partyPositions[partyId]){
                if(partyPositions[partyId].positions[issueName]){
                    
                    let recordPosition = partyPositions[partyId].positions[issueName].dominantPosition;
                    TableData[partyId].positions[issueName].record = recordPosition;
                    partyPositions[partyId].positions[issueName].positionCounts.map((value,i)=>{
                        if(value.position === recordPosition){
                            TableData[partyId].positions[issueName].recordCount = value.count;
                        }
                    })
                    if(recordPosition === "none"){
                        TableData[partyId].positions[issueName].recordCount = 0;
                    }
                        
                }
            }
            //紀錄承諾的立場
            TableData[partyId].positions[issueName].promise = partyPromises[partyId].positions[issueName].promise.position;

        })
      
    })
   
    return TableData;
    
}
/*
data = {
  "KMT": 
    "name" : "中國國民黨",
    "id" : "KMT",
    "party" : "KMT",
    "positions" :
      {
        "marriageEquality": {
            "record": "aye",
            "promise" : "none"
        }
      },
*/