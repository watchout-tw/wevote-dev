import eng2cht from './eng2cht';
export default function promise_eng2cht(value){
  if(value === "none"){
    return "尚未回覆";
  }else if(value === "refuse"){
    return "不表態";
  }else{
    return eng2cht(value);
  }
}