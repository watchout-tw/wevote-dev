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


