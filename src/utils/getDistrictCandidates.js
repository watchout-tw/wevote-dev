export default function getDistrictCandidates(candidates, area, areaNo){
    let result = [];
    Object.keys(candidates).map((id, index)=>{
        let people = candidates[id];
        if(people.districtArea===area && people.districtNo === areaNo){
        	people.id = id;
            result.push(people);
        }
    })
    console.log(result)
    return result;
   
}