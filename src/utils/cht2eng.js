
export default function cht_to_eng(cht){
    try{
    	switch(cht){
            case '中國國民黨':
                return 'KMT';
    		case '國民黨':
    			return 'KMT';
            case '民主進步黨':
                return 'DPP';
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
            case '時代力量':
                return 'NPP';
            case '綠黨社會民主黨聯盟':
                return 'GSD';
            case '新黨':
                return 'NP';
            case '軍公教聯盟黨':
                return 'MCFAP';
            case '樹黨':
                return 'TP';
            case '台灣獨立黨':
                return 'TIP';
            case '信心希望聯盟':
                return 'FHL';
            case '自由台灣黨':
                return 'FTP'
            case '和平鴿聯盟黨':
                return 'PPU';
            case '大愛憲改聯盟':
                return 'DASG';
            case '中華統一促進黨':
                return 'CHTY';
            case '健保免費連線':
                return 'NHSA';

            case '台灣工黨':
                return 'TLP';
            case '泛盟黨':
                return 'PEUP';
            case '人民民主陣線':
                return 'PDF';
            case '社會福利黨':
                return 'SWP';
            case '勞工黨':
                return 'LP';
            case '台灣第一民族黨':
                return 'TFNP';
            case '台灣未來黨':
                return 'TWP';
            case '正黨':
                return 'JP';
            case '中國生產黨':
                return 'CPP';
            case '中華民國機車黨':
                return 'MPR';

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
    	    case '核四停建':
    	    	return 'nuclearPower';
            case '課綱':
                return 'courseGuide';
            case '課綱程序透明':
                return 'courseGuide';
            case '司法改革':
                return 'justiceReform';
                
    		default: 
    			throw new Error("Oh-Oh-找不到這個詞的英文捏！<o> "+cht);
    
    	}
    }catch(e){
    	console.log(e);
    		
    }


}