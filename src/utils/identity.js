export default function identity(legislators, candidates, id){
 	let identity = {
 		is8thDistrict: false,
 		is8thProportional: false,
 		is9thCandidate: false,
 		is9thProportional: false
 	};
 	if(candidates[id]){
 		identity.is9thCandidate = true;
 	}
 	if(legislators[id]){
 		if(legislators[id].constituency1 === "Proportional"){
 			identity.is8thProportional = true;
 		}else{
 			identity.is8thDistrict = true;
 		}
 		
 		let name = legislators[id].name;
 		if(LIST.indexOf(name)!==-1){
 			identity.is9thProportional = true;
 		}
 	}

 	
 	return identity;
}
//第八屆立委，第九屆不分區
const LIST = [
"段宜康",
"鄭麗君",
"陳其邁",
"尤美女",
"李應元",
"王金平",
"黃昭順",
"王育敏",
"李貴敏",
"李鴻鈞",
"陳怡潔",
"賴振昌",
"周倪安"
]
