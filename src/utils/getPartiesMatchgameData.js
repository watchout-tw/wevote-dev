export default function getPartiesMatchgameData(partyPositions, partyPromises, recordFirst){
    let MatchData = {};
    let issueList = ["marriageEquality", "recall", "referendum", "nuclearPower", "courseGuide", "justiceReform"];//Hmmm....

    Object.keys(partyPromises).map((partyId, index)=>{
        
        //Match data, 只有 "議題" : "立場"
        MatchData[partyId] = {
            name: partyPromises[partyId].name,
            id: partyId,
            positions: {}
        };
       
        issueList.map((issueName, i)=>{
            let promisePosition = partyPromises[partyId].positions[issueName].promise.position;;
            //第八屆有這個政黨 & 有表態紀錄
            if(partyPositions[partyId]){
                if(partyPositions[partyId].positions[issueName]){

                    let recordPosition = partyPositions[partyId].positions[issueName].dominantPosition;
                        
                    //並且使用者決定 recordFist
                    if(recordFirst === true){
                        MatchData[partyId].positions[issueName] = recordPosition;
                    }
                    //或者還沒有承諾，就沒有衝突的問題
                    if(promisePosition === "none"){
                        MatchData[partyId].positions[issueName] = recordPosition;
                    }
                }
            }
            //如果判斷到現在還沒有資料，用承諾資料當作 match 基準
            if(!MatchData[partyId].positions[issueName]){
                MatchData[partyId].positions[issueName] = promisePosition;
            }

        })
      
    })
    
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