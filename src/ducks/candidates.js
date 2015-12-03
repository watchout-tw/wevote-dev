const initialState = {
    "1": {
        "name": "丁守中",
        "id": 1,
        "party": "KMT",
        "districtArea": "TPE",
        "districtNo": "1"
    }
}


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

