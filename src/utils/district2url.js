import district2cht from './district2cht';
export default function district2url(area, no){
	if(no){
		if(no === 'N/A'){
    	    no = '1';
    	}
    	return `${area}/${no}`;

	}else{//只給縣市，判斷該縣市是否只有一區
		let areaCht = district2cht(area);
		
		if(singleArea[areaCht]){
			return `${area}/1`;
		}else{
			return `${area}`;
		}
		
	}
    
}
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