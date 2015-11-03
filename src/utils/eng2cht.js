export default function eng2cht(input){
  switch(input){
      case 'aye':
        return '贊成';
      case 'nay':
        return '反對';
      case 'unknown':
        return '模糊';
      case 'none':
        return '沒有';
      
      case 'KMT':
        return '中國國民黨';
      case 'DPP':
        return '民主進步黨';
      case 'PFP':
        return '親民黨';
      case 'TSU':
        return '台灣團結聯盟';

      case 'NSU':
        return '無黨團結聯盟';
      case 'MKT':
        return '民國黨';

      case 'NPP':
        return '時代力量';
      case 'GSD':    
        return '綠黨社會民主黨聯盟';
      case 'NP':
        return '新黨';
      case 'MCFAP':       
        return '軍公教聯盟黨';
      case 'TP':
        return '樹黨';
      case 'TIP':
        return '台灣獨立黨';
      case 'FHL': 
        return '信心希望聯盟';
      case 'MPR':
        return '中華民國機車黨';
      case 'FTP':
        return '自由台灣黨';

      case 'NONE':
        return '無黨籍';

      case 'marriageEquality': 
        return '婚姻平權';
      
      case 'marriage-equality': 
        return '婚姻平權';

      case 'recall':
        return '罷免';
      case 'referendum':
        return '公投';

      case 'nuclearPower':
        return '核能';
        
      case 'nuclear-power':
        return '核能';
      
      default:
      	return '<>找不到<>'+input;
    }
}


