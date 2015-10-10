import cht2eng from "./cht2eng";
const evadingList = {
    "recall": {
        "林滄敏": {
            "name": "林滄敏",
            "party": "KMT"
        },
        "段宜康": {
            "name": "段宜康",
            "party": "DPP"
        },
        "徐志榮": {
            "name": "徐志榮",
            "party": "KMT"
        },
        "高金素梅": {
            "name": "高金素梅",
            "party": "NONE"
        },
        "張曉風": {
            "name": "張曉風",
            "party": "PFP"
        }
    },
    "marriageEquality": {
        "王廷升": {
            "name": "王廷升",
            "party": "KMT"
        },
        "王惠美": {
            "name": "王惠美",
            "party": "KMT"
        },
        "林正二": {
            "name": "林正二",
            "party": "PFP"
        },
        "林國正": {
            "name": "林國正",
            "party": "KMT"
        },
        "林滄敏": {
            "name": "林滄敏",
            "party": "KMT"
        },
        "柯建銘": {
            "name": "柯建銘",
            "party": "DPP"
        },
        "高志鵬": {
            "name": "高志鵬",
            "party": "DPP"
        },
        "曾巨威": {
            "name": "曾巨威",
            "party": "KMT"
        },
        "詹滿容": {
            "name": "詹滿容",
            "party": "KMT"
        },
        "潘孟安": {
            "name": "潘孟安",
            "party": "DPP"
        },
        "潘維剛": {
            "name": "潘維剛",
            "party": "KMT"
        },
        "蔡其昌": {
            "name": "蔡其昌",
            "party": "DPP"
        },
        "鄭天財Sra．Kacaw": {
            "name": "鄭天財Sra．Kacaw",
            "party": "KMT"
        },
        "賴士葆": {
            "name": "賴士葆",
            "party": "KMT"
        },
        "謝國樑": {
            "name": "謝國樑",
            "party": "KMT"
        },
        "顏寬恒": {
            "name": "顏寬恒",
            "party": "KMT"
        }
    },
    "referendum": {
        "林滄敏": {
            "name": "林滄敏",
            "party": "KMT"
        },
        "邱議瑩": {
            "name": "邱議瑩",
            "party": "DPP"
        },
        "高金素梅": {
            "name": "高金素梅",
            "party": "NONE"
        },
        "張曉風": {
            "name": "張曉風",
            "party": "PFP"
        }
    }
}
export default function parseToPartyView(records, issues){
	const PositionRecords = records.data;
	const LegislatorView = {};

    Object.keys(issues).map((key, index)=>{
    	let currentIssue = issues[key];
	    LegislatorView[currentIssue.titleEng] = {
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
			parseToLegislatorView_Proceed(PositionRecords_Issue[issue], issue, LegislatorView);
  	});

  	return LegislatorView;

}

function parseToLegislatorView_Proceed (records, currentIssue, LegislatorView) {// records: [], currentIssue: marriageEquality (e.g.)
	

    // evading_list 記錄了在這個議題上「應表態未表態」的立委名單，array

    let Legislators = {};

	// 分出每個立委底下有哪些 record
	records.map((value, index)=>{
		if(!Legislators[value.legislator]){
			Legislators[value.legislator] = {};//empty object for one legislator
			Legislators[value.legislator].name = value.legislator; //'丁守中'
			Legislators[value.legislator].party = value.party; //KTM 
			/***** 目前沒處理一個人在不同政黨有不同立場表態的狀況 ******/
		}

		if(!Legislators[value.legislator].records)
			Legislators[value.legislator].records = [];
		

		Legislators[value.legislator].records.push(value);

	});
	//console.log(Legislators)


	// 再計算每個立委的主要立場 & 比例
	Object.keys(Legislators).map((currentLegislator,indx)=>{
		
		let count = {}; count.aye = 0, count.nay = 0, count.unknown = 0;
   	
		Legislators[currentLegislator].records.map((record,k)=>{
			count[record.position]++;

		})

		/** 把 records 依照時間排序 */
		Legislators[currentLegislator].records.sort((a,b)=>{
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
        let percentage = (countSort[0].count / Legislators[currentLegislator].records.length) * 100;
        percentage  = +percentage.toFixed(2);// + will drop extra zeros

        Legislators[currentLegislator].dominantPosition = countSort[0].position;
        Legislators[currentLegislator].dominantPercentage = percentage;

	});
	//console.log(Legislators)
  

    let currentEvading = evadingList[currentIssue];
    if(!currentEvading){
    	   currentEvading = {};//有可能沒有應表態未表態，那就回傳空 object
    } 

  
	Object.keys(currentEvading).map((currentLegislator,index)=>{
		
		if(Legislators[currentLegislator]){
			throw "<> 應表態未表態的立委，居然有資料？！";
		}
		currentEvading[currentLegislator].dominantPosition = "evading";
        currentEvading[currentLegislator].dominantPercentage = 100;
	});
		


	// 再依照主要立場分人，算出最後的結果
	let PositionGroup = {};

	PositionGroup["aye"] = [];
	PositionGroup["unknown"] = [];
	PositionGroup["nay"] = [];
	PositionGroup["evading"] = [];
	

    // 把有立場的立委放進去
	Object.keys(Legislators).map((currentLegislator,index)=>{
		let currentPosition = Legislators[currentLegislator].dominantPosition;

		if(!PositionGroup[currentPosition])
			throw new Error("未定義的立場："+currentPosition);

		PositionGroup[currentPosition].push(Legislators[currentLegislator]);
	});

    //把應表態未表態的立委放進去
	Object.keys(currentEvading).map((currentLegislator,index)=>{
		let currentPosition = evadingList[currentIssue][currentLegislator].dominantPosition;

		if(!PositionGroup[currentPosition])
			throw new Error("未定義的立場："+currentPosition);

		PositionGroup[currentPosition].push(evadingList[currentIssue][currentLegislator]);
	});


	//console.log(PositionGroup);
	
	/* 最後依照 贊成 - 模糊 - 反對 - 應表態未表態 順序塞到 LegislatorView['marriageEquality'] 底下 */
	
	["aye", "unknown", "nay", "evading"].map((currentPosition,index)=>{

	    if(!LegislatorView[currentIssue].positions)
		 	LegislatorView[currentIssue].positions = []; // initialize

		if(PositionGroup[currentPosition].length > 0){
			LegislatorView[currentIssue].positions.push(
			{
				"position" : currentPosition,
    		    "legislators" : PositionGroup[currentPosition]
			});
		}
		
		
	});
	

	
}