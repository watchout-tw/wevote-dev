const initialState = {
    "1": {
        "id": 1,
        "name": "丁守中",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "61",
        "isCurrent": true,
        "constituency1": "台北市",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台北市",
        "candidateConstituency2": "1"
    },
    "2": {
        "id": 2,
        "name": "孔文吉",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "58",
        "isCurrent": true,
        "constituency1": "山地原住民",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "3": {
        "id": 3,
        "name": "尤美女",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "60",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "4": {
        "id": 4,
        "name": "王廷升",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "50",
        "isCurrent": true,
        "constituency1": "花蓮縣",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "花蓮縣",
        "candidateConstituency2": "N/A"
    },
    "5": {
        "id": 5,
        "name": "王育敏",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "44",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "6": {
        "id": 6,
        "name": "王金平",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "74",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "7": {
        "id": 7,
        "name": "王惠美",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "47",
        "isCurrent": true,
        "constituency1": "彰化縣",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "彰化縣",
        "candidateConstituency2": "1"
    },
    "8": {
        "id": 8,
        "name": "王進士",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "67",
        "isCurrent": true,
        "constituency1": "屏東縣",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "屏東縣",
        "candidateConstituency2": "2"
    },
    "9": {
        "id": 9,
        "name": "田秋堇",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "61",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "10": {
        "id": 10,
        "name": "江啟臣",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "43",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "8",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "8"
    },
    "11": {
        "id": 11,
        "name": "江惠貞",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "52",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "7",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "7"
    },
    "12": {
        "id": 12,
        "name": "何欣純",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "42",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "7",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "7"
    },
    "13": {
        "id": 13,
        "name": "吳育仁",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "46",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "14": {
        "id": 14,
        "name": "吳育昇",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "57",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "1"
    },
    "15": {
        "id": 15,
        "name": "吳宜臻",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "45",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "16": {
        "id": 16,
        "name": "吳秉叡",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "49",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "17": {
        "id": 17,
        "name": "呂玉玲",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "61",
        "isCurrent": true,
        "constituency1": "桃園縣",
        "constituency2": "5",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "桃園縣",
        "candidateConstituency2": "5"
    },
    "18": {
        "id": 18,
        "name": "呂學樟",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "63",
        "isCurrent": true,
        "constituency1": "新竹市",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新竹市",
        "candidateConstituency2": "N/A"
    },
    "19": {
        "id": 19,
        "name": "李昆澤",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "51",
        "isCurrent": true,
        "constituency1": "高雄市",
        "constituency2": "6",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "高雄市",
        "candidateConstituency2": "6"
    },
    "20": {
        "id": 20,
        "name": "李俊俋",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "50",
        "isCurrent": true,
        "constituency1": "嘉義市",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "嘉義市",
        "candidateConstituency2": "N/A"
    },
    "21": {
        "id": 21,
        "name": "李桐豪",
        "parties": [
            {
                "partyCht": "親民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "60",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "22": {
        "id": 22,
        "name": "李貴敏",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "61",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "23": {
        "id": 23,
        "name": "李慶華",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "67",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "12",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "12"
    },
    "24": {
        "id": 24,
        "name": "李應元",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "62",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "25": {
        "id": 25,
        "name": "李鴻鈞",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "56",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "4",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "4"
    },
    "26": {
        "id": 26,
        "name": "周倪安",
        "parties": [
            {
                "partyCht": "台聯",
                "startDate": "2014/2/10",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "43",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "27": {
        "id": 27,
        "name": "林世嘉",
        "parties": [
            {
                "partyCht": "台聯",
                "startDate": "2012/2/1",
                "endDate": "2013/7/15"
            }
        ],
        "gender": "女",
        "age": "46",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": true,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "28": {
        "id": 28,
        "name": "林正二",
        "parties": [
            {
                "partyCht": "親民黨",
                "startDate": "2012/2/1",
                "endDate": "2013/7/11"
            }
        ],
        "gender": "男",
        "age": "63",
        "isCurrent": true,
        "constituency1": "平地原住民",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": true,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "29": {
        "id": 29,
        "name": "林佳龍",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": "2014/11/25"
            }
        ],
        "gender": "男",
        "age": "51",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "6",
        "isCandidate": false,
        "hasResigned": true,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "6"
    },
    "30": {
        "id": 30,
        "name": "林岱樺",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "43",
        "isCurrent": true,
        "constituency1": "高雄市",
        "constituency2": "4",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "高雄市",
        "candidateConstituency2": "4"
    },
    "31": {
        "id": 31,
        "name": "林明溱",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": "2014/12/25"
            }
        ],
        "gender": "男",
        "age": "64",
        "isCurrent": true,
        "constituency1": "南投縣",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": true,
        "candidateConstituency1": "南投縣",
        "candidateConstituency2": "2"
    },
    "32": {
        "id": 32,
        "name": "林郁方",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "64",
        "isCurrent": true,
        "constituency1": "台北市",
        "constituency2": "5",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台北市",
        "candidateConstituency2": "5"
    },
    "33": {
        "id": 33,
        "name": "林國正",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "61",
        "isCurrent": true,
        "constituency1": "高雄市",
        "constituency2": "9",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "高雄市",
        "candidateConstituency2": "9"
    },
    "34": {
        "id": 34,
        "name": "林淑芬",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "42",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "2"
    },
    "35": {
        "id": 35,
        "name": "林滄敏",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "57",
        "isCurrent": true,
        "constituency1": "彰化縣",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "彰化縣",
        "candidateConstituency2": "2"
    },
    "36": {
        "id": 36,
        "name": "林德福",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "62",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "9",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "9"
    },
    "37": {
        "id": 37,
        "name": "林鴻池",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "60",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "6",
        "isCandidate": false,
        "hasResigned": false,
        "candidateConstituency1": "N/A",
        "candidateConstituency2": "N/A"
    },
    "38": {
        "id": 38,
        "name": "邱文彥",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "61",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "39": {
        "id": 39,
        "name": "邱志偉",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "43",
        "isCurrent": true,
        "constituency1": "高雄市",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "高雄市",
        "candidateConstituency2": "2"
    },
    "40": {
        "id": 40,
        "name": "邱議瑩",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "44",
        "isCurrent": true,
        "constituency1": "高雄市",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "高雄市",
        "candidateConstituency2": "1"
    },
    "41": {
        "id": 41,
        "name": "姚文智",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "50",
        "isCurrent": true,
        "constituency1": "台北市",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台北市",
        "candidateConstituency2": "2"
    },
    "42": {
        "id": 42,
        "name": "柯建銘",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "64",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "43": {
        "id": 43,
        "name": "段宜康",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "52",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "44": {
        "id": 44,
        "name": "洪秀柱",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "67",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "45": {
        "id": 45,
        "name": "紀國棟",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": "2015/7/16"
            }
        ],
        "gender": "男",
        "age": "55",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": true,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "46": {
        "id": 46,
        "name": "孫大千",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "46",
        "isCurrent": true,
        "constituency1": "桃園縣",
        "constituency2": "6",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "桃園縣",
        "candidateConstituency2": "6"
    },
    "47": {
        "id": 47,
        "name": "徐少萍",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "74",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "48": {
        "id": 48,
        "name": "徐志榮",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2015/2/16",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "60",
        "isCurrent": true,
        "constituency1": "屏東縣",
        "constituency2": "3",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "屏東縣",
        "candidateConstituency2": "3"
    },
    "49": {
        "id": 49,
        "name": "徐欣瑩",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": "2015/1/26"
            },
            {
                "partyCht": "民國黨",
                "startDate": "2015/1/27",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "43",
        "isCurrent": true,
        "constituency1": "新竹縣",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新竹縣",
        "candidateConstituency2": "N/A"
    },
    "50": {
        "id": 50,
        "name": "徐耀昌",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": "2014/12/25"
            }
        ],
        "gender": "男",
        "age": "60",
        "isCurrent": true,
        "constituency1": "苗栗縣",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": true,
        "candidateConstituency1": "苗栗縣",
        "candidateConstituency2": "2"
    },
    "51": {
        "id": 51,
        "name": "翁重鈞",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "60",
        "isCurrent": true,
        "constituency1": "嘉義縣",
        "constituency2": "1",
        "isCandidate": false,
        "hasResigned": false,
        "candidateConstituency1": "N/A",
        "candidateConstituency2": "N/A"
    },
    "52": {
        "id": 52,
        "name": "馬文君",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "50",
        "isCurrent": true,
        "constituency1": "南投縣",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "南投縣",
        "candidateConstituency2": "1"
    },
    "53": {
        "id": 53,
        "name": "高志鵬",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "52",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "3",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "3"
    },
    "54": {
        "id": 54,
        "name": "高金素梅",
        "parties": [
            {
                "partyCht": "無黨團結聯盟",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "50",
        "isCurrent": true,
        "constituency1": "山地原住民",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "55": {
        "id": 55,
        "name": "張嘉郡",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "34",
        "isCurrent": true,
        "constituency1": "雲林縣",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "雲林縣",
        "candidateConstituency2": "1"
    },
    "56": {
        "id": 56,
        "name": "張慶忠",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "64",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "8",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "8"
    },
    "57": {
        "id": 57,
        "name": "張曉風",
        "parties": [
            {
                "partyCht": "親民黨",
                "startDate": "2012/2/1",
                "endDate": "2013/3/17"
            }
        ],
        "gender": "女",
        "age": "74",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": true,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "58": {
        "id": 58,
        "name": "莊瑞雄",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2015/2/16",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "52",
        "isCurrent": true,
        "constituency1": "屏東縣",
        "constituency2": "3",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "屏東縣",
        "candidateConstituency2": "3"
    },
    "59": {
        "id": 59,
        "name": "許忠信",
        "parties": [
            {
                "partyCht": "台聯",
                "startDate": "2012/2/1",
                "endDate": "2014/2/1"
            }
        ],
        "gender": "男",
        "age": "50",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": true,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "60": {
        "id": 60,
        "name": "許淑華",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "40",
        "isCurrent": true,
        "constituency1": "南投縣",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "南投縣",
        "candidateConstituency2": "2"
    },
    "61": {
        "id": 61,
        "name": "許添財",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "64",
        "isCurrent": true,
        "constituency1": "台南市",
        "constituency2": "4",
        "isCandidate": false,
        "hasResigned": false,
        "candidateConstituency1": "N/A",
        "candidateConstituency2": "N/A"
    },
    "62": {
        "id": 62,
        "name": "許智傑",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "49",
        "isCurrent": true,
        "constituency1": "高雄市",
        "constituency2": "8",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "高雄市",
        "candidateConstituency2": "8"
    },
    "63": {
        "id": 63,
        "name": "陳其邁",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "51",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "64": {
        "id": 64,
        "name": "陳怡潔",
        "parties": [
            {
                "partyCht": "親民黨",
                "startDate": "2013/3/22",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "36",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "65": {
        "id": 65,
        "name": "陳明文",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "60",
        "isCurrent": true,
        "constituency1": "嘉義縣",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "嘉義縣",
        "candidateConstituency2": "2"
    },
    "66": {
        "id": 66,
        "name": "陳亭妃",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "41",
        "isCurrent": true,
        "constituency1": "台南市",
        "constituency2": "3",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台南市",
        "candidateConstituency2": "3"
    },
    "67": {
        "id": 67,
        "name": "陳唐山",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "80",
        "isCurrent": true,
        "constituency1": "台南市",
        "constituency2": "5",
        "isCandidate": false,
        "hasResigned": false,
        "candidateConstituency1": "N/A",
        "candidateConstituency2": "N/A"
    },
    "68": {
        "id": 68,
        "name": "陳根德",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "59",
        "isCurrent": true,
        "constituency1": "桃園縣",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "桃園縣",
        "candidateConstituency2": "1"
    },
    "69": {
        "id": 69,
        "name": "陳素月",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2015/2/16",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "49",
        "isCurrent": true,
        "constituency1": "彰化縣",
        "constituency2": "4",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "彰化縣",
        "candidateConstituency2": "4"
    },
    "70": {
        "id": 70,
        "name": "陳淑慧",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "58",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "71": {
        "id": 71,
        "name": "陳雪生",
        "parties": [
            {
                "partyCht": "無黨籍",
                "startDate": "2012/2/1",
                "endDate": "2015/7/7"
            },
            {
                "partyCht": "中國國民黨",
                "startDate": "2015/7/8",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "63",
        "isCurrent": true,
        "constituency1": "連江縣",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "連江縣",
        "candidateConstituency2": "N/A"
    },
    "72": {
        "id": 72,
        "name": "陳超明",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "64",
        "isCurrent": true,
        "constituency1": "苗栗縣",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "苗栗縣",
        "candidateConstituency2": "1"
    },
    "73": {
        "id": 73,
        "name": "陳節如",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "71",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "74": {
        "id": 74,
        "name": "陳碧涵",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "55",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "75": {
        "id": 75,
        "name": "陳歐珀",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "54",
        "isCurrent": true,
        "constituency1": "宜蘭縣",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "宜蘭縣",
        "candidateConstituency2": "N/A"
    },
    "76": {
        "id": 76,
        "name": "陳學聖",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "58",
        "isCurrent": true,
        "constituency1": "桃園縣",
        "constituency2": "3",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "桃園縣",
        "candidateConstituency2": "3"
    },
    "77": {
        "id": 77,
        "name": "陳鎮湘",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "73",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "78": {
        "id": 78,
        "name": "曾巨威",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "64",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "79": {
        "id": 79,
        "name": "費鴻泰",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "61",
        "isCurrent": true,
        "constituency1": "台北市",
        "constituency2": "7",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台北市",
        "candidateConstituency2": "7"
    },
    "80": {
        "id": 80,
        "name": "黃文玲",
        "parties": [
            {
                "partyCht": "台聯",
                "startDate": "2012/2/1",
                "endDate": "2014/2/1"
            }
        ],
        "gender": "女",
        "age": "46",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": true,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "81": {
        "id": 81,
        "name": "黃志雄",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "39",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "5",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "5"
    },
    "82": {
        "id": 82,
        "name": "黃昭順",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "62",
        "isCurrent": true,
        "constituency1": "高雄市",
        "constituency2": "3",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "高雄市",
        "candidateConstituency2": "3"
    },
    "83": {
        "id": 83,
        "name": "黃偉哲",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "52",
        "isCurrent": true,
        "constituency1": "台南市",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台南市",
        "candidateConstituency2": "2"
    },
    "84": {
        "id": 84,
        "name": "黃國書",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2015/2/16",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "51",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "6",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "6"
    },
    "85": {
        "id": 85,
        "name": "楊玉欣",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "41",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "86": {
        "id": 86,
        "name": "楊應雄",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "61",
        "isCurrent": true,
        "constituency1": "金門縣",
        "constituency2": "N/A",
        "isCandidate": false,
        "hasResigned": false,
        "candidateConstituency1": "N/A",
        "candidateConstituency2": "N/A"
    },
    "87": {
        "id": 87,
        "name": "楊曜",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "49",
        "isCurrent": true,
        "constituency1": "澎湖縣",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "澎湖縣",
        "candidateConstituency2": "N/A"
    },
    "88": {
        "id": 88,
        "name": "楊瓊瓔",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "51",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "3",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "3"
    },
    "89": {
        "id": 89,
        "name": "楊麗環",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "58",
        "isCurrent": true,
        "constituency1": "桃園縣",
        "constituency2": "4",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "桃園縣",
        "candidateConstituency2": "4"
    },
    "90": {
        "id": 90,
        "name": "葉宜津",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "55",
        "isCurrent": true,
        "constituency1": "台南市",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台南市",
        "candidateConstituency2": "1"
    },
    "91": {
        "id": 91,
        "name": "葉津鈴",
        "parties": [
            {
                "partyCht": "台聯",
                "startDate": "2013/7/26",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "68",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "92": {
        "id": 92,
        "name": "詹凱臣",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "61",
        "isCurrent": true,
        "constituency1": "僑居國外國民",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "93": {
        "id": 93,
        "name": "詹滿容",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2015/7/20",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "59",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "94": {
        "id": 94,
        "name": "廖正井",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "70",
        "isCurrent": true,
        "constituency1": "桃園縣",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "桃園縣",
        "candidateConstituency2": "2"
    },
    "95": {
        "id": 95,
        "name": "廖國棟",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "60",
        "isCurrent": true,
        "constituency1": "平地原住民",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "平地原住民",
        "candidateConstituency2": "N/A"
    },
    "96": {
        "id": 96,
        "name": "管碧玲",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "59",
        "isCurrent": true,
        "constituency1": "高雄市",
        "constituency2": "5",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "高雄市",
        "candidateConstituency2": "5"
    },
    "97": {
        "id": 97,
        "name": "趙天麟",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "42",
        "isCurrent": true,
        "constituency1": "高雄市",
        "constituency2": "7",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "高雄市",
        "candidateConstituency2": "7"
    },
    "98": {
        "id": 98,
        "name": "劉建國",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "46",
        "isCurrent": true,
        "constituency1": "雲林縣",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "雲林縣",
        "candidateConstituency2": "2"
    },
    "99": {
        "id": 99,
        "name": "劉櫂豪",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "48",
        "isCurrent": true,
        "constituency1": "台東縣",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台東縣",
        "candidateConstituency2": "N/A"
    },
    "100": {
        "id": 100,
        "name": "潘孟安",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": "2014/12/25"
            }
        ],
        "gender": "男",
        "age": "52",
        "isCurrent": true,
        "constituency1": "屏東縣",
        "constituency2": "3",
        "isCandidate": true,
        "hasResigned": true,
        "candidateConstituency1": "屏東縣",
        "candidateConstituency2": "3"
    },
    "101": {
        "id": 101,
        "name": "潘維剛",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "58",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "102": {
        "id": 102,
        "name": "蔡正元",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "62",
        "isCurrent": true,
        "constituency1": "台北市",
        "constituency2": "4",
        "isCandidate": false,
        "hasResigned": false,
        "candidateConstituency1": "N/A",
        "candidateConstituency2": "N/A"
    },
    "103": {
        "id": 103,
        "name": "蔡其昌",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "46",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "1"
    },
    "104": {
        "id": 104,
        "name": "蔡煌瑯",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "55",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "105": {
        "id": 105,
        "name": "蔡錦隆",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "57",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "4",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "4"
    },
    "106": {
        "id": 106,
        "name": "蔣乃辛",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "61",
        "isCurrent": true,
        "constituency1": "台北市",
        "constituency2": "6",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台北市",
        "candidateConstituency2": "6"
    },
    "107": {
        "id": 107,
        "name": "鄭天財Sra·Kacaw",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "59",
        "isCurrent": true,
        "constituency1": "平地原住民",
        "constituency2": "N/A",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "平地原住民",
        "candidateConstituency2": "N/A"
    },
    "108": {
        "id": 108,
        "name": "鄭汝芬",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "58",
        "isCurrent": true,
        "constituency1": "彰化縣",
        "constituency2": "3",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "彰化縣",
        "candidateConstituency2": "3"
    },
    "109": {
        "id": 109,
        "name": "鄭麗君",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "46",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "110": {
        "id": 110,
        "name": "盧秀燕",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "54",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "5",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "5"
    },
    "111": {
        "id": 111,
        "name": "盧嘉辰",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "63",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "10",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "10"
    },
    "112": {
        "id": 112,
        "name": "蕭美琴",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "44",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "113": {
        "id": 113,
        "name": "賴士葆",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "64",
        "isCurrent": true,
        "constituency1": "台北市",
        "constituency2": "8",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台北市",
        "candidateConstituency2": "8"
    },
    "114": {
        "id": 114,
        "name": "賴振昌",
        "parties": [
            {
                "partyCht": "台聯",
                "startDate": "2014/2/10",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "57",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "115": {
        "id": 115,
        "name": "薛凌",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "63",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "116": {
        "id": 116,
        "name": "謝國樑",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "40",
        "isCurrent": true,
        "constituency1": "基隆市",
        "constituency2": "N/A",
        "isCandidate": false,
        "hasResigned": false,
        "candidateConstituency1": "N/A",
        "candidateConstituency2": "N/A"
    },
    "117": {
        "id": 117,
        "name": "簡東明",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "64",
        "isCurrent": true,
        "constituency1": "山地原住民",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "118": {
        "id": 118,
        "name": "顏清標",
        "parties": [
            {
                "partyCht": "無黨團結聯盟",
                "startDate": "2012/2/1",
                "endDate": "2012/11/28"
            }
        ],
        "gender": "男",
        "age": "55",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": true,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "2"
    },
    "119": {
        "id": 119,
        "name": "顏寬恒",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2013/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "38",
        "isCurrent": true,
        "constituency1": "台中市",
        "constituency2": "2",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "台中市",
        "candidateConstituency2": "2"
    },
    "120": {
        "id": 120,
        "name": "魏明谷",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": "2014/11/25"
            }
        ],
        "gender": "男",
        "age": "52",
        "isCurrent": true,
        "constituency1": "彰化縣",
        "constituency2": "4",
        "isCandidate": true,
        "hasResigned": true,
        "candidateConstituency1": "彰化縣",
        "candidateConstituency2": "4"
    },
    "121": {
        "id": 121,
        "name": "羅明才",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "48",
        "isCurrent": true,
        "constituency1": "新北市",
        "constituency2": "11",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "新北市",
        "candidateConstituency2": "11"
    },
    "122": {
        "id": 122,
        "name": "羅淑蕾",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "女",
        "age": "63",
        "isCurrent": true,
        "constituency1": "台北市",
        "constituency2": "3",
        "isCandidate": false,
        "hasResigned": false,
        "candidateConstituency1": "N/A",
        "candidateConstituency2": "N/A"
    },
    "123": {
        "id": 123,
        "name": "蘇清泉",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "58",
        "isCurrent": true,
        "constituency1": "全國不分區",
        "constituency2": "N/A",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "124": {
        "id": 124,
        "name": "蘇震清",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "男",
        "age": "50",
        "isCurrent": true,
        "constituency1": "屏東縣",
        "constituency2": "1",
        "isCandidate": true,
        "hasResigned": false,
        "candidateConstituency1": "屏東縣",
        "candidateConstituency2": "1"
    },
    "125": {
        "id": 125,
        "name": "國民黨黨團",
        "parties": [
            {
                "partyCht": "中國國民黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "",
        "age": "",
        "isCurrent": "unknown",
        "constituency1": "",
        "constituency2": "",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "126": {
        "id": 126,
        "name": "民進黨黨團",
        "parties": [
            {
                "partyCht": "民主進步黨",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "",
        "age": "",
        "isCurrent": "unknown",
        "constituency1": "",
        "constituency2": "",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "127": {
        "id": 127,
        "name": "台灣團結聯盟黨團",
        "parties": [
            {
                "partyCht": "台聯",
                "startDate": "2012/2/1",
                "endDate": ""
            }
        ],
        "gender": "",
        "age": "",
        "isCurrent": "unknown",
        "constituency1": "",
        "constituency2": "",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "128": {
        "id": 128,
        "name": "親民黨黨團",
        "parties": [
            {
                "partyCht": "親民黨",
                "startDate": "2012/2/1",
                "endDate": "2013/7/11"
            }
        ],
        "gender": "",
        "age": "",
        "isCurrent": "unknown",
        "constituency1": "",
        "constituency2": "",
        "isCandidate": "unknown",
        "hasResigned": false,
        "candidateConstituency1": "",
        "candidateConstituency2": ""
    },
    "129": {
        "id": 129,
        "name": "范雲"
    },
    "130": {
        "id": 130,
        "name": "陳家宏"
    },
    "131": {
        "id": 131,
        "name": "吳旭智"
    },
    "132": {
        "id": 132,
        "name": "曾獻瑩"
    },
    "133": {
        "id": 133,
        "name": "林珍妤"
    },
    "134": {
        "id": 134,
        "name": "龎維良"
    },
    "135": {
        "id": 135,
        "name": "周芳如"
    }

}


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case INCREMENT:
    //   const {count} = state;
    //   return {
    //     count: count + 1
    //   };
    default:
      return state;
  }
}

