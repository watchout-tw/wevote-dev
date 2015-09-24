export default function url2eng(input){
  switch(input){
      case 'marriage-equality': 
        return 'marriageEquality';
      case 'recall':
        return 'recall';
      case 'referendum':
        return 'referendum';
      case 'nuclear-power':
        return 'nuclearPower';
      
      default:
      	return '<>找不到<>';///////
    }
}


