import district2cht from './district2cht';
export default function district_sub2cht(area, areaNo){
 	let areaCht = district2cht(area);
    if(singleArea[areaCht]){
        return singleArea[areaCht];
    }else{
        return `第${numerals[Number(areaNo)]}選區`;
    }
}
const numerals = ['〇','一','二','三','四','五','六','七','八','九','十','十一','十二','十三'];
//處理該縣市只有單一選區
const singleArea = {
  "基隆市":"全市",
  "新竹縣":"全縣",
  "新竹市":"全市",
  "嘉義市":"全市",
  "臺東縣":"全縣",
  "花蓮縣":"全縣",
  "宜蘭縣":"全縣",
  "澎湖縣":"全縣",
  "金門縣":"全縣",
  "連江縣":"全縣",
  "平地原住民":"全區",
  "山地原住民":"全區"
}