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

      case 'transparent':
        return '公開透明';
      case 'blackbox':
        return '黑箱';
      
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
      case 'FTP':
        return '自由台灣黨';
      case 'PPU':
        return '和平鴿聯盟黨';

      case 'DASG':
        return '大愛憲改聯盟';
      case 'CHTY':
        return '中華統一促進黨';
      case 'NHSA':
        return '健保免費連線';

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
        return '核四停建';
        
      case 'nuclear-power':
        return '核四停建';

      case 'courseGuide':
          return '課綱程序透明';

      case 'course-guide':
          return '課綱程序透明';

      case 'justiceReform':
          return '司法改革';

      case 'justice-reform':
          return '司法改革';
      
      default:
      	return ':undefined-eng-term:'+input;
    }
}


