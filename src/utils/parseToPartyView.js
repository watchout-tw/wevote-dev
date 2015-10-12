import cht2eng from "./cht2eng";

export default function parseToPartyView(records, issues){
 	const PositionRecords = records;
    
    const PartyView = {};

    Object.keys(issues).map((key, index)=>{
    	let currentIssue = issues[key];
	    PartyView[currentIssue.titleEng] = {
	    	title: currentIssue.title,
	    	statement: currentIssue.statement,
	    	partyPositions: []
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
			parseToPartyView_Proceed(PositionRecords_Issue[issue], issue, PartyView);
			
  	
  	});
 	
 	return PartyView;
}
function parseToPartyView_Proceed (records, currentIssue, PartyView) {
	var Parties = {};

	/* 把 表態 依照政黨分組 */
	records.map((value, index)=>{
		if(!Parties[value.party])
			Parties[value.party] = [];

		if(!Parties[value.party].records)
			Parties[value.party].records = [];
		

		Parties[value.party].records.push(value);

	});

	/* traverse 每個政黨的記錄，找出最多數，並且記錄「主要立場」跟「百分比」 */
	// 計算每個政黨有表態的人數
	Object.keys(Parties).map((currentParty,index)=>{
		
		//console.log(`xxxxx ${currentParty} xxxxx`);
		let count = {}; count.aye = 0, count.nay = 0, count.unknown = 0;
   		let hasPosition = [];
		Parties[currentParty].records.map((record, k)=>{
			count[record.position]++;

			//如果這個人還沒被點到名，就點他！
			if(hasPosition.indexOf(record.legislator)===-1){
				hasPosition.push(record.legislator);
			}
		})
		//看看最後有多少人名，即是人數
		Parties[currentParty].hasPositionCount = hasPosition.length;

		/** 把 records 依照時間排序 */
		Parties[currentParty].records.sort((a,b)=>{
			return a.date - b.date; // 時間早的在前面
		});
		
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

       
    	/* 計算 percentage */
        let percentage = (countSort[0].count / Parties[currentParty].records.length) * 100;
        percentage  = +percentage.toFixed(2);// + will drop extra zeros

        Parties[currentParty].dominantPosition = countSort[0].position;
        Parties[currentParty].dominantPercentage = percentage;


        //贊成的 percent 數，用來排序
        Parties[currentParty].rank = (count.aye || 0) / Parties[currentParty].records.length;
        Parties[currentParty].party = currentParty;

	});


	// ok! 這裡就是我們要的結果格式
	//console.log(Parties);

	
	/* 最後依「贊成 - 模糊 - 反對」排序 */
	let sortedParty = [];
	Object.keys(Parties).map((currentParty,index)=>{
		sortedParty.push(Parties[currentParty]);
	});
	sortedParty.sort((a, b)=>{
		return b.rank - a.rank;
	});



	// 之後塞到 PartyView['marriageEquality'].partyPositions 底下 */

	sortedParty.map((currentParty,index)=>{

		if(!PartyView[currentIssue].partyPositions)
		 	PartyView[currentIssue].partyPositions = []; // initialize

		PartyView[currentIssue].partyPositions.push(
		{
			"party" : currentParty.party,
    	    "dominantPosition" : currentParty.dominantPosition, // 主要立場
    	    "dominantPercentage" : currentParty.dominantPercentage,
    	    "records" : currentParty.records,
    	    "rank" : currentParty.rank,
    	    "hasPositionCount" : currentParty.hasPositionCount
		});
		
	})
}