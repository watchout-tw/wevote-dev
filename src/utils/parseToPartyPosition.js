import cht2eng from "./cht2eng";
export default function parseToPartyPosition (records, issues) {// records: [], currentIssue: marriageEquality (e.g.)
	let PartyPosition = {};
	const PositionRecords = records;

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
			parseToPartyPosition_Proceed(PositionRecords_Issue[issue], issues, issue, PartyPosition);
  	});
  	return PartyPosition;

}
function parseToPartyPosition_Proceed (records, issues, currentIssue, PartyPosition) {// records: [], currentIssue: marriageEquality (e.g.)
	
	// 先把表態依照政黨分組
	let Parties = {};
	const partyOrders = [
		{	
			"id":"KMT",
		    "name":"中國國民黨"
		},
		{   
			"id":"DPP",
			"name":'民主進步黨'
		},
		{   
			"id": "TSU",
			"name":'台灣團結聯盟'
		}
		,
		{
			"id": "PFP",
			"name":'親民黨'
		},
		{
			"id": "NSU",
			"name":'無黨團結聯盟'
		},
		{
			"id": "NONE",
			"name":'無黨籍'
		}
	];
	partyOrders.map((value, index)=>{
		Parties[value.id] = {};
		Parties[value.id].name = value.name;
		Parties[value.id].records = [];
	})

	// 先分出每個政黨底下有哪些 record
	records.map((value, index)=>{
		if(!Parties[value.party]){
			console.log(`找不到這個政黨：${value.party}`);
		}
		Parties[value.party].records.push(value);
	});
	//console.log(Legislators)


	// 再計算每個政黨的主要立場 & 比例
	Object.keys(Parties).map((currentParty,indx)=>{
		
		let count = {}; count.aye = 0, count.nay = 0, count.unknown = 0;
   	
		Parties[currentParty].records.map((record,k)=>{
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
    
        Parties[currentParty].dominantPosition = countSort[0].position;
    
        //如果最高票是 0 票，那就是沒有表態
        if(countSort[0].count === 0)
        	Parties[currentParty].dominantPosition = "none";

		/** 把 records 依照時間排序 */
		Parties[currentParty].records.sort((a,b)=>{
			return a.date - b.date; // 時間早的在前面
		});
		
		Parties[currentParty].positionCounts = [];
		
		Parties[currentParty].positionCounts.push({
			"position" : "nay",
			"count" : count.nay
		})

		Parties[currentParty].positionCounts.push({
			"position" : "unknown",
			"count" : count.unknown
		})
		
		Parties[currentParty].positionCounts.push({
			"position" : "aye",
			"count" : count.aye
		})

		Parties[currentParty].totalCounts = Parties[currentParty].records.length;

	});
	//console.log(Legislators)



	/*******************************************************/
	/* 這裡得到每個政黨在這個議題的立場，存到 PartyPosition 裡面 */
	/*******************************************************/
	
	Object.keys(Parties).map((currentParty,indx)=>{
		if(!PartyPosition[currentParty]){
			PartyPosition[currentParty] = {};
			PartyPosition[currentParty].name = Parties[currentParty].name;
			PartyPosition[currentParty].positions = {};

			//初始化每個政黨，在每個議題的資料
			//const IssueList = ['marriageEquality', 'recall', 'referendum', 'nuclearPower'];
			Object.keys(issues).map((issueId, key)=>{
				let issueEng = issues[issueId].titleEng;
				PartyPosition[currentParty].positions[issueEng] = {};
			})

		}
		
		PartyPosition[currentParty].positions[currentIssue] = Parties[currentParty];

	});
	

	
}