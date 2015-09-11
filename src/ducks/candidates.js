const initialState = {
    "1": {
        "id": 1,
        "name": "丁守中",
        "education": "美國佛萊契爾外交法律研究院（哈佛大學合作管理）外交法律碩士、國際政治學博士\n台大政治系學士"
    },
    "2": {
        "id": 2,
        "name": "孔文吉",
        "education": ""
    },
    "3": {
        "id": 3,
        "name": "尤美女",
        "education": ""
    },
    "4": {
        "id": 4,
        "name": "王廷升",
        "education": ""
    },
    "5": {
        "id": 5,
        "name": "王育敏",
        "education": ""
    },
    "6": {
        "id": 6,
        "name": "王金平",
        "education": ""
    },
    "7": {
        "id": 7,
        "name": "王惠美",
        "education": ""
    },
    "8": {
        "id": 8,
        "name": "王進士",
        "education": ""
    },
    "9": {
        "id": 9,
        "name": "田秋堇",
        "education": ""
    },
    "10": {
        "id": 10,
        "name": "江啟臣",
        "education": ""
    },
    "11": {
        "id": 11,
        "name": "江惠貞",
        "education": ""
    },
    "12": {
        "id": 12,
        "name": "何欣純",
        "education": ""
    },
    "13": {
        "id": 13,
        "name": "吳育仁",
        "education": ""
    },
    "14": {
        "id": 14,
        "name": "吳育昇",
        "education": ""
    },
    "15": {
        "id": 15,
        "name": "吳宜臻",
        "education": ""
    },
    "16": {
        "id": 16,
        "name": "吳秉叡",
        "education": ""
    },
    "17": {
        "id": 17,
        "name": "呂玉玲",
        "education": ""
    },
    "18": {
        "id": 18,
        "name": "呂學樟",
        "education": ""
    },
    "19": {
        "id": 19,
        "name": "李昆澤",
        "education": ""
    },
    "20": {
        "id": 20,
        "name": "李俊俋",
        "education": ""
    },
    "21": {
        "id": 21,
        "name": "李桐豪",
        "education": ""
    },
    "22": {
        "id": 22,
        "name": "李貴敏",
        "education": ""
    },
    "23": {
        "id": 23,
        "name": "李慶華",
        "education": ""
    },
    "24": {
        "id": 24,
        "name": "李應元",
        "education": ""
    },
    "25": {
        "id": 25,
        "name": "李鴻鈞",
        "education": ""
    },
    "26": {
        "id": 26,
        "name": "周倪安",
        "education": ""
    },
    "27": {
        "id": 27,
        "name": "林世嘉",
        "education": ""
    },
    "28": {
        "id": 28,
        "name": "林正二",
        "education": ""
    },
    "29": {
        "id": 29,
        "name": "林佳龍",
        "education": ""
    },
    "30": {
        "id": 30,
        "name": "林岱樺",
        "education": ""
    },
    "31": {
        "id": 31,
        "name": "林明溱",
        "education": ""
    },
    "32": {
        "id": 32,
        "name": "林郁方",
        "education": ""
    },
    "33": {
        "id": 33,
        "name": "林國正",
        "education": ""
    },
    "34": {
        "id": 34,
        "name": "林淑芬",
        "education": ""
    },
    "35": {
        "id": 35,
        "name": "林滄敏",
        "education": ""
    },
    "36": {
        "id": 36,
        "name": "林德福",
        "education": ""
    },
    "37": {
        "id": 37,
        "name": "林鴻池",
        "education": ""
    },
    "38": {
        "id": 38,
        "name": "邱文彥",
        "education": ""
    },
    "39": {
        "id": 39,
        "name": "邱志偉",
        "education": ""
    },
    "40": {
        "id": 40,
        "name": "邱議瑩",
        "education": ""
    },
    "41": {
        "id": 41,
        "name": "姚文智",
        "education": ""
    },
    "42": {
        "id": 42,
        "name": "柯建銘",
        "education": ""
    },
    "43": {
        "id": 43,
        "name": "段宜康",
        "education": ""
    },
    "44": {
        "id": 44,
        "name": "洪秀柱",
        "education": ""
    },
    "45": {
        "id": 45,
        "name": "紀國棟",
        "education": ""
    },
    "46": {
        "id": 46,
        "name": "孫大千",
        "education": ""
    },
    "47": {
        "id": 47,
        "name": "徐少萍",
        "education": ""
    },
    "48": {
        "id": 48,
        "name": "徐志榮",
        "education": ""
    },
    "49": {
        "id": 49,
        "name": "徐欣瑩",
        "education": ""
    },
    "50": {
        "id": 50,
        "name": "徐耀昌",
        "education": ""
    },
    "51": {
        "id": 51,
        "name": "翁重鈞",
        "education": ""
    },
    "52": {
        "id": 52,
        "name": "馬文君",
        "education": ""
    },
    "53": {
        "id": 53,
        "name": "高志鵬",
        "education": ""
    },
    "54": {
        "id": 54,
        "name": "高金素梅",
        "education": ""
    },
    "55": {
        "id": 55,
        "name": "張嘉郡",
        "education": ""
    },
    "56": {
        "id": 56,
        "name": "張慶忠",
        "education": ""
    },
    "57": {
        "id": 57,
        "name": "張曉風",
        "education": ""
    },
    "58": {
        "id": 58,
        "name": "莊瑞雄",
        "education": ""
    },
    "59": {
        "id": 59,
        "name": "許忠信",
        "education": ""
    },
    "60": {
        "id": 60,
        "name": "許淑華",
        "education": ""
    },
    "61": {
        "id": 61,
        "name": "許添財",
        "education": ""
    },
    "62": {
        "id": 62,
        "name": "許智傑",
        "education": ""
    },
    "63": {
        "id": 63,
        "name": "陳其邁",
        "education": ""
    },
    "64": {
        "id": 64,
        "name": "陳怡潔",
        "education": ""
    },
    "65": {
        "id": 65,
        "name": "陳明文",
        "education": ""
    },
    "66": {
        "id": 66,
        "name": "陳亭妃",
        "education": ""
    },
    "67": {
        "id": 67,
        "name": "陳唐山",
        "education": ""
    },
    "68": {
        "id": 68,
        "name": "陳根德",
        "education": ""
    },
    "69": {
        "id": 69,
        "name": "陳素月",
        "education": ""
    },
    "70": {
        "id": 70,
        "name": "陳淑慧",
        "education": ""
    },
    "71": {
        "id": 71,
        "name": "陳雪生",
        "education": ""
    },
    "72": {
        "id": 72,
        "name": "陳超明",
        "education": ""
    },
    "73": {
        "id": 73,
        "name": "陳節如",
        "education": ""
    },
    "74": {
        "id": 74,
        "name": "陳碧涵",
        "education": ""
    },
    "75": {
        "id": 75,
        "name": "陳歐珀",
        "education": ""
    },
    "76": {
        "id": 76,
        "name": "陳學聖",
        "education": ""
    },
    "77": {
        "id": 77,
        "name": "陳鎮湘",
        "education": ""
    },
    "78": {
        "id": 78,
        "name": "曾巨威",
        "education": ""
    },
    "79": {
        "id": 79,
        "name": "費鴻泰",
        "education": ""
    },
    "80": {
        "id": 80,
        "name": "黃文玲",
        "education": ""
    },
    "81": {
        "id": 81,
        "name": "黃志雄",
        "education": ""
    },
    "82": {
        "id": 82,
        "name": "黃昭順",
        "education": ""
    },
    "83": {
        "id": 83,
        "name": "黃偉哲",
        "education": ""
    },
    "84": {
        "id": 84,
        "name": "黃國書",
        "education": ""
    },
    "85": {
        "id": 85,
        "name": "楊玉欣",
        "education": ""
    },
    "86": {
        "id": 86,
        "name": "楊應雄",
        "education": ""
    },
    "87": {
        "id": 87,
        "name": "楊曜",
        "education": ""
    },
    "88": {
        "id": 88,
        "name": "楊瓊瓔",
        "education": ""
    },
    "89": {
        "id": 89,
        "name": "楊麗環",
        "education": ""
    },
    "90": {
        "id": 90,
        "name": "葉宜津",
        "education": ""
    },
    "91": {
        "id": 91,
        "name": "葉津鈴",
        "education": ""
    },
    "92": {
        "id": 92,
        "name": "詹凱臣",
        "education": ""
    },
    "93": {
        "id": 93,
        "name": "詹滿容",
        "education": ""
    },
    "94": {
        "id": 94,
        "name": "廖正井",
        "education": ""
    },
    "95": {
        "id": 95,
        "name": "廖國棟",
        "education": ""
    },
    "96": {
        "id": 96,
        "name": "管碧玲",
        "education": ""
    },
    "97": {
        "id": 97,
        "name": "趙天麟",
        "education": ""
    },
    "98": {
        "id": 98,
        "name": "劉建國",
        "education": ""
    },
    "99": {
        "id": 99,
        "name": "劉櫂豪",
        "education": ""
    },
    "100": {
        "id": 100,
        "name": "潘孟安",
        "education": ""
    },
    "101": {
        "id": 101,
        "name": "潘維剛",
        "education": ""
    },
    "102": {
        "id": 102,
        "name": "蔡正元",
        "education": ""
    },
    "103": {
        "id": 103,
        "name": "蔡其昌",
        "education": ""
    },
    "104": {
        "id": 104,
        "name": "蔡煌瑯",
        "education": ""
    },
    "105": {
        "id": 105,
        "name": "蔡錦隆",
        "education": ""
    },
    "106": {
        "id": 106,
        "name": "蔣乃辛",
        "education": ""
    },
    "107": {
        "id": 107,
        "name": "鄭天財Sra．Kacaw",
        "education": ""
    },
    "108": {
        "id": 108,
        "name": "鄭汝芬",
        "education": ""
    },
    "109": {
        "id": 109,
        "name": "鄭麗君",
        "education": ""
    },
    "110": {
        "id": 110,
        "name": "盧秀燕",
        "education": ""
    },
    "111": {
        "id": 111,
        "name": "盧嘉辰",
        "education": ""
    },
    "112": {
        "id": 112,
        "name": "蕭美琴",
        "education": ""
    },
    "113": {
        "id": 113,
        "name": "賴士葆",
        "education": ""
    },
    "114": {
        "id": 114,
        "name": "賴振昌",
        "education": ""
    },
    "115": {
        "id": 115,
        "name": "薛凌",
        "education": ""
    },
    "116": {
        "id": 116,
        "name": "謝國樑",
        "education": ""
    },
    "117": {
        "id": 117,
        "name": "簡東明",
        "education": ""
    },
    "118": {
        "id": 118,
        "name": "顏清標",
        "education": ""
    },
    "119": {
        "id": 119,
        "name": "顏寬恒",
        "education": ""
    },
    "120": {
        "id": 120,
        "name": "魏明谷",
        "education": ""
    },
    "121": {
        "id": 121,
        "name": "羅明才",
        "education": ""
    },
    "122": {
        "id": 122,
        "name": "羅淑蕾",
        "education": ""
    },
    "123": {
        "id": 123,
        "name": "蘇清泉",
        "education": ""
    },
    "124": {
        "id": 124,
        "name": "蘇震清",
        "education": ""
    }
};


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

