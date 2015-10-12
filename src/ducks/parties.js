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
    "NONE": {
        "id": "NONE",
        "name": "無黨籍",
        "seats" : 0,
        "hasBeenCount" : 1
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

