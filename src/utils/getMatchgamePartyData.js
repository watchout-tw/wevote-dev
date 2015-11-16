export default function getMatchgamePartyData(partyPositions, partyPromises){
    let Parties = {};
    let MatchData = {};
    let issueList = ["marriageEquality", "recall", "referendum", "nuclearPower"];//Hmmm....

    Object.keys(partyPromises).map((partyId, index)=>{
        //Position data
        var Party = {};
        Party.name = partyPromises[partyId].name;
        Party.id = partyId;

        //Match data, 只有 "議題" : "立場"
        MatchData[partyId] = {};
       
        issueList.map((issueName, i)=>{
            Party[issueName] = {};

            //紀錄未來承諾
            Party[issueName].promise = partyPromises[partyId].positions[issueName].promise;

            //第八屆有這個政黨，加入過去紀錄
            if(partyPositions[partyId]){
                if(partyPositions[partyId].positions[issueName]){
                    let recordPosition = partyPositions[partyId].positions[issueName].dominantPosition;
                    
                    Party[issueName].record = { position: recordPosition };
                    //並且把 match data 初始立場設定為過去紀錄
                    MatchData[partyId][issueName] = recordPosition;
                }
            }
            //如果沒有，用承諾資料當作 match 基準
            if(!MatchData[partyId][issueName]){
                MatchData[partyId][issueName] = partyPromises[partyId].positions[issueName].promise.position;
            }

        })
      

        Parties[partyId] = Party;
    })
    
    return {
        positionData: Parties,
        matchData: MatchData
    }
    
}
/*
data = {
  "KMT": 
    "title" : "中國國民黨",
    "id" : "KMT",
    "positions" :
      {
        "marriageEquality": {
            "record" : { "position": "none" },
            "promise" : { 
              "position": "aye",
              "statement": "我理解到人權的重要，未來將以行動支持同性婚姻合法化。"
            }
      },
*/