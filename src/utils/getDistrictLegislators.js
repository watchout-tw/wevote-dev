import moment from 'moment';

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
    //sort by 開始時間先後
    result.sort((a, b)=>{
        return format_date_to_unix_milliseconds(a.parties[0].startDate) - format_date_to_unix_milliseconds(b.parties[0].startDate);
    })
    
    return result;
   
}
function format_date_to_unix_milliseconds(date_string){
    let date = moment(date_string, "YYYY/MM/DD");
    let timestamp = date.unix();
    return timestamp;
}