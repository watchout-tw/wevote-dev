export default function eng2url(input){
  switch(input){
      case 'marriageEquality': 
        return 'marriage-equality';
      case 'recall':
        return 'recall';
      case 'referendum': 
      	return 'referendum';
      
      default:
      	return '<>找不到<>';///////
    }
}


