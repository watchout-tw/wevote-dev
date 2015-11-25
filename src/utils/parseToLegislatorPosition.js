import cht2eng from "./cht2eng";
import evadingList from './evadingList';
import people_name2id from './people_name2id';

export default function parseToLegislatorPosition(records, issues, legislators){
	const PositionRecords = records;
	const LegislatorPosition = {};

    /* 依照不同議題分類，然後把每個議題的資料丟進去 */
  	let PositionRecords_Issue = {};

  	Object.keys(PositionRecords).map((recordId, index)=>{
  			let currentRecord = PositionRecords[recordId];

  			let issue_eng = cht2eng(currentRecord.issue);

  			if(!PositionRecords_Issue[issue_eng]){
  				PositionRecords_Issue[issue_eng] = []; 
  			}
  			PositionRecords_Issue[issue_eng].push(currentRecord); 
  	})
  	
  	Object.keys(PositionRecords_Issue).map((issue, index)=>{
  			/* parse 成要的格式 */
			parseToLegislatorPosition_Proceed(PositionRecords_Issue[issue], issue, issues, legislators, LegislatorPosition);
  	});

    //saveToJson(LegislatorPosition);

  	return LegislatorPosition;

}
function saveToJson(LegislatorPosition){
    
    import fs from "fs";
    let OutputLegislators = {};

    Object.keys(LegislatorPosition).map((legislatorId,index)=>{
        let current = LegislatorPosition[legislatorId];
        let id = Number(people_name2id(current.name));

        if(id <= 124){//124 以下是第八屆立委，不含黨團
            OutputLegislators[legislatorId] = {
                name: current.name,
                url: `http://wevote.tw/people/${id}/records/?utm_source=yahoo&utm_medium=link&utm_campaign=2016election`,
                positions: {}

            };
            Object.keys(LegislatorPosition[legislatorId].positions).map((issueName, i)=>{
               let currentIssue = LegislatorPosition[legislatorId].positions[issueName];
               OutputLegislators[legislatorId].positions[issueName] = {
                    dominantPosition: currentIssue.dominantPosition,
                    positionCounts: currentIssue.positionCounts,
                    totalCounts: currentIssue. totalCounts
               }
            })
        }
        
    });

    fs.writeFile('./data/OutputLegislators.json', JSON.stringify(OutputLegislators, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('OutputLegislators.json is saved.');
    });

}
function parseToLegislatorPosition_Proceed(records, currentIssue, issues, legislators, LegislatorPosition){
    let Legislators = {};

    Object.keys(legislators).map((legislatorId,index)=>{
        let currentLegislator = legislators[legislatorId];
        let name = currentLegislator.name;
        Legislators[name] = {}
        Legislators[name].records = [];
    });

    /* 把 表態 依照 立委 分組 */
    // 先分出每個立委底下有哪些 record
    records.map((value, index)=>{

        if(!Legislators[value.legislator]){
            throw new Error("沒有這個立委的資料："+Legislators[value.legislator]);
        }

        if(!Legislators[value.legislator].records){
            throw new Error("沒有這個立委的資料："+Legislators[value.legislator]);
        }
    
        Legislators[value.legislator].records.push(value);

    });
    //console.log(Legislators)


    // 再計算每個立委的主要立場 & 比例
    Object.keys(Legislators).map((currentLegislator,indx)=>{
        
        let count = {}; count.aye = 0, count.nay = 0, count.unknown = 0;
    
        Legislators[currentLegislator].records.map((record,k)=>{
            count[record.position]++;

        })
        
        /* 計算 dominant position */
        /* 把 count換成 array */
        let countSort = [];
        Object.keys(count).map((value, index)=>{
            countSort.push(
            {
              "position": value, 
              "count": count[value]
            }
            );
        });
    
        /* sort，票數最高的在前面 */
        countSort.sort((a,b)=>{
          return b.count-a.count;
        });

        /* 處理最高表態數相同狀況 */
        /*
            如果有模糊 + 贊成，就算贊成
            如果有模糊 + 反對，就算反對
            如果贊成反對同時都有，就算模糊
        */
        let maxCount = countSort[0].count;
        let maximumClub = [];
        countSort.map((value,index)=>{
            if(value.count === maxCount){
                maximumClub.push(value.position);
            }
        })

        Legislators[currentLegislator].dominantPosition = countSort[0].position;
        if(maximumClub.length > 1){
            let hasAye = (maximumClub.indexOf("aye") !== -1);
            let hasNay = (maximumClub.indexOf("nay") !== -1);
            let hasUnknown = (maximumClub.indexOf("unknown") !== -1);
            if(hasAye && !hasNay && hasUnknown){
                Legislators[currentLegislator].dominantPosition = "aye";
            }
            if(!hasAye && hasNay && hasUnknown){
                Legislators[currentLegislator].dominantPosition = "nay";
            }
            if(hasAye && hasNay){
                Legislators[currentLegislator].dominantPosition = "unknown";
            }

        }
        
       
        //如果最高票是 0 票
        if(countSort[0].count === 0){

            
            //沒有表態
            Legislators[currentLegislator].dominantPosition = "none";
            
            //應表態未表態
            if(evadingList[currentIssue]){
                if(evadingList[currentIssue][currentLegislator]){
                   Legislators[currentLegislator].dominantPosition = "evading";
                }
            }
           
        }

        /** 把 records 依照時間排序 */
        Legislators[currentLegislator].records.sort((a,b)=>{
            return a.date - b.date; // 時間早的在前面
        });
        
        Legislators[currentLegislator].positionCounts = [];
        
        Legislators[currentLegislator].positionCounts.push({
            "position" : "aye",
            "count" : count.aye
        })
        
        Legislators[currentLegislator].positionCounts.push({
            "position" : "unknown",
            "count" : count.unknown
        })
     
        Legislators[currentLegislator].positionCounts.push({
            "position" : "nay",
            "count" : count.nay
        })

        Legislators[currentLegislator].totalCounts = Legislators[currentLegislator].records.length;

    });
    
  



    /*******************************************************/
    /* 這裡得到每個立委在這個議題的立場，存到 LegislatorView 裡面 */
    /*******************************************************/
    Object.keys(Legislators).map((currentLegislator,indx)=>{
        if(!LegislatorPosition[currentLegislator]){
            LegislatorPosition[currentLegislator] = {};
            LegislatorPosition[currentLegislator].name = currentLegislator;
            LegislatorPosition[currentLegislator].positions = {};


            //const IssueList = ['marriageEquality', 'recall', 'referendum', 'nuclearPower'];
            Object.keys(issues).map((issueId, key)=>{
                let issueEng = issues[issueId].titleEng;
                LegislatorPosition[currentLegislator].positions[issueEng] = {};
            })
           
        }
        
        LegislatorPosition[currentLegislator].positions[currentIssue] = Legislators[currentLegislator];

    });
    
   
}