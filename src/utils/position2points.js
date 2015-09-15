export default function position2points(input){
  switch(input){
      case 'aye': 
        return 3;
      case 'unknown':
        return 2;
      case 'nay':
        return 1;
      
      default:
      	return 0;
    }
}


