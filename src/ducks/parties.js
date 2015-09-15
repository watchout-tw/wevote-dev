const initialState = {
    "KMT": {
        "id": "KMT",
        "name": "中國國民黨"
    },
    "DPP": {
        "id": "DPP",
        "name": "民主進步黨"
    },
    "TSU": {
        "id": "TSU",
        "name": "台灣團結聯盟"
    },
    "PFP": {
        "id": "PFP",
        "name": "親民黨"
    },
    
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

