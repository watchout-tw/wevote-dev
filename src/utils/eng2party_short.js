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
      case 'PPU':
        return '和平鴿';
      case 'FHL': 
        return '信望盟';
      case 'FTP':
        return '自台黨';

      case 'DASG':
        return '大愛憲改';
      case 'CHTY':
        return '統促黨';
      case 'NHSA':
        return '健保免費';

      case 'TLP':
        return '台灣工黨';
      case 'PEUP':
        return '泛盟黨';
      case 'PDF':
        return '人民民主陣線';
      case 'SWP':
        return '社會福利黨';
      case 'LP':
        return '勞工黨';
      case 'TFNP':
        return '台灣第一民族黨';
      case 'TWP':
        return '台灣未來黨';
      case 'JP':
        return '正黨';
      case 'CPP':
        return '中國生產黨';
      case 'MPR':
        return '中華民國機車黨';
  
      case 'NONE':
        return '無黨籍'
      
      default:
      	return "No party cht short found."+input;
    }
}


