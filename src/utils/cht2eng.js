
export default function cht_to_eng(cht){
    try{
    	switch(cht){
    		case '國民黨':
    			return 'KMT';
    		case '民進黨':
    			return 'DPP';
    		case '台聯':
    			return 'TSU';
    		case '親民黨':
    			return 'PFP';
    		case '民國黨':
    			return 'MKT';
    		case '無黨團結聯盟':
    		 	return 'NSU';
    		case '無黨':
    			return 'NONE';
    		case '無黨籍':
    			return 'NONE';
    		case '贊成':
    	    	return 'aye';
    	    case '反對':
    	    	return 'nay';
    	    case '模糊':
    	    	return 'unknown';
    	    case '婚姻平權':
    	    	return 'marriageEquality';
    	    case '罷免':
    	    	return 'recall';
    	    case '公投':
    	    	return 'referendum';
    	    case '核能':
    	    	return 'nuclearPower';
    		default: 
    			throw new Error("Oh-Oh-找不到這個詞的英文捏！<o> "+cht);
    
    	}
    }catch(e){
    	console.log(e);
    		
    }


}