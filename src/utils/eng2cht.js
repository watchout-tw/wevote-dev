export default function eng2cht(input){
  switch(input){
      case 'aye':
        return '贊成';
      case 'nay':
        return '反對';
      case 'unknown':
        return '模糊';
      
      case 'KMT':
        return '中國國民黨';
      case 'DPP':
        return '民主進步黨';
      case 'PFP':
        return '親民黨';
      case 'TSU':
        return '台灣團結聯盟';
      
      default:
      	return '<>找不到<>';///////
    }
}


