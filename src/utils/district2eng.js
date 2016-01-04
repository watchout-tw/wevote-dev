const districts = {
    "臺北市": "TPE",
    "新北市": "NTC",
    "基隆市": "KEL",
    "桃園市": "TYN",
    "新竹市": "HCC",
    "新竹縣": "HSZ",
    "苗栗縣": "ZMI",
    "臺中市": "TXG",
    "彰化縣": "CHW",
    "南投縣": "NAN",
    "雲林縣": "YLN",
    "嘉義市": "CYC",
    "嘉義縣": "CYI",
    "臺南市": "TNN",
    "高雄市": "KHH",
    "屏東縣": "PIF",
    "宜蘭縣": "ILA",
    "花蓮縣": "HUN",
    "臺東縣": "TTT",
    "澎湖縣": "MZG",
    "金門縣": "KNH",
    "連江縣": "MFK",
    "平地原住民": "LAB",
    "山地原住民": "MAB"
}

export default function district2eng(districtCht){
    districtCht = districtCht.replace('台','臺');
    
 	if(districts[districtCht])
 		return districts[districtCht]
 	else
 		return "TPE"
}
