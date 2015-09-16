export default function cht2url(input){
  	switch(input){
     	 case '婚姻平權': 
        	return 'marriage-equality';
     	 case '罷免':
        	return 'recall';
      
      	default:
      		return '<>找不到<>';
    }
}
