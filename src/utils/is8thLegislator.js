import people_name2id from './people_name2id';

export default function is8thLegislator(name){
 	let id = people_name2id(name);
    if(id === "1" && name !== "丁守中"){
        return false;

    }else if(!id){
        return false;

    }else{
        return true;
    }
}
