export default function cht2url(input){
  	switch(input){
     	case '婚姻平權': 
        	return 'marriage-equality';
     	case '罷免':
        	return 'recall';
      case '公投':
        	return 'referendum';
      case '核四停建':
          return 'nuclear-power';
      case '課綱程序透明':
          return 'course-guide';
      case '司法改革':
          return 'justice-reform';
      default:
      		return '<>找不到<>';
    }
}
