import position2color from './position2color';
import prefixr from 'react-prefixr';
const appBarBreakLarge = 750;

function getBorderAndDiameter(cubeSize, recordCount){
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

  return {
    borderWidth: borderWidth,
    diameter: diameter, 
    width: Math.ceil(diameter + borderWidth*2),
    height: Math.ceil(diameter + borderWidth*2),
    offsetLeft: offsetLeft,
    offsetTop: offsetTop
  }
}
export default function rectInCircleLayout(viewWidth, cubeSize, recordCount, maxCount) {
  let outerMarginTop = 20;
  let outerMarginLeft = 40;

  let maxLayout = getBorderAndDiameter(cubeSize, maxCount);
  let currentLayout = getBorderAndDiameter(cubeSize, recordCount);
  let { width, height, borderWidth, offsetLeft, offsetTop } = currentLayout;
  

  //手機版本
  if(( maxLayout.width > viewWidth ) && ( viewWidth < appBarBreakLarge )){
    const ratio = viewWidth / maxLayout.width;
    width *= ratio;
    height *= ratio;
    borderWidth = (width/2) * 0.4;
  
  }
  if(( maxLayout.width < viewWidth ) && ( viewWidth < appBarBreakLarge )){
    borderWidth = Math.ceil(Math.sqrt(recordCount))*2*cubeSize/5;
    if(borderWidth < 2)
      borderWidth = 2;
  }
  
  return {
    width: width,
    height: height,
    borderWidth: borderWidth
  }
}
