export default function getDistrictCandidates(candidates, area, areaNo){
    let result = [];
    Object.keys(candidates).map((id, index)=>{
        let people = candidates[id];
        if(people.districtArea===area && people.districtNo === areaNo){
        	result.push(people);
        }
        if(people.districtArea===area && !people.districtNo){//只有一區的狀況
            result.push(people);
        }
    })
    //console.log(result)
    return result;
   
}