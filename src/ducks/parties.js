const initialState = {
    "KMT": {
        "id": "KMT",
        "name": "中國國民黨",
        "seats" : 65,
        "hasBeenCount" : 69
    },
    "DPP": {
        "id": "DPP",
        "name": "民主進步黨",
        "seats" : 40,
        "hasBeenCount" : 43
    },
    "TSU": {
        "id": "TSU",
        "name": "台灣團結聯盟",
        "seats" : 3,
        "hasBeenCount" : 6
    },
    "PFP": {
        "id": "PFP",
        "name": "親民黨",
        "seats" : 2,
        "hasBeenCount" : 4
    },
    "NSU": {
        "id": "NSU",
        "name": "無黨團結聯盟",
        "seats" : 1,
        "hasBeenCount" : 2
    },
    "MKT": {
        "id": "MKT",
        "name": "民國黨",
        "seats": 1,
        "hasBeenCount" : 1
    },
    "NPP": {
        "id": "NPP",
        "name": "時代力量",
        "seats": 0,
        "hasBeenCount": 0
    },
    "GSD": {
        "id": "GSD",
        "name": "綠黨社會民主黨聯盟",
        "seats": 0,
        "hasBeenCount": 0
    },
    "NP": {
        "id": "NP",
        "name": "新黨",
        "seats": 0,
        "hasBeenCount": 0
    },
    "MCFAP": {
        "id": "MCFAP",
        "name": "軍公教聯盟黨",
        "seats": 0,
        "hasBeenCount": 0
    },
    "TP": {
        "id": "TP",
        "name": "樹黨",
        "seats": 0,
        "hasBeenCount": 0
    },
    "TIP": {
        "id": "TIP",
        "name": "台灣獨立黨",
        "seats": 0,
        "hasBeenCount": 0
    },
    "FHL": {
        "id": "FHL",
        "name": "信心希望聯盟",
        "seats": 0,
        "hasBeenCount": 0
    },
    "MPR": {
        "id": "MPR",
        "name": "中華民國機車黨",
        "seats": 0,
        "hasBeenCount": 0
    },
    "FTP": {
        "id": "FTP",
        "name": "自由台灣黨",
        "seats": 0,
        "hasBeenCount": 0
    },
    "NONE": {
        "id": "NONE",
        "name": "無黨籍",
        "seats" : 0,
        "hasBeenCount" : 1
    }    
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

