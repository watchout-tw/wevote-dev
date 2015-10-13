import position2color from './position2color';


export default function rectInCircleLayout(viewWidth, cubeSize, recordCount, position, hasPositionPercentage) {
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
  let radius = (rectWidth/2*Math.sqrt(2))*1.25 + borderWidth;
  let diameter = radius*2;

  let offsetLeft = (diameter - rectWidth)/2;
  let offsetTop = offsetLeft;

  // 確認circle沒有比view寬
  let toTranslate = '';
  if(diameter > viewWidth) {
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
  }

  // 計算 arc
  
  let degree = (hasPositionPercentage/100*360);
  let colorLevel = Math.ceil( degree/90);
  // 一個 arc 90 度，有幾個 arc 要是彩色，預設是 1 ，每多 90 度要多一個 arc

  let colorCircleBorder = ["gray","gray","gray","gray"];
  let grayCircleBorder = ["transparent","transparent","transparent","transparent"];
  
  for(let i = 0; i<4; i++){
      if(i<colorLevel){
          colorCircleBorder[i] = position2color(position);
      }
      if((i+1 === colorLevel)&&((hasPositionPercentage/100*360)%90 !== 0 )){

          grayCircleBorder[i] = "gray";
      }
  }
  
  let grayRotateDegree = 45+hasPositionPercentage;
  
  if((colorLevel === 4)&&(degree!==360)){
    //gray 的第四個 arc 要換色
    colorCircleBorder[3] = "gray";
    grayCircleBorder[3] = position2color(position);
    //rorate 要改，最後的 90 依照比例倒退嚕
    grayRotateDegree = 45-( (90-(degree-270))/90 *45);
   
  }

  let colorCircleBorderStyle = `${colorCircleBorder[0]} ${colorCircleBorder[1]} ${colorCircleBorder[2]} ${colorCircleBorder[3]}`;
  let grayCircleBorderStyle = `${grayCircleBorder[0]} ${grayCircleBorder[1]} ${grayCircleBorder[2]} ${grayCircleBorder[3]}`;
  

  // 算inline styles
  let marginStyles = {
    margin: `${outerMarginTop}px ${outerMarginLeft}px`,
  }
  let circleStyles = {
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'relative',
    width: diameter,
    height: diameter,
    margin: `${borderWidth}px 0`,
    boxShadow: `0 0 0 ${borderWidth}px ${position2color(position)}`,
    borderRadius: '50%',
    transform: toTranslate,
  }

  // 以下三組 circle 是為了 arc
  let baseCircleStyles = {
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'relative',
    width: diameter,
    height: diameter,
    margin: `${borderWidth}px 0`,
    borderRadius: '50%',
    transform: toTranslate,
  }
  let colorCircleStyles = {
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'absolute',
    top: `-${borderWidth}px`,
    left: `-${borderWidth}px`,
    width: diameter + borderWidth*2,
    height: diameter + borderWidth*2,
    border: `${borderWidth}px solid`,
    borderColor: colorCircleBorderStyle,
    borderRadius: '50%',
    transform: 'rotate(45deg)'
  }
  let grayCircleStyles = {
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'absolute',
    top: `-${borderWidth}px`,
    left: `-${borderWidth}px`,
    width: diameter + borderWidth*2,
    height: diameter + borderWidth*2,
    border: `${borderWidth}px solid`,
    borderColor: grayCircleBorderStyle,
    borderRadius: '50%',
    transform: `rotate(${grayRotateDegree}deg)`
  }
  let rectStyles = {
    position: 'absolute',
    top: `${offsetTop}px`,
    left: `${offsetLeft}px`,
    width: rectWidth,
    height: rectHeight,
  }
  //// TODO ARC

  return {
    margin: marginStyles,
    circle: circleStyles,
    baseCircle: baseCircleStyles,
    colorCircle: colorCircleStyles,
    grayCircle: grayCircleStyles,
    rect: rectStyles
  }
}
