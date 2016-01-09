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

import CEC from "./CEC.js";//中選會政見

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
        mobileDistrictData: mobileDistrictData,

        CEC: CEC()
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
        let name = city.name.replace('台','臺');
        Result.district.push(name);
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
        Result.eleDistrict[cityId] = subs;//改成用 id 做 sub-district 的 key，中文會有臺台問題

    })
    //console.log(Result)
    return Result;

}