export default function getPartiesMatchgameData(partyPositions, partyPromises, recordFirst){
    let MatchData = {};
    let issueList = ["marriageEquality", "recall", "referendum", "nuclearPower"];//Hmmm....

    Object.keys(partyPromises).map((partyId, index)=>{
        
        //Match data, 只有 "議題" : "立場"
        MatchData[partyId] = {
            name: partyPromises[partyId].name,
            id: partyId,
            positions: {}
        };
       
        issueList.map((issueName, i)=>{
            //第八屆有這個政黨，並且使用者決定 recordFist
            if(partyPositions[partyId]){
                if(partyPositions[partyId].positions[issueName]){
                    if(recordFirst === true){
                        let recordPosition = partyPositions[partyId].positions[issueName].dominantPosition;
                        MatchData[partyId].positions[issueName] = recordPosition;
                    }
                }
            }
            //如果沒有，用承諾資料當作 match 基準
            if(!MatchData[partyId].positions[issueName]){
                MatchData[partyId].positions[issueName] = partyPromises[partyId].positions[issueName].promise.position;
            }

        })
      
    })
    console.log(MatchData)
    
    return MatchData;
    
}
/*
data = {
  "KMT": 
    "title" : "中國國民黨",
    "id" : "KMT",
    "positions" :
      {
        "marriageEquality": "aye"
      },
*/