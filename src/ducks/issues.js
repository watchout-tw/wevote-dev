const initialState = {
    /* 從 url 對應的議題資料 */
    "marriage-equality" : {
      "title" : "婚姻平權",
      "titleEng" : "marriageEquality",
      "question" : "你是否支持同性婚姻合法化？",
      "statement" : "同性婚姻合法化",
      "slideshows" : [1,2,3,4,5,6,7,8,9,10],
      "description" : "你知道婚姻平權草案在修什麼嗎？關於婚姻平權的正反方論述，帶你來了解。",
      "collaborators" : [
        {
          "name" : "伴侶盟",
          "link" : "https://tapcpr.wordpress.com/"
        }
      ]
    },
    "recall" : {
      "title" : "罷免",
      "titleEng" : "recall",
      "question" : "你是否支持下修罷免門檻？",
      "statement" : "下修罷免門檻",
      "slideshows" : [11,12,13,14,15,16,17],
      "description" : "你支持罷免門檻下修嗎？你知道台灣罷免門檻有哪些嗎？關於台灣選罷法修法進度，一起來看看。",
      "collaborators" : [
        {
          "name" : "割闌尾",
          "link" : "http://appy.tw/"
        }
      ]
    },
    "referendum" : {
      "title" : "公投",
      "titleEng" : "referendum",
      "question" : "你支持公投門檻下修嗎?",
      "statement" : "下修公投門檻",
      "slideshows" : [18,19],
      "description" : "你知道台灣公投門檻難於登天嗎？一起來了解公投，拿回屬於人民的權利。",
      "collaborators" : [
        {
          "name" : "島國前進",
          "link" : "http://taiwanmarch.tw/"
        }
      ]
    },
    "nuclear-power" : {
      "title" : "核四",
      "titleEng" : "nuclearPower",
      "question" : "你支持核四停建嗎?",
      "statement" : "核四停建",
      "slideshows" : [18,19],
      "description" : "你支持停建核四嗎？你知道核四蓋了十六年嗎？關於核能來看看還有哪些你知道或不知道的。",
      "collaborators" : [
        {
          "name" : "綠盟?",
          "link" : "http://www.gcaa.org.tw/"
        }
      ]
    } 
   
}
//你支持停建核四嗎？你知道核四蓋了十六年嗎？關於核能來看看還有哪些你知道或不知道的。

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

