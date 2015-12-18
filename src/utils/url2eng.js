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
      
      case 'course-guide':
          return 'courseGuide';
      case 'justice-reform':
          return 'justiceReform';
          
      default:
      	return '<>找不到<>';///////
    }
}


