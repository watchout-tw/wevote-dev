export default function getMatchgame(legislatorPositions, candidateList, dynamicData, area, areaNo){
    let result = {};
    let issueList = ["marriageEquality", "recall", "referendum", "nuclearPower"];//Hmmm....

    candidateList.map((people, index)=>{
        result[people.name] = {};//initialize 每個候選人
        issueList.map((issueName, k)=>{
            result[people.name][issueName] = {};//initialize 每個議題

            //過去紀錄
            if(legislatorPositions[people.name]){
                // ["none","unknown","evading"] 都是 none
                // view 的處理可以拿掉了
                let recordPosition = legislatorPositions[people.name].positions[issueName].dominantPosition;
                if(["none","unknown","evading"].indexOf(recordPosition) !== -1){
                  recordPosition = "none";
                }
                result[people.name][issueName].record = {
                    position : recordPosition
                }
            }
            //未來承諾
            result[people.name][issueName].promise = dynamicData[people.name][issueName];// { position: 'aye', statement: ... }
            
        })

    })
    
    return result;
    
}
/*

// candiateList
[
  { 
      districtArea: "TPE"
      districtNo: "1"
      id: "1"
      name: "丁守中"
      party: "KMT"
  },
  {
    ...next candidate
  }
]
// legislatorPositions format

"丁守中" : {
	name: "丁守中"
	positions: {
		marriageEquality: {
			dominantPosition: "nay"
		}
	}
},
"xxx" : {
	
}

// dynamicData
remoteData[name] = {   
    name: name,
    marriageEquality: {
      position: value['婚姻平權-立場'],
      statement: value['婚姻平權-補充意見']
    },
    recall: {
      position: value['罷免-立場'],
      statement: value['罷免-補充意見']
    },
    referendum: {
      position: value['公投-立場'],
      statement: value['公投-補充意見']
    },
    nuclearPower: {
      position: value['核能-立場'],
      statement: value['核能-補充意見']
    },
    goals: []
}

// output format
// 把 issue 用 id 改成了用 name - camelcase
data = {
  "蔣乃辛": {
      "marriageEquality": {
          "record" : { "position": "none" },
          "promise" : { 
            "position": "aye",
            "statement": "我理解到人權的重要，未來將以行動支持同性婚姻合法化。"
          }
      },
*/