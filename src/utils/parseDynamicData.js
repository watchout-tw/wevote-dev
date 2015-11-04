export default function parseDynamicData(rawData){
	let remoteData = {};
    
	rawData.map((value,index)=>{
          let name = value['姓名'];

          remoteData[name] = {   
              name: name,
              marriageEquality: {
                position: value['婚姻平權-立場'],
                statement: value['婚姻平權-補充意見']
              },
              recall: {
                position: value['罷免-立場'],
                statement: value['罷免-補充意見']
              },
              referendum: {
                position: value['公投-立場'],
                statement: value['公投-補充意見']
              },
              newclearPower: {
                position: value['核能-立場'],
                statement: value['核能-補充意見']
              },
              goals: [
                {
                  goal: value['法案1-目標'],
                  content: value['法案1-內容']
                },
                {
                  goal: value['法案2-目標'],
                  content: value['法案2-內容']
                },
                {
                  goal: value['法案3-目標'],
                  content: value['法案3-內容']
                }
              ] 
          }
      });
	  return remoteData;



}