const districts = {
    "TPE": "臺北市",
    "NTC": "新北市",
    "KEL": "基隆市",
    "TYN": "桃園市",
    "HCC": "新竹市",
    "HSZ": "新竹縣",
    "ZMI": "苗栗縣",
    "TXG": "臺中市",
    "CHW": "彰化縣",
    "NAN": "南投縣",
    "YLN": "雲林縣",
    "CYC": "嘉義市",
    "CYI": "嘉義縣",
    "TNN": "臺南市",
    "KHH": "高雄市",
    "PIF": "屏東縣",
    "ILA": "宜蘭縣",
    "HUN": "花蓮縣",
    "TTT": "臺東縣",
    "MZG": "澎湖縣",
    "KNH": "金門縣",
    "MFK": "連江縣",
    "LAB": "平地原住民",
    "MAB": "山地原住民",
    "Proportional": "全國不分區"
}

export default function district2cht(districtCht){
 	if(districts[districtCht])
 		return districts[districtCht]
 	else
 		return "臺北市"
}