const initialState = {
    "parties" : "截至網站更新前（12月15日），已有自由台灣黨、時代力量、綠社盟、樹黨、大愛憲改聯盟、台聯回覆，我們歡迎每個政黨進行表態承諾的回覆。",
    "people" : "截至網站更新前（12月15日），已有 xx 位立委候選人回覆，我們歡迎每位立委參選人進行表態承諾的回覆。",
    "updateTime" : "2015/12/15"

}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
