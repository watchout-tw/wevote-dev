const initialState = {

    "KMT" : {
       "title": "中國國民黨",
       "id"   : "KMT",
       "list" : []
    },
    "DPP" : {
        "title": "民主進步黨",
        "id"   : "DPP",
        "list" : ["吳焜裕","吳玉琴","陳曼麗","顧立雄","蔡培慧","王榮璋","Kolas Yotaka","余宛如","蘇嘉全","段宜康","鄭麗君","陳其邁","尤美女","李應元","鍾孔炤","林靜儀","徐國勇","施義芳","周春米","李麗芬","郭正亮","邱泰源","蔣絜安","陳靜敏","黃義佑","余莓莓","陳義聰","阿布娪‧卡阿斐依亞那","謝世英","曾美玲","董建宏","蔡宛芬","黃帝穎","王貴蓮"],
    },
    "TSU" : {
        "title": "台灣團結聯盟",
        "id"   : "TSU",
        "list" : ["陳奕齊"]
    },
    "PFP" : {
        "title": "親民黨",
        "id"   : "PFP",
        "list" : [""]
    },
    "PFP" : {
        "title": "親民黨",
        "id"   : "PFP",
        "list" : [""]
    },
    "NSU" : {
       "title": "無黨團結聯盟",
       "id"   : "NSU",
       "list" : ["林炳坤","蔡詠鍀"] 
    },
    "GSD" : {
       "title": "綠黨社會民主黨聯盟",
       "id"   : "GSD",
       "list" : ["張麗芬","李根政","詹順貴","葉大華","謝英俊","許秀雯"] 
    },
    "NPP" : {
       "title": "時代力量",
       "id"   : "NPP",
       "list" : ["高潞‧以用‧巴魕剌","林依瑩","鄭秀玲","柯一正","徐永明"] 
    },
    "FTP" : {
       "title": "自由台灣黨",
       "id"   : "FTP",
       "list" : ["張文瑜","蕭曉玲","郭正典","張銘祐","林世杰"] 
    },
    "MCFAP" : {
       "title": "軍公教聯盟黨",
       "id"   : "MCFAP",
       "list" : ["莊淇銘","陳金梅","胡鎮埔"] 
    }    
};
//民國黨 MKT
//信心希望聯盟 FHL

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

