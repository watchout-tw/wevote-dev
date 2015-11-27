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
        return '無盟';
      case 'MKT':
        return '民國黨';
      case 'PPU':
        return '和平鴿';

      case 'NPP':
        return '時力';
      case 'GSD':    
        return '綠社盟';
      case 'NP':
        return '新黨';
      case 'MCFAP':       
        return '軍公教';
      case 'TP':
        return '樹黨';
      case 'TIP':
        return '台獨黨';
      case 'FHL': 
        return '信希盟';
      case 'MPR':
        return '機車黨';
      case 'FTP':
        return '自台黨';

      case 'NONE':
        return '無黨籍'
      
      default:
      	return "No party cht short found."+input;
    }
}


