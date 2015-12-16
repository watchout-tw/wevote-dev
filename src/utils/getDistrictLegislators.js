export default function getDistrictLegislators(legislators, area, areaNo){
    const NA = 'N/A';
    let result = [];
    
    Object.keys(legislators).map((id, index)=>{
        let inserted = false;
        let people = legislators[id];
        if(people.constituency1===area && people.constituency2 === areaNo){//只有一區的狀況，從 URL 來得，會是 1
        	result.push(people);
            inserted = true;
        }

        //因為從兩個不同地方來，判斷方式不同，避免重複加入，加上判斷 flag
        if(inserted === false && 
           people.constituency1===area && people.constituency2=== NA){//只有一區的狀況，從候選人選區來的，會是 N/A
                result.push(people);
        }
    })
    //console.log(result)
    return result;
   
}