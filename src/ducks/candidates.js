const initialState = {
    "1": {
        "name": "丁守中",
        "id": 1,
        "party": "KMT",
        "districtArea": "TPE",
        "districtNo": "1"
    },
    "2": {
        "name": "孔文吉",
        "id": 2,
        "party": "KMT",
        "districtArea": "MAB"
    },
    "4": {
        "name": "王廷升",
        "id": 4,
        "party": "KMT",
        "districtArea": "HUA"
    },
    "7": {
        "name": "王惠美",
        "id": 7,
        "party": "KMT",
        "districtArea": "CHA",
        "districtNo": "1"
    },
    "8": {
        "name": "王進士",
        "id": 8,
        "party": "KMT",
        "districtArea": "PIF",
        "districtNo": "2"
    },
    "10": {
        "name": "江啟臣",
        "id": 10,
        "party": "KMT",
        "districtArea": "TXQ",
        "districtNo": "8"
    },
    "11": {
        "name": "江惠貞",
        "id": 11,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "7"
    },
    "12": {
        "name": "何欣純",
        "id": 12,
        "party": "DPP",
        "districtArea": "TXQ",
        "districtNo": "7"
    },
    "13": {
        "name": "吳育仁",
        "id": 13,
        "party": "KMT",
        "districtArea": "CYI"
    },
    "14": {
        "name": "吳育昇",
        "id": 14,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "1"
    },
    "15": {
        "name": "吳宜臻",
        "id": 15,
        "party": "DPP",
        "districtArea": "MIA",
        "districtNo": "2"
    },
    "16": {
        "name": "吳秉叡",
        "id": 16,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "4"
    },
    "17": {
        "name": "呂玉玲",
        "id": 17,
        "party": "KMT",
        "districtArea": "TAO",
        "districtNo": "5"
    },
    "19": {
        "name": "李昆澤",
        "id": 19,
        "party": "DPP",
        "districtArea": "KHQ",
        "districtNo": "6"
    },
    "20": {
        "name": "李俊俋",
        "id": 20,
        "party": "DPP",
        "districtArea": "CYI"
    },
    "23": {
        "name": "李慶華",
        "id": 23,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "12"
    },
    "26": {
        "name": "周倪安",
        "id": 26,
        "party": "TSU",
        "districtArea": "TPQ",
        "districtNo": "9"
    },
    "30": {
        "name": "林岱樺",
        "id": 30,
        "party": "DPP",
        "districtArea": "KHQ",
        "districtNo": "4"
    },
    "32": {
        "name": "林郁方",
        "id": 32,
        "party": "KMT",
        "districtArea": "TPE",
        "districtNo": "5"
    },
    "33": {
        "name": "林國正",
        "id": 33,
        "party": "KMT",
        "districtArea": "KHQ",
        "districtNo": "9"
    },
    "34": {
        "name": "林淑芬",
        "id": 34,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "2"
    },
    "35": {
        "name": "林滄敏",
        "id": 35,
        "party": "KMT",
        "districtArea": "CHA",
        "districtNo": "2"
    },
    "39": {
        "name": "邱志偉",
        "id": 39,
        "party": "DPP",
        "districtArea": "KHQ",
        "districtNo": "2"
    },
    "40": {
        "name": "邱議瑩",
        "id": 40,
        "party": "DPP",
        "districtArea": "KHQ",
        "districtNo": "1"
    },
    "41": {
        "name": "姚文智",
        "id": 41,
        "party": "DPP",
        "districtArea": "TPE",
        "districtNo": "2"
    },
    "42": {
        "name": "柯建銘",
        "id": 42,
        "party": "DPP",
        "districtArea": "HSZ"
    },
    "45": {
        "name": "紀國棟",
        "id": 45,
        "party": "NONE",
        "districtArea": "TXQ",
        "districtNo": "2"
    },
    "46": {
        "name": "孫大千",
        "id": 46,
        "party": "KMT",
        "districtArea": "TAO",
        "districtNo": "6"
    },
    "48": {
        "name": "徐志榮",
        "id": 48,
        "party": "KMT",
        "districtArea": "MIA",
        "districtNo": "2"
    },
    "49": {
        "name": "徐欣瑩",
        "id": 49,
        "party": "MKT",
        "districtArea": "HSQ"
    },
    "52": {
        "name": "馬文君",
        "id": 52,
        "party": "KMT",
        "districtArea": "NAN",
        "districtNo": "1"
    },
    "53": {
        "name": "高志鵬",
        "id": 53,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "3"
    },
    "54": {
        "name": "高金素梅",
        "id": 54,
        "party": "NSU",
        "districtArea": "MAB"
    },
    "56": {
        "name": "張慶忠",
        "id": 56,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "8"
    },
    "58": {
        "name": "莊瑞雄",
        "id": 58,
        "party": "DPP",
        "districtArea": "PIF",
        "districtNo": "3"
    },
    "60": {
        "name": "許淑華",
        "id": 60,
        "party": "KMT",
        "districtArea": "NAN",
        "districtNo": "2"
    },
    "62": {
        "name": "許智傑",
        "id": 62,
        "party": "DPP",
        "districtArea": "KHQ",
        "districtNo": "8"
    },
    "65": {
        "name": "陳明文",
        "id": 65,
        "party": "DPP",
        "districtArea": "CYQ",
        "districtNo": "2"
    },
    "66": {
        "name": "陳亭妃",
        "id": 66,
        "party": "DPP",
        "districtArea": "TNQ",
        "districtNo": "3"
    },
    "68": {
        "name": "陳根德",
        "id": 68,
        "party": "KMT",
        "districtArea": "TAO",
        "districtNo": "1"
    },
    "69": {
        "name": "陳素月",
        "id": 69,
        "party": "DPP",
        "districtArea": "CHA",
        "districtNo": "4"
    },
    "70": {
        "name": "陳淑慧",
        "id": 70,
        "party": "KMT",
        "districtArea": "TNQ",
        "districtNo": "4"
    },
    "71": {
        "name": "陳雪生",
        "id": 71,
        "party": "KMT",
        "districtArea": "LJF"
    },
    "72": {
        "name": "陳超明",
        "id": 72,
        "party": "KMT",
        "districtArea": "MIA",
        "districtNo": "1"
    },
    "75": {
        "name": "陳歐珀",
        "id": 75,
        "party": "DPP",
        "districtArea": "ILA"
    },
    "76": {
        "name": "陳學聖",
        "id": 76,
        "party": "KMT",
        "districtArea": "TAO",
        "districtNo": "3"
    },
    "79": {
        "name": "費鴻泰",
        "id": 79,
        "party": "KMT",
        "districtArea": "TPE",
        "districtNo": "7"
    },
    "81": {
        "name": "黃志雄",
        "id": 81,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "5"
    },
    "83": {
        "name": "黃偉哲",
        "id": 83,
        "party": "DPP",
        "districtArea": "TNQ",
        "districtNo": "2"
    },
    "84": {
        "name": "黃國書",
        "id": 84,
        "party": "DPP",
        "districtArea": "TXQ",
        "districtNo": "6"
    },
    "87": {
        "name": "楊曜",
        "id": 87,
        "party": "DPP",
        "districtArea": "PEN"
    },
    "88": {
        "name": "楊瓊瓔",
        "id": 88,
        "party": "KMT",
        "districtArea": "TXQ",
        "districtNo": "3"
    },
    "89": {
        "name": "楊麗環",
        "id": 89,
        "party": "KMT",
        "districtArea": "TAO",
        "districtNo": "4"
    },
    "90": {
        "name": "葉宜津",
        "id": 90,
        "party": "DPP",
        "districtArea": "TNQ",
        "districtNo": "1"
    },
    "94": {
        "name": "廖正井",
        "id": 94,
        "party": "KMT",
        "districtArea": "TAO",
        "districtNo": "2"
    },
    "95": {
        "name": "廖國棟",
        "id": 95,
        "party": "KMT",
        "districtArea": "LAB"
    },
    "96": {
        "name": "管碧玲",
        "id": 96,
        "party": "DPP",
        "districtArea": "KHQ",
        "districtNo": "5"
    },
    "97": {
        "name": "趙天麟",
        "id": 97,
        "party": "DPP",
        "districtArea": "KHQ",
        "districtNo": "7"
    },
    "98": {
        "name": "劉建國",
        "id": 98,
        "party": "DPP",
        "districtArea": "YUN",
        "districtNo": "2"
    },
    "99": {
        "name": "劉櫂豪",
        "id": 99,
        "party": "DPP",
        "districtArea": "TTT"
    },
    "103": {
        "name": "蔡其昌",
        "id": 103,
        "party": "DPP",
        "districtArea": "TXQ",
        "districtNo": "1"
    },
    "104": {
        "name": "蔡煌瑯",
        "id": 104,
        "party": "DPP",
        "districtArea": "NAN",
        "districtNo": "2"
    },
    "105": {
        "name": "蔡錦隆",
        "id": 105,
        "party": "KMT",
        "districtArea": "TXQ",
        "districtNo": "4"
    },
    "106": {
        "name": "蔣乃辛",
        "id": 106,
        "party": "KMT",
        "districtArea": "TPE",
        "districtNo": "6"
    },
    "107": {
        "name": "鄭天財Sra·Kacaw",
        "id": 107,
        "party": "KMT",
        "districtArea": "LAB"
    },
    "108": {
        "name": "鄭汝芬",
        "id": 108,
        "party": "KMT",
        "districtArea": "CHA",
        "districtNo": "3"
    },
    "110": {
        "name": "盧秀燕",
        "id": 110,
        "party": "KMT",
        "districtArea": "TXQ",
        "districtNo": "5"
    },
    "111": {
        "name": "盧嘉辰",
        "id": 111,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "10"
    },
    "112": {
        "name": "蕭美琴",
        "id": 112,
        "party": "DPP",
        "districtArea": "HUA"
    },
    "113": {
        "name": "賴士葆",
        "id": 113,
        "party": "KMT",
        "districtArea": "TPE",
        "districtNo": "8"
    },
    "117": {
        "name": "簡東明",
        "id": 117,
        "party": "KMT",
        "districtArea": "MAB"
    },
    "119": {
        "name": "顏寬恒",
        "id": 119,
        "party": "KMT",
        "districtArea": "TXQ",
        "districtNo": "2"
    },
    "121": {
        "name": "羅明才",
        "id": 121,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "11"
    },
    "124": {
        "name": "蘇震清",
        "id": 124,
        "party": "DPP",
        "districtArea": "PIF",
        "districtNo": "1"
    },
    "129": {
        "name": "吳思瑤",
        "id": 129,
        "party": "DPP",
        "districtArea": "TPE",
        "districtNo": "1"
    },
    "130": {
        "name": "王靜亞",
        "id": 130,
        "party": "MKT",
        "districtArea": "TPE",
        "districtNo": "1"
    },
    "131": {
        "name": "黃清原",
        "id": 131,
        "party": "TIP",
        "districtArea": "TPE",
        "districtNo": "1"
    },
    "132": {
        "name": "文魯彬",
        "id": 132,
        "party": "NONE",
        "districtArea": "TPE",
        "districtNo": "1"
    },
    "133": {
        "name": "潘懷宗",
        "id": 133,
        "party": "NP",
        "districtArea": "TPE",
        "districtNo": "2"
    },
    "134": {
        "name": "陳民乾",
        "id": 134,
        "party": "TIP",
        "districtArea": "TPE",
        "districtNo": "2"
    },
    "135": {
        "name": "吳俊德",
        "id": 135,
        "party": "FHL",
        "districtArea": "TPE",
        "districtNo": "2"
    },
    "136": {
        "name": "蔣萬安",
        "id": 136,
        "party": "KMT",
        "districtArea": "TPE",
        "districtNo": "3"
    },
    "137": {
        "name": "潘建志",
        "id": 137,
        "party": "DPP",
        "districtArea": "TPE",
        "districtNo": "3"
    },
    "138": {
        "name": "李晏榕",
        "id": 138,
        "party": "GSD",
        "districtArea": "TPE",
        "districtNo": "3"
    },
    "139": {
        "name": "林新凱",
        "id": 139,
        "party": "TIP",
        "districtArea": "TPE",
        "districtNo": "3"
    },
    "140": {
        "name": "李彥秀",
        "id": 140,
        "party": "KMT",
        "districtArea": "TPE",
        "districtNo": "4"
    },
    "141": {
        "name": "黃珊珊",
        "id": 141,
        "party": "PFP",
        "districtArea": "TPE",
        "districtNo": "4"
    },
    "142": {
        "name": "陳尚志",
        "id": 142,
        "party": "GSD",
        "districtArea": "TPE",
        "districtNo": "4"
    },
    "143": {
        "name": "蕭亞譚",
        "id": 143,
        "party": "TSU",
        "districtArea": "TPE",
        "districtNo": "4"
    },
    "144": {
        "name": "陳兆銘",
        "id": 144,
        "party": "TIP",
        "districtArea": "TPE",
        "districtNo": "4"
    },
    "145": {
        "name": "高政揚",
        "id": 145,
        "party": "MKT",
        "districtArea": "TPE",
        "districtNo": "4"
    },
    "146": {
        "name": "林少馳",
        "id": 146,
        "party": "NONE",
        "districtArea": "TPE",
        "districtNo": "4"
    },
    "147": {
        "name": "何偉",
        "id": 147,
        "party": "NONE",
        "districtArea": "TPE",
        "districtNo": "4"
    },
    "148": {
        "name": "林昶佐",
        "id": 148,
        "party": "NPP",
        "districtArea": "TPE",
        "districtNo": "5"
    },
    "149": {
        "name": "林佳諭",
        "id": 149,
        "party": "TP",
        "districtArea": "TPE",
        "districtNo": "5"
    },
    "150": {
        "name": "李家幸",
        "id": 150,
        "party": "TIP",
        "districtArea": "TPE",
        "districtNo": "5"
    },
    "151": {
        "name": "尤瑞敏",
        "id": 151,
        "party": "NONE",
        "districtArea": "TPE",
        "districtNo": "5"
    },
    "152": {
        "name": "范雲",
        "id": 152,
        "party": "GSD",
        "districtArea": "TPE",
        "districtNo": "6"
    },
    "153": {
        "name": "陳家宏",
        "id": 153,
        "party": "TP",
        "districtArea": "TPE",
        "districtNo": "6"
    },
    "154": {
        "name": "吳旭智",
        "id": 154,
        "party": "MKT",
        "districtArea": "TPE",
        "districtNo": "6"
    },
    "155": {
        "name": "曾獻瑩",
        "id": 155,
        "party": "FHL",
        "districtArea": "TPE",
        "districtNo": "6"
    },
    "156": {
        "name": "林珍妤",
        "id": 156,
        "party": "TIP",
        "districtArea": "TPE",
        "districtNo": "6"
    },
    "157": {
        "name": "龎維良",
        "id": 157,
        "party": "NONE",
        "districtArea": "TPE",
        "districtNo": "6"
    },
    "158": {
        "name": "周芳如",
        "id": 158,
        "party": "NONE",
        "districtArea": "TPE",
        "districtNo": "6"
    },
    "159": {
        "name": "呂欣潔",
        "id": 159,
        "party": "GSD",
        "districtArea": "TPE",
        "districtNo": "7"
    },
    "160": {
        "name": "林芷芬",
        "id": 160,
        "party": "TIP",
        "districtArea": "TPE",
        "districtNo": "7"
    },
    "161": {
        "name": "張承中",
        "id": 161,
        "party": "NONE",
        "districtArea": "TPE",
        "districtNo": "7"
    },
    "162": {
        "name": "楊實秋",
        "id": 162,
        "party": "NONE",
        "districtArea": "TPE",
        "districtNo": "7"
    },
    "163": {
        "name": "苗博雅",
        "id": 163,
        "party": "GSD",
        "districtArea": "TPE",
        "districtNo": "8"
    },
    "164": {
        "name": "潘翰聲",
        "id": 164,
        "party": "TP",
        "districtArea": "TPE",
        "districtNo": "8"
    },
    "165": {
        "name": "陳俞璋",
        "id": 165,
        "party": "TIP",
        "districtArea": "TPE",
        "districtNo": "8"
    },
    "166": {
        "name": "李慶元",
        "id": 166,
        "party": "NONE",
        "districtArea": "TPE",
        "districtNo": "8"
    },
    "167": {
        "name": "呂孫綾",
        "id": 167,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "1"
    },
    "168": {
        "name": "馮光遠",
        "id": 168,
        "party": "NPP",
        "districtArea": "TPQ",
        "districtNo": "1"
    },
    "169": {
        "name": "蘇通達",
        "id": 169,
        "party": "NONE",
        "districtArea": "TPQ",
        "districtNo": "1"
    },
    "170": {
        "name": "陳明義",
        "id": 170,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "2"
    },
    "171": {
        "name": "李乾龍",
        "id": 171,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "3"
    },
    "172": {
        "name": "張碩文",
        "id": 172,
        "party": "PFP",
        "districtArea": "TPQ",
        "districtNo": "3"
    },
    "173": {
        "name": "黃林玲玲",
        "id": 173,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "4"
    },
    "174": {
        "name": "賈伯楷",
        "id": 174,
        "party": "GSD",
        "districtArea": "TPQ",
        "districtNo": "4"
    },
    "175": {
        "name": "蘇巧慧",
        "id": 175,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "5"
    },
    "176": {
        "name": "林國春",
        "id": 176,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "6"
    },
    "177": {
        "name": "張宏陸",
        "id": 177,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "6"
    },
    "178": {
        "name": "李建明",
        "id": 178,
        "party": "TP",
        "districtArea": "TPQ",
        "districtNo": "6"
    },
    "179": {
        "name": "黃鈞民",
        "id": 179,
        "party": "MCFAP",
        "districtArea": "TPQ",
        "districtNo": "6"
    },
    "180": {
        "name": "康仁俊",
        "id": 180,
        "party": "PFP",
        "districtArea": "TPQ",
        "districtNo": "6"
    },
    "181": {
        "name": "游信義",
        "id": 181,
        "party": "FHL",
        "districtArea": "TPQ",
        "districtNo": "6"
    },
    "182": {
        "name": "李貴寶",
        "id": 182,
        "party": "MKT",
        "districtArea": "TPQ",
        "districtNo": "6"
    },
    "183": {
        "name": "羅致政",
        "id": 183,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "7"
    },
    "184": {
        "name": "江永昌",
        "id": 184,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "8"
    },
    "185": {
        "name": "吳金魁",
        "id": 185,
        "party": "MCFAP",
        "districtArea": "TPQ",
        "districtNo": "8"
    },
    "186": {
        "name": "林德福",
        "id": 186,
        "party": "KMT",
        "districtArea": "TPQ",
        "districtNo": "9"
    },
    "187": {
        "name": "董建一",
        "id": 187,
        "party": "MPR",
        "districtArea": "TPQ",
        "districtNo": "9"
    },
    "188": {
        "name": "張菁芳",
        "id": 188,
        "party": "MKT",
        "districtArea": "TPQ",
        "districtNo": "9"
    },
    "189": {
        "name": "李幸長",
        "id": 189,
        "party": "NONE",
        "districtArea": "TPQ",
        "districtNo": "9"
    },
    "190": {
        "name": "吳琪銘",
        "id": 190,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "10"
    },
    "191": {
        "name": "陳永福",
        "id": 191,
        "party": "DPP",
        "districtArea": "TPQ",
        "districtNo": "11"
    },
    "192": {
        "name": "曾柏瑜",
        "id": 192,
        "party": "GSD",
        "districtArea": "TPQ",
        "districtNo": "11"
    },
    "193": {
        "name": "黃國昌",
        "id": 193,
        "party": "NPP",
        "districtArea": "TPQ",
        "districtNo": "12"
    },
    "194": {
        "name": "陳永順",
        "id": 194,
        "party": "FHL",
        "districtArea": "TPQ",
        "districtNo": "12"
    },
    "195": {
        "name": "鄭運鵬",
        "id": 195,
        "party": "DPP",
        "districtArea": "TAO",
        "districtNo": "1"
    },
    "196": {
        "name": "王寶萱",
        "id": 196,
        "party": "NONE",
        "districtArea": "TAO",
        "districtNo": "1"
    },
    "197": {
        "name": "陳賴素美",
        "id": 197,
        "party": "DPP",
        "districtArea": "TAO",
        "districtNo": "2"
    },
    "198": {
        "name": "陳佩俞",
        "id": 198,
        "party": "TP",
        "districtArea": "TAO",
        "districtNo": "2"
    },
    "199": {
        "name": "徐景文",
        "id": 199,
        "party": "DPP",
        "districtArea": "TAO",
        "districtNo": "3"
    },
    "200": {
        "name": "陳宏瑞",
        "id": 200,
        "party": "MKT",
        "districtArea": "TAO",
        "districtNo": "3"
    },
    "201": {
        "name": "陶君亮",
        "id": 201,
        "party": "FHL",
        "districtArea": "TAO",
        "districtNo": "3"
    },
    "202": {
        "name": "鄭寶清",
        "id": 202,
        "party": "DPP",
        "districtArea": "TAO",
        "districtNo": "4"
    },
    "203": {
        "name": "游柏隆",
        "id": 203,
        "party": "MCFAP",
        "districtArea": "TAO",
        "districtNo": "4"
    },
    "204": {
        "name": "張肇良",
        "id": 204,
        "party": "DPP",
        "districtArea": "TAO",
        "districtNo": "5"
    },
    "205": {
        "name": "張誠",
        "id": 205,
        "party": "MKT",
        "districtArea": "TAO",
        "districtNo": "5"
    },
    "206": {
        "name": "蕭家亮",
        "id": 206,
        "party": "NONE",
        "districtArea": "TAO",
        "districtNo": "5"
    },
    "207": {
        "name": "呂東杰",
        "id": 207,
        "party": "GSD",
        "districtArea": "TAO",
        "districtNo": "6"
    },
    "208": {
        "name": "趙正宇",
        "id": 208,
        "party": "NONE",
        "districtArea": "TAO",
        "districtNo": "6"
    },
    "209": {
        "name": "顏秋月",
        "id": 209,
        "party": "KMT",
        "districtArea": "TXQ",
        "districtNo": "1"
    },
    "210": {
        "name": "陳世凱",
        "id": 210,
        "party": "DPP",
        "districtArea": "TXQ",
        "districtNo": "2"
    },
    "211": {
        "name": "洪慈庸",
        "id": 211,
        "party": "NPP",
        "districtArea": "TXQ",
        "districtNo": "3"
    },
    "212": {
        "name": "黃信吉",
        "id": 212,
        "party": "MCFAP",
        "districtArea": "TXQ",
        "districtNo": "3"
    },
    "213": {
        "name": "張廖萬堅",
        "id": 213,
        "party": "DPP",
        "districtArea": "TXQ",
        "districtNo": "4"
    },
    "214": {
        "name": "葉春幸",
        "id": 214,
        "party": "FHL",
        "districtArea": "TXQ",
        "districtNo": "4"
    },
    "215": {
        "name": "吳淑慧",
        "id": 215,
        "party": "MKT",
        "districtArea": "TXQ",
        "districtNo": "4"
    },
    "216": {
        "name": "吾爾開希",
        "id": 216,
        "party": "NONE",
        "districtArea": "TXQ",
        "districtNo": "4"
    },
    "217": {
        "name": "柯劭臻",
        "id": 217,
        "party": "NPP",
        "districtArea": "TXQ",
        "districtNo": "5"
    },
    "218": {
        "name": "劉國隆",
        "id": 218,
        "party": "TSU",
        "districtArea": "TXQ",
        "districtNo": "5"
    },
    "219": {
        "name": "簡孟軒",
        "id": 219,
        "party": "FHL",
        "districtArea": "TXQ",
        "districtNo": "5"
    },
    "220": {
        "name": "沈智慧",
        "id": 220,
        "party": "KMT",
        "districtArea": "TXQ",
        "districtNo": "6"
    },
    "221": {
        "name": "賴義鍠",
        "id": 221,
        "party": "KMT",
        "districtArea": "TXQ",
        "districtNo": "7"
    },
    "222": {
        "name": "石大哉",
        "id": 222,
        "party": "MCFAP",
        "districtArea": "TXQ",
        "districtNo": "7"
    },
    "223": {
        "name": "謝志忠",
        "id": 223,
        "party": "DPP",
        "districtArea": "TXQ",
        "districtNo": "8"
    },
    "224": {
        "name": "黃瑞坤",
        "id": 224,
        "party": "KMT",
        "districtArea": "TNQ",
        "districtNo": "1"
    },
    "225": {
        "name": "黃耀盛",
        "id": 225,
        "party": "KMT",
        "districtArea": "TNQ",
        "districtNo": "2"
    },
    "226": {
        "name": "謝龍介",
        "id": 226,
        "party": "KMT",
        "districtArea": "TNQ",
        "districtNo": "3"
    },
    "227": {
        "name": "鄧秀寶",
        "id": 227,
        "party": "MKT",
        "districtArea": "TNQ",
        "districtNo": "3"
    },
    "228": {
        "name": "林俊憲",
        "id": 228,
        "party": "DPP",
        "districtArea": "TNQ",
        "districtNo": "4"
    },
    "229": {
        "name": "楊智達",
        "id": 229,
        "party": "GSD",
        "districtArea": "TNQ",
        "districtNo": "4"
    },
    "230": {
        "name": "張立蔭",
        "id": 230,
        "party": "NONE",
        "districtArea": "TNQ",
        "districtNo": "4"
    },
    "231": {
        "name": "林易煌",
        "id": 231,
        "party": "KMT",
        "districtArea": "TNQ",
        "districtNo": "5"
    },
    "232": {
        "name": "王定宇",
        "id": 232,
        "party": "DPP",
        "districtArea": "TNQ",
        "districtNo": "5"
    },
    "233": {
        "name": "鍾易仲",
        "id": 233,
        "party": "KMT",
        "districtArea": "KHQ",
        "districtNo": "1"
    },
    "234": {
        "name": "黃韻涵",
        "id": 234,
        "party": "KMT",
        "districtArea": "KHQ",
        "districtNo": "2"
    },
    "235": {
        "name": "張顯耀",
        "id": 235,
        "party": "KMT",
        "districtArea": "KHQ",
        "districtNo": "3"
    },
    "236": {
        "name": "劉世芳",
        "id": 236,
        "party": "DPP",
        "districtArea": "KHQ",
        "districtNo": "3"
    },
    "237": {
        "name": "梁蓓禎",
        "id": 237,
        "party": "FHL",
        "districtArea": "KHQ",
        "districtNo": "3"
    },
    "238": {
        "name": "郭倫豪",
        "id": 238,
        "party": "KMT",
        "districtArea": "KHQ",
        "districtNo": "4"
    },
    "239": {
        "name": "蔡金晏",
        "id": 239,
        "party": "KMT",
        "districtArea": "KHQ",
        "districtNo": "5"
    },
    "240": {
        "name": "王新昌",
        "id": 240,
        "party": "MCFAP",
        "districtArea": "KHQ",
        "districtNo": "5"
    },
    "241": {
        "name": "黃柏霖",
        "id": 241,
        "party": "KMT",
        "districtArea": "KHQ",
        "districtNo": "6"
    },
    "242": {
        "name": "莊啟旺",
        "id": 242,
        "party": "KMT",
        "districtArea": "KHQ",
        "districtNo": "7"
    },
    "243": {
        "name": "黃璽文",
        "id": 243,
        "party": "KMT",
        "districtArea": "KHQ",
        "districtNo": "8"
    },
    "244": {
        "name": "劉義雄",
        "id": 244,
        "party": "MCFAP",
        "districtArea": "KHQ",
        "districtNo": "8"
    },
    "245": {
        "name": "賴瑞隆",
        "id": 245,
        "party": "DPP",
        "districtArea": "KHQ",
        "districtNo": "9"
    },
    "246": {
        "name": "林宗彥",
        "id": 246,
        "party": "MKT",
        "districtArea": "KHQ",
        "districtNo": "9"
    },
    "247": {
        "name": "郝龍斌",
        "id": 247,
        "party": "KMT",
        "districtArea": "KEE"
    },
    "248": {
        "name": "蔡適應",
        "id": 248,
        "party": "DPP",
        "districtArea": "KEE"
    },
    "249": {
        "name": "劉文雄",
        "id": 249,
        "party": "PFP",
        "districtArea": "KEE"
    },
    "250": {
        "name": "楊石城",
        "id": 250,
        "party": "MKT",
        "districtArea": "KEE"
    },
    "251": {
        "name": "張耿輝",
        "id": 251,
        "party": "NONE",
        "districtArea": "KEE"
    },
    "252": {
        "name": "李志鏞",
        "id": 252,
        "party": "KMT",
        "districtArea": "ILA"
    },
    "253": {
        "name": "吳紹文",
        "id": 253,
        "party": "GSD",
        "districtArea": "ILA"
    },
    "254": {
        "name": "孫博萮",
        "id": 254,
        "party": "NONE",
        "districtArea": "ILA"
    },
    "255": {
        "name": "邱錫奎",
        "id": 255,
        "party": "NONE",
        "districtArea": "ILA"
    },
    "256": {
        "name": "林為洲",
        "id": 256,
        "party": "KMT",
        "districtArea": "HSQ"
    },
    "257": {
        "name": "李宗華",
        "id": 257,
        "party": "MCFAP",
        "districtArea": "HSQ"
    },
    "258": {
        "name": "卓恩宗",
        "id": 258,
        "party": "FHL",
        "districtArea": "HSQ"
    },
    "259": {
        "name": "鄭永金",
        "id": 259,
        "party": "NONE",
        "districtArea": "HSQ"
    },
    "260": {
        "name": "鄭正鈐",
        "id": 260,
        "party": "KMT",
        "districtArea": "HSZ"
    },
    "261": {
        "name": "邱顯智",
        "id": 261,
        "party": "NPP",
        "districtArea": "HSZ"
    },
    "262": {
        "name": "魏揚",
        "id": 262,
        "party": "MCFAP",
        "districtArea": "HSZ"
    },
    "263": {
        "name": "歐崇敬",
        "id": 263,
        "party": "PFP",
        "districtArea": "HSZ"
    },
    "264": {
        "name": "南岳君",
        "id": 264,
        "party": "FHL",
        "districtArea": "HSZ"
    },
    "265": {
        "name": "杜文卿",
        "id": 265,
        "party": "DPP",
        "districtArea": "MIA",
        "districtNo": "1"
    },
    "266": {
        "name": "康世儒",
        "id": 266,
        "party": "MKT",
        "districtArea": "MIA",
        "districtNo": "1"
    },
    "267": {
        "name": "林一方",
        "id": 267,
        "party": "FTP",
        "districtArea": "MIA",
        "districtNo": "1"
    },
    "268": {
        "name": "戴文祥",
        "id": 268,
        "party": "NONE",
        "districtArea": "MIA",
        "districtNo": "2"
    },
    "269": {
        "name": "陳文彬",
        "id": 269,
        "party": "DPP",
        "districtArea": "CHA",
        "districtNo": "1"
    },
    "270": {
        "name": "黃秀芳",
        "id": 270,
        "party": "DPP",
        "districtArea": "CHA",
        "districtNo": "2"
    },
    "271": {
        "name": "張耀元",
        "id": 271,
        "party": "MKT",
        "districtArea": "CHA",
        "districtNo": "2"
    },
    "272": {
        "name": "洪宗熠",
        "id": 272,
        "party": "DPP",
        "districtArea": "CHA",
        "districtNo": "3"
    },
    "273": {
        "name": "陳朝容",
        "id": 273,
        "party": "PFP",
        "districtArea": "CHA",
        "districtNo": "3"
    },
    "274": {
        "name": "張錦昆",
        "id": 274,
        "party": "KMT",
        "districtArea": "CHA",
        "districtNo": "4"
    },
    "275": {
        "name": "張國鑫",
        "id": 275,
        "party": "DPP",
        "districtArea": "NAN",
        "districtNo": "1"
    },
    "276": {
        "name": "張鎔麒",
        "id": 276,
        "party": "KMT",
        "districtArea": "YUN",
        "districtNo": "1"
    },
    "277": {
        "name": "蘇治芬",
        "id": 277,
        "party": "DPP",
        "districtArea": "YUN",
        "districtNo": "1"
    },
    "278": {
        "name": "魯紜湘",
        "id": 278,
        "party": "TP",
        "districtArea": "YUN",
        "districtNo": "1"
    },
    "279": {
        "name": "張志銘",
        "id": 279,
        "party": "NONE",
        "districtArea": "YUN",
        "districtNo": "1"
    },
    "280": {
        "name": "吳威志",
        "id": 280,
        "party": "KMT",
        "districtArea": "YUN",
        "districtNo": "2"
    },
    "281": {
        "name": "林江釧",
        "id": 281,
        "party": "KMT",
        "districtArea": "CYQ",
        "districtNo": "1"
    },
    "282": {
        "name": "蔡易餘",
        "id": 282,
        "party": "DPP",
        "districtArea": "CYQ",
        "districtNo": "1"
    },
    "283": {
        "name": "林于玲",
        "id": 283,
        "party": "KMT",
        "districtArea": "CYQ",
        "districtNo": "2"
    },
    "284": {
        "name": "翁壽良",
        "id": 284,
        "party": "NONE",
        "districtArea": "CYI"
    },
    "285": {
        "name": "宋麗華",
        "id": 285,
        "party": "KMT",
        "districtArea": "PIF",
        "districtNo": "1"
    },
    "286": {
        "name": "鍾佳濱",
        "id": 286,
        "party": "DPP",
        "districtArea": "PIF",
        "districtNo": "2"
    },
    "287": {
        "name": "廖婉汝",
        "id": 287,
        "party": "KMT",
        "districtArea": "PIF",
        "districtNo": "3"
    },
    "288": {
        "name": "黃昭展",
        "id": 288,
        "party": "NONE",
        "districtArea": "PIF",
        "districtNo": "3"
    },
    "289": {
        "name": "陳建閣",
        "id": 289,
        "party": "KMT",
        "districtArea": "TTT"
    },
    "290": {
        "name": "柯賜海",
        "id": 290,
        "party": "NONE",
        "districtArea": "HUA"
    },
    "291": {
        "name": "陳雙全",
        "id": 291,
        "party": "KMT",
        "districtArea": "PEN"
    },
    "292": {
        "name": "冼義哲",
        "id": 292,
        "party": "TP",
        "districtArea": "PEN"
    },
    "293": {
        "name": "楊鎮浯",
        "id": 293,
        "party": "KMT",
        "districtArea": "JME"
    },
    "294": {
        "name": "陳滄江",
        "id": 294,
        "party": "DPP",
        "districtArea": "JME"
    },
    "295": {
        "name": "吳成典",
        "id": 295,
        "party": "NP",
        "districtArea": "JME"
    },
    "296": {
        "name": "高丹樺",
        "id": 296,
        "party": "MCFAP",
        "districtArea": "JME"
    },
    "297": {
        "name": "蘇柏豪",
        "id": 297,
        "party": "TP",
        "districtArea": "LJF"
    },
    "298": {
        "name": "陳瑩",
        "id": 298,
        "party": "DPP",
        "districtArea": "LAB"
    },
    "299": {
        "name": "林昊宜",
        "id": 299,
        "party": "PFP",
        "districtArea": "LAB"
    },
    "300": {
        "name": "達佶祐．卡造",
        "id": 300,
        "party": "MCFAP",
        "districtArea": "LAB"
    },
    "301": {
        "name": "吳國譽",
        "id": 301,
        "party": "MKT",
        "districtArea": "LAB"
    },
    "302": {
        "name": "林琮翰",
        "id": 302,
        "party": "NONE",
        "districtArea": "LAB"
    },
    "303": {
        "name": "馬躍·比吼",
        "id": 303,
        "party": "NONE",
        "districtArea": "LAB"
    },
    "304": {
        "name": "瓦歷斯·貝林",
        "id": 304,
        "party": "DPP",
        "districtArea": "MAB"
    },
    "305": {
        "name": "伊藍·明基努安",
        "id": 305,
        "party": "FHL",
        "districtArea": "MAB"
    },
    "306": {
        "name": "林信義",
        "id": 306,
        "party": "FHL",
        "districtArea": "MAB"
    },
    "307": {
        "name": "林世偉",
        "id": 307,
        "party": "NONE",
        "districtArea": "MAB"
    },
    "308": {
        "name": "尤命·蘇樣",
        "id": 308,
        "party": "NONE",
        "districtArea": "MAB"
    }
}


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

