const initialState = {

    "1" : { 
        "name":"丁守中",
        "party":"KMT"
    },
    "2" : { 
        "name":"鄭麗君",
        "party":"DPP"
    },
    "3" : { 
        "name":"尤美女",
        "party":"DPP"
    },
    "4" : { 
        "name":"黃昭順",
        "party":"KMT"
    },
    "5" : { 
        "name":"張嘉郡",
        "party":"KMT"
    },
    "6" : { 
        "name":"柯建銘",
        "party":"DPP"
    },
    "7" : { 
        "name":"許忠信",
        "party":"TSU"
    },
    "8" : { 
        "name":"陳其邁",
        "party":"DPP"
    },
    "9" : { 
        "name":"李貴敏",
        "party":"KMT"
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

