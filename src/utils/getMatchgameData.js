export default function getMatchgame(legislatorPositions, candidateList, dynamicData, area, areaNo){
    // 編列過去表態紀錄資料


    // 針對未來的表態資料
    
}
/*
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
    newclearPower: {
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