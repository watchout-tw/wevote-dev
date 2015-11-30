const initialState = {
    "KMT": {
        "id": "KMT",
        "name": "中國國民黨",
        "seats" : 65,
        "hasBeenCount" : 69,
        "side" : 2
    },
    "DPP": {
        "id": "DPP",
        "name": "民主進步黨",
        "seats" : 40,
        "hasBeenCount" : 43,
        "side" : 1
    },
    "TSU": {
        "id": "TSU",
        "name": "台灣團結聯盟",
        "seats" : 3,
        "hasBeenCount" : 6,
        "side" : 1
    },
    "PFP": {
        "id": "PFP",
        "name": "親民黨",
        "seats" : 2,
        "hasBeenCount" : 4,
        "side" : 2
    },
    "NSU": {
        "id": "NSU",
        "name": "無黨團結聯盟",
        "seats" : 1,
        "hasBeenCount" : 2,
        "side" : 2
    },
    "MKT": {
        "id": "MKT",
        "name": "民國黨",
        "seats": 1,
        "hasBeenCount" : 1,
        "side" : 2
    },
    "NPP": {
        "id": "NPP",
        "name": "時代力量",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "GSD": {
        "id": "GSD",
        "name": "綠黨社會民主黨聯盟",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "NP": {
        "id": "NP",
        "name": "新黨",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2
    },
    "MCFAP": {
        "id": "MCFAP",
        "name": "軍公教聯盟黨",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2
    },
    "TP": {
        "id": "TP",
        "name": "樹黨",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "TIP": {
        "id": "TIP",
        "name": "台灣獨立黨",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "FHL": {
        "id": "FHL",
        "name": "信心希望聯盟",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2
    },
    "MPR": {
        "id": "MPR",
        "name": "中華民國機車黨",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2
    },
    "FTP": {
        "id": "FTP",
        "name": "自由台灣黨",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "PPU": {
        "id": "PPU",
        "name": "和平鴿聯盟黨",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2 
    },
    "DASG": {
        "id": "DASG",
        "name": "大愛憲改聯盟",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2 
    },
    "CHTY": {
        "id": "CHTY",
        "name": "中華統一促進黨",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2 
    },
    "NHSA": {
        "id": "NHSA",
        "name": "健保免費連線",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1 
    },
    "NONE": {
        "id": "NONE",
        "name": "無黨籍",
        "seats" : 0,
        "hasBeenCount" : 1,
        "side" : 2
    }    
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

