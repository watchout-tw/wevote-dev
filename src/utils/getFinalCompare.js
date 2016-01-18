import people_name2id from '../utils/people_name2id';
import cht2eng from '../utils/cht2eng';
import getData from '../data/getData';
const {issues, records, legislators, candidates, electedBlock, partyPromises} = getData();

import parseToLegislatorPosition from './parseToLegislatorPosition';
const LegislatorPosition = parseToLegislatorPosition(records, issues, legislators);

//準備政黨立場
import parseToPartyPosition from './parseToPartyPosition';
const partyPositions = parseToPartyPosition (records, issues);
import getPartiesTableData from './getPartiesTableData';
const PartyPositionArray = getPartiesTableData(partyPositions, partyPromises);
let PartyPosition = {};
PartyPositionArray.map((obj, i)=>{
    PartyPosition[obj.id] = obj;
});
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

let FinalCompare = {};
export default function getFinalCompare(){
    Object.keys(issues).map((id, i)=>{
        //console.log(issues[id].titleEng)
        let issueName = issues[id].titleEng;

        FinalCompare[issueName] = {};
        FinalCompare[issueName]["8th"] = {
            "aye" : [],
            "unknown" : [],
            "nay" : [],
            "evading" : [],
            "none" : []
        };
        FinalCompare[issueName]["9th"] = {
            "aye" : [],
            "unknown" : [],
            "nay" : [],
            "evading" : [],
            "refuse" : [],
            "none" : []
        };

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
            let position = legislator.positions[issueName].dominantPosition;
            
            // console.log(peopleItem)
            // console.log(position);

            //不是黨團 && 未辭職才計入
            if(legislator.name.indexOf("黨團")===-1){
                if(legislators[id].hasResigned === false){
                    FinalCompare[issueName]["8th"][position].push(peopleItem);
                }
            }            
        });


        //parse 第九屆立場，區域當選人 + 不分區
        //區域候選人
        Object.keys(candidates).map((candidateId,k)=>{
            let candidate = candidates[candidateId];
            let peopleItem = {
                name : candidate.name,
                party : candidate.party
            }
            if(candidate.isElected === true){//區域候選人，有選上
                let promisedPosition = candidate.positions[issueName].promise.position;
                
                
                
                // console.log(promisedPosition);
                // console.log("-"+recordPosition);

                //
                if(promisedPosition!== "none"){//有回覆承諾
                   peopleItem.source = "promise";
                   FinalCompare[issueName]["9th"][promisedPosition].push(peopleItem);

                }else{
                   if(legislators[candidateId]){
                        let recordPosition = LegislatorPosition[candidate.name].positions[issueName].dominantPosition;
                        peopleItem.source = "record";
                        FinalCompare[issueName]["9th"][recordPosition].push(peopleItem); 
                   }else{
                        peopleItem.source = "";
                        FinalCompare[issueName]["9th"]["none"].push(peopleItem); 
                   }
                   
                }
            }

        });

        //不分區當選人
        electedBlock.map((r,i)=>{
            let peopleItem = {
                name : r.name,
                party : r.party
            }

            let id = people_name2id(r.name);
            if(id === "1" && r.name !== "丁守中"){
                id = -1;
            }
            if(legislators[id]){//不分區是現任立委
                let recordPosition = LegislatorPosition[r.name].positions[issueName].dominantPosition;

                peopleItem.source = "self-record";
                FinalCompare[issueName]["9th"][recordPosition].push(peopleItem); 

            }else{//不分區 不是 現任立委
                let partyPosition = PartyPosition[r.party].positions[issueName].promise;
                peopleItem.source = "party-promise";
                if(partyPosition === "none"){
                     partyPosition = PartyPosition[r.party].positions[issueName].record;
                     peopleItem.source = "party-record";
                }
                FinalCompare[issueName]["9th"][partyPosition].push(peopleItem); 

            }

        })



        /////// 依照政黨排序
       
        Object.keys(FinalCompare[issueName]["8th"]).map((pos,i)=>{
           FinalCompare[issueName]["8th"][pos] = FinalCompare[issueName]["8th"][pos].sort((a,b)=>{
                return party2points(a.party) - party2points(b.party);
           })
        })
         Object.keys(FinalCompare[issueName]["9th"]).map((pos,i)=>{
           FinalCompare[issueName]["9th"][pos] = FinalCompare[issueName]["9th"][pos].sort((a,b)=>{
                
                if(party2points(a.party) === party2points(b.party)){
                    return source2points(a.source) - source2points(b.source);
                }else{
                    return party2points(a.party) - party2points(b.party);
                }
                
           })
        })
        

    });

    //

    return FinalCompare;
}
function source2points(source){
    switch(source){
        case 'promise':
            return 1;
        case 'record':
            return 2;
        case 'party-promise':
            return 3;
        case 'self-record':
            return 4;
        case 'party-record':
            return 5;
       
    }
}
function party2points(partyEng){
    switch(partyEng){
        case 'DPP':
            return 1;
        case 'KMT':
            return 2;
        case 'NPP':
            return 3;
        case 'PFP':
            return 4;
        case 'TSU':
            return 5;
        case 'NSU':
            return 6;
        case 'MKT':
            return 7;
        case 'NP':
            return 8;
        case 'NONE':
            return 8;
    }
}
/*
    marriageEquality : {
        "8th" : {
            "aye" : [{ name:, party:DPP },]
            "unknown" : []
            "nay" : []
            "none" : []
        },
        "9th" : {
            "aye" : [{ name:, party:DPP },]
            "unknown" : []
            "nay" : []
            "none" : []
        }
    }

*/