export default function eng2url(input){
  switch(input){
      case 'marriageEquality': 
        return 'marriage-equality';
      case 'recall':
        return 'recall';
      case 'referendum': 
      	return 'referendum';
       case 'nuclearPower': 
        return 'nuclear-power';
      
      default:
      	throw '找不到:eng2url';
    }
}


