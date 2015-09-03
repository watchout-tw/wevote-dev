const initialState = {
    
    "marriage-equality" : {
      "title" : "婚姻平權",
      "question" : "你是否支持同性婚姻合法化？",
      "positions" : [
        {  "position" : "for", "id" : [1, 5, 6] },
        {  "position" : "against", "id" : [2, 7] },
        {  "position" : "unknown", "id" : [3] },
        {  "position" : "none", "id" : [4] }
      ]
    },
    "recall" : {
      "title" : "罷免",
      "question" : "你是否支持下修罷免門檻？",
      "positions" : [
        {  "position" : "for", "id" : [4] },
        {  "position" : "against", "id" : [3] },
        {  "position" : "unknown", "id" : [1] },
        {  "position" : "none", "id" : [7] }
      ]
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

