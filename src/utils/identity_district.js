export default function identity(legislator, c1, c2){
 	if(!legislator){//undefined
 		return 'N';
 	}

    if(legislator.hasResigned === false){//現任，未離職
        let sameDistrict = (
        	(legislator.constituency1 === c1) 
        	&& 
        	((legislator.constituency2 === c2) || (legislator.constituency2 === "N/A"))
        );
        
        if(sameDistrict === true){
            return 'D';//current DISTRICT legislator
            
        }else{
        	return 'C';//current legislator 
        }
        
    }else{
    	return 'N';	
    }
       

}

