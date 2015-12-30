export default function circleNumber(value){
  if(!value){
  	return "";
  }

  value = Number(value);
  const d = ['','①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⑪','⑫','⑬','⑭','⑮','⑯','⑰','⑱'];
  return d[value];
}
