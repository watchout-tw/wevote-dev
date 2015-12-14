export default function identity(legislators, candidates, id){
 	let identity = {
 		is8thProportional: false,
 		is9thCandidate: false
 	};
 	if(candidates[id]){
 		identity.is9thCandidate = true;
 	}
 	if(legislators[id]){
 		if(legislators[id].constituency1 === "Proportional"){
 			identity.is8thProportional = true;
 		}
 	}
 	
 	return identity;
}
