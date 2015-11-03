const districts = {
    "彰化縣": "CHA",
    "嘉義市": "CYI",
    "嘉義縣": "CYQ",
    "新竹縣": "HSQ",
    "新竹市": "HSZ",
    "花蓮縣": "HUA",
    "宜蘭縣": "ILA",
    "基隆市": "KEE",
    "高雄市": "KHQ",
    "苗栗縣": "MIA",
    "南投縣": "NAN",
    "澎湖縣": "PEN",
    "屏東縣": "PIF",
    "桃園市": "TAO",
    "臺南市": "TNQ",
    "臺北市": "TPE",
    "新北市": "TPQ",
    "臺東縣": "TTT",
    "臺中市": "TXQ",
    "雲林縣": "YUN",
    "金門縣": "JME",
    "連江縣": "LJF",
    "平地原住民": "LAB",
    "山地原住民": "MAB"
}

export default function district2eng(districtCht){
 	if(districts[districtCht])
 		return districts[districtCht]
 	else
 		return "TPE"
}
