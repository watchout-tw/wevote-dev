import records from "./records.js";
import issues from "./issues.js";

import legislators from "./legislators.js";
import candidates from "./candidates.js";
import people from "./people.js";

import parties from "./parties.js";
import partyBlock from "./partyBlock";
import partyPromises from "./partyPromises";

import dataMeta from "./dataMeta";
import FAQ from "./FAQ.js";

import districtData from "./districtData";

export default function get(){
    const webDistrictData = districtData();
	const mobileDistrictData = parseMobileDistrict(webDistrictData);
    return {
    	records: records(),
    	issues: issues(),

    	legislators: legislators(),
    	candidates: candidates(),
    	people: people(),

    	parties: parties(),
    	partyBlock: partyBlock(),
    	partyPromises: partyPromises(),

        dataMeta: dataMeta(),
        FAQ: FAQ(),

        webDistrictData: webDistrictData,
        mobileDistrictData: mobileDistrictData
    };
}
function parseMobileDistrict(db){
    let Result = {
        district: [],
        eleDistrict: {}
    };
    Object.keys(db).map((cityId, index)=>{
        let city = db[cityId];


        //一階選單
        Result.district.push(city.name);
        let subs = [];

        city.districts.map((item, i)=>{
            let areaText = "";
            item.subdistricts.map((k,j)=>{
                if(j>0){
                    areaText+="、";
                }
                if(k.indexOf(":")===-1){
                    areaText+=k;
                }else{
                    areaText+=k.split(":")[0];
                }
            })
            
            //二階選單
            subs.push(areaText);
        })
        Result.eleDistrict[city.name] = subs;

    })
    //console.log(Result)
    return Result;

}