const candidates = {
    "丁守中": 1,
    "孔文吉": 2,
    "尤美女": 3,
    "王廷升": 4,
    "王育敏": 5,
    "王金平": 6,
    "王惠美": 7,
    "王進士": 8,
    "田秋堇": 9,
    "江啟臣": 10,
    "江惠貞": 11,
    "何欣純": 12,
    "吳育仁": 13,
    "吳育昇": 14,
    "吳宜臻": 15,
    "吳秉叡": 16,
    "呂玉玲": 17,
    "呂學樟": 18,
    "李昆澤": 19,
    "李俊俋": 20,
    "李桐豪": 21,
    "李貴敏": 22,
    "李慶華": 23,
    "李應元": 24,
    "李鴻鈞": 25,
    "周倪安": 26,
    "林世嘉": 27,
    "林正二": 28,
    "林佳龍": 29,
    "林岱樺": 30,
    "林明溱": 31,
    "林郁方": 32,
    "林國正": 33,
    "林淑芬": 34,
    "林滄敏": 35,
    "林德福": 36,
    "林鴻池": 37,
    "邱文彥": 38,
    "邱志偉": 39,
    "邱議瑩": 40,
    "姚文智": 41,
    "柯建銘": 42,
    "段宜康": 43,
    "洪秀柱": 44,
    "紀國棟": 45,
    "孫大千": 46,
    "徐少萍": 47,
    "徐志榮": 48,
    "徐欣瑩": 49,
    "徐耀昌": 50,
    "翁重鈞": 51,
    "馬文君": 52,
    "高志鵬": 53,
    "高金素梅": 54,
    "張嘉郡": 55,
    "張慶忠": 56,
    "張曉風": 57,
    "莊瑞雄": 58,
    "許忠信": 59,
    "許淑華": 60,
    "許添財": 61,
    "許智傑": 62,
    "陳其邁": 63,
    "陳怡潔": 64,
    "陳明文": 65,
    "陳亭妃": 66,
    "陳唐山": 67,
    "陳根德": 68,
    "陳素月": 69,
    "陳淑慧": 70,
    "陳雪生": 71,
    "陳超明": 72,
    "陳節如": 73,
    "陳碧涵": 74,
    "陳歐珀": 75,
    "陳學聖": 76,
    "陳鎮湘": 77,
    "曾巨威": 78,
    "費鴻泰": 79,
    "黃文玲": 80,
    "黃志雄": 81,
    "黃昭順": 82,
    "黃偉哲": 83,
    "黃國書": 84,
    "楊玉欣": 85,
    "楊應雄": 86,
    "楊曜": 87,
    "楊瓊瓔": 88,
    "楊麗環": 89,
    "葉宜津": 90,
    "葉津鈴": 91,
    "詹凱臣": 92,
    "詹滿容": 93,
    "廖正井": 94,
    "廖國棟": 95,
    "管碧玲": 96,
    "趙天麟": 97,
    "劉建國": 98,
    "劉櫂豪": 99,
    "潘孟安": 100,
    "潘維剛": 101,
    "蔡正元": 102,
    "蔡其昌": 103,
    "蔡煌瑯": 104,
    "蔡錦隆": 105,
    "蔣乃辛": 106,
    "鄭天財Sra．Kacaw": 107,
    "鄭汝芬": 108,
    "鄭麗君": 109,
    "盧秀燕": 110,
    "盧嘉辰": 111,
    "蕭美琴": 112,
    "賴士葆": 113,
    "賴振昌": 114,
    "薛凌": 115,
    "謝國樑": 116,
    "簡東明": 117,
    "顏清標": 118,
    "顏寬恒": 119,
    "魏明谷": 120,
    "羅明才": 121,
    "羅淑蕾": 122,
    "蘇清泉": 123,
    "蘇震清": 124
}

export default function candidates_name2id(name){
 	if(candidates[name])
 		return candidates[name]
 	else
 		return "1";///// 
}
