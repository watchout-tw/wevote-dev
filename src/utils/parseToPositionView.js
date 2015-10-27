import cht2eng from "./cht2eng";

export default function parseToPositionView(records, issues){
	const PositionRecords = records;
	const PositionView = {};

    Object.keys(issues).map((key, index)=>{
    	let currentIssue = issues[key];
	    PositionView[currentIssue.titleEng] = {
	    	title: currentIssue.title,
	    	statement: currentIssue.statement,
	    	positions: []
	    }
    });

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
			parseToPositionView_Proceed(PositionRecords_Issue[issue], issue, PositionView);
  	});

  	return PositionView;

}
function parseToPositionView_Proceed (records, currentIssue, PositionView) {// records: [], currentIssue: marriageEquality (e.g.)
    var Positions = {};
    let maxCount = 0;

    /* 把 表態 依照 立場 分組 */
    //順序固定是 贊成 - 模糊 - 反對
    Positions["aye"] = {};
    Positions["unknown"] = {};
    Positions["nay"] = {};

    Object.keys(Positions).map((key,index)=>{
        Positions[key].position = key;
        Positions[key].records = [];
    })


    records.map((value, index)=>{
        if(!Positions[value.position]){
            throw new Error("未定義的立場："+Positions[value.position]);
        }
        Positions[value.position].records.push(value);
    });

    // 計算政黨比例
    Object.keys(Positions).map((currentPosition, index)=>{
        let count = {};
        Positions[currentPosition].records.map((r, i)=>{
            if(!count[r.party]){
                count[r.party] = 0;
            }
            count[r.party]++;
        })
        const recordTotalCount = Positions[currentPosition].records.length;  
        if(recordTotalCount > maxCount)
            maxCount = recordTotalCount;

        let countSort = [];
        Object.keys(count).map((currentParty, i)=>{
            let p = (count[currentParty]/ recordTotalCount) * 100;
            p = +p.toFixed(2);// + will drop extra zeros
            countSort.push({
              "party" : currentParty,
              "percentage" : p
            })
        })
        countSort.sort((a,b)=>{ return a.percentage - b.percentage })

        Positions[currentPosition].partyPercentages = countSort;
        
    })



    Object.keys(Positions).map((currentPosition, index)=>{
        PositionView[currentIssue].positions.push(Positions[currentPosition]);   
    })
    PositionView[currentIssue].maxCount = maxCount;


    
}
