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
      case 'NSU':
        return '無黨團結聯盟';
      case 'MKT':
        return '民國黨';

      case 'NPP':
        return '時代力量';
      case 'GSD':    
        return '綠社盟';
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
        return '無黨籍'
      
      default:
      	throw "No party cht short found.";
    }
}


