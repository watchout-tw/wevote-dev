export default function position2color(position_eng){
  switch(position_eng){
      case 'KMT':
        return '#000095';
      
      case 'DPP':
        return '#009A00';
      
      case 'PFP':
        return '#FE6407';
      
      case 'TSU':
      	return '#A25B09';

      case 'NSU':
        return 'rgba(194,15,81,0.9)';

      case 'NONE':
        return 'gray';
      case 'NP':
        return 'gray';

      default:
        return 'black';
 }
  
}

