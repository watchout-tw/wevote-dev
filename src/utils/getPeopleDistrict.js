export default function getPeopleDistrict(legislators, candidates, id){
    let DistrictData = {};
    
    //是現任候選人
    if(candidates[id]){
        DistrictData = {
            area: candidates[id].districtArea,
            areaNo: candidates[id].districtNo     
        }

    }else{
        //如果不是，選擇該立委選區的參選人
        if(legislators[id]){
            DistrictData = {
                area: legislators[id].constituency1,
                areaNo: legislators[id].constituency2
            }

        }else{
            //代表是黨團
        }
    }
    console.log("getPeopleDistrict")
    console.log(DistrictData)
   
    return DistrictData;
    
}
