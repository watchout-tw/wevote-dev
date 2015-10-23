import position2color from './position2color';
import prefixr from 'react-prefixr';

export default function rectInCircleLayout(viewWidth, cubeSize, recordCount) {
  let outerMarginTop = 20;
  let outerMarginLeft = 40;

  // 算圈圈有多粗
  let borderWidth = Math.ceil(Math.sqrt(recordCount))*2*cubeSize/20;
  if(borderWidth < 2)
    borderWidth = 2;

  // 假設圈圈不會比view寬
  let numCol = Math.ceil(Math.sqrt(recordCount));
  let numRow = numCol;
  let rectWidth = numCol*cubeSize;
  let rectHeight = rectWidth;
  let radius = (rectWidth/2*Math.sqrt(2))*1.05 + borderWidth;
  let diameter = radius*2;

  let offsetLeft = (diameter - rectWidth)/2;
  let offsetTop = offsetLeft;

  // 確認circle沒有比view寬
  let toTranslate = '';
  let translateX;
  if(diameter + outerMarginLeft*2 > viewWidth) { // 比較的時候把左右margin也加進來比較對
    // 唉呀circle比view寬只好重算了哭哭
    // 先確定rect有沒有比view寬
    if(rectWidth > viewWidth) {
      // rect比view寬所以要重算circle大小
      rectWidth = Math.floor(viewWidth/cubeSize)*cubeSize;
      numCol = rectWidth/cubeSize;
      numRow = Math.ceil(recordCount/numCol);
      rectHeight = numRow*cubeSize;

      radius = Math.sqrt((rectWidth/2)*(rectWidth/2) + (rectHeight/2)*(rectHeight/2))*1.5
      diameter = radius*2;

      offsetLeft = (diameter - rectWidth)/2;
      offsetTop = (diameter - rectHeight)/2;
    }
    // 確定circle大小之後來算水平位移
    toTranslate = (diameter - viewWidth)/2 + outerMarginLeft;
    toTranslate = `translateX(-${toTranslate}px)`;
    translateX = toTranslate;//單純只有 x translate 的 px 值
  }

  return {
    width: diameter + borderWidth*2,
    height: diameter + borderWidth*2,
    borderWidth: borderWidth,
    translateX: translateX
  }
}
