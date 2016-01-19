import people_name2id from '../utils/people_name2id';
import cht2eng from '../utils/cht2eng';
import getData from '../data/getData';
const {issues, records, legislators, candidates, electedBlock, partyPromises} = getData();

import parseToLegislatorPosition from './parseToLegislatorPosition';
const LegislatorPosition = parseToLegislatorPosition(records, issues, legislators);

/*
'陳鎮湘': 
{ name: '陳鎮湘',
  positions: 
   { marriageEquality: {
        "dominantPosition": "xxx",
        ...
     },
     recall: [Object],
     referendum: [Object],
     nuclearPower: [Object],
     courseGuide: [Object],
     justiceReform: [Object] } },
*/
/*
{
    "1": {
        "id": 1,
        "positions": {
            "marriageEquality": {
                "promise": {
                    "position": "none",
                    "statement": ""
                }
            },
        },
    ... 
},
*/

let FinalMap = {};
export default function getFinalCompare(){
    Object.keys(issues).map((id, i)=>{
        //console.log(issues[id].titleEng)
        let issueName = issues[id].titleEng;

        FinalMap[issueName] = {};
        FinalMap[issueName]["8th"] = {};
        FinalMap[issueName]["9th"] = {};

        //parse 第八屆立場，LegislatorPosition 跑一遍
        Object.keys(LegislatorPosition).map((legislatorName, k)=>{
            let legislator = LegislatorPosition[legislatorName];
            let id = people_name2id(legislatorName);
            let parties = legislators[id].parties;
            let party = cht2eng(parties[parties.length - 1].partyCht)
            let peopleItem = {
                name : legislator.name,
                party : party
            }
            //立場
            let position = legislator.positions[issueName].dominantPosition;
         
            //不是黨團 && 未辭職 && 區域 才計入
            if(legislator.name.indexOf("黨團")===-1){
                if(legislators[id].hasResigned === false){
                    
                    let area = legislators[id].constituency1;
                    let areaNo = legislators[id].constituency2;
                    if(areaNo === "N/A"){//立委只有單一選區的縣市
                        areaNo = "1";
                    }
                    //廖國棟,鄭天財,林正二
                    //孔文吉,高金素梅,簡東明
                    if(legislators[id].name === "鄭天財Sra·Kacaw" || legislators[id].name === "高金素梅"){
                        areaNo = "2";
                    }
                    if(legislators[id].name === "林正二" || legislators[id].name === "簡東明"){
                        areaNo = "3";
                    }
                    if(area && area !== "Proportional"){
                        if(!FinalMap[issueName]["8th"][area]){//建立縣市 Object
                            FinalMap[issueName]["8th"][area] = {};
                        }
                        FinalMap[issueName]["8th"][area][areaNo] = {
                            legislator: legislators[id].name,
                            position: position
                        }
                    }
                }
            }            
        });

        // "constituency1": "TPE",
        // "constituency2": "1",


        //parse 第九屆立場，區域當選人
        //區域候選人
        Object.keys(candidates).map((candidateId,k)=>{
            let candidate = candidates[candidateId];
            
            if(candidate.isElected === true){//區域候選人，有選上
                let promisedPosition = candidate.positions[issueName].promise.position;
                let area = candidate.districtArea;
                let areaNo = candidate.districtNo;
                if(areaNo === "N/A"){//立委只有單一選區的縣市
                    areaNo = "1";
                }
                //鄭天財,廖國棟,陳瑩
                //高金素梅,簡東明,孔文吉
                if(candidate.name === "廖國棟" || candidate.name === "簡東明"){
                    areaNo = "2";
                }
                if(candidate.name === "陳瑩" || candidate.name === "孔文吉"){
                    areaNo = "3";
                }
               

                if(!FinalMap[issueName]["9th"][area]){//建立縣市 Object
                   FinalMap[issueName]["9th"][area] = {};
                }
               
                FinalMap[issueName]["9th"][area][areaNo] = {
                    legislator : candidate.name,
                    position: promisedPosition
                }

            }

        });

        //console.log(FinalMap)
        

    });

    //

    return FinalMap;
}
/*
    marriageEquality : {
        "8th" : {
            "TPE" : {
                "1" : {
                    "legislator" : "丁守中",
                    "positioin" : "aye"
                },
                "2" : {
    
                }
            }
        },
        "9th" : {
            
        }
    }

*/