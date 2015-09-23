export default function eng2party_short(input){
  switch(input){
      case 'KMT':
        return '國民黨';
      case 'DPP':
        return '民進黨';
      case 'PFP':
        return '親民黨';
      case 'TSU':
        return '台聯';

      case 'NONE':
      case 'NP': 
        return '無黨籍'
      
      default:
      	return input;
    }
}


