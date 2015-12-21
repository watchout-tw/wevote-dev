export default function getDistrictCandidates(candidates, area, areaNo){
    const NA = 'N/A';
    let result = [];
   
    Object.keys(candidates).map((id, index)=>{
        let inserted = false;
        let people = candidates[id];
        if(people.districtArea===area && people.districtNo === areaNo){//只有一區的狀況，從 URL 來得，會是 1
        	result.push(people);
            inserted = true;
        }

        //因為從兩個不同地方來，判斷方式不同，避免重複加入，加上判斷 flag
        if(inserted === false && 
           people.districtArea===area && people.districtNo === NA){//只有一區的狀況，從候選人選區來的，會是 N/A
                result.push(people);
        }
    })
    //console.log(result)
    return result;
   
}