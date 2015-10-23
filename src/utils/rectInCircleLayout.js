import position2color from './position2color';
import prefixr from 'react-prefixr';

export default function rectInCircleLayout(viewWidth, cubeSize, recordCount, position, hasPositionPercentage, positionPercentages) {
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

  let offsetLeft = (radius + borderWidth)/2;
  let offsetTop = offsetLeft;

  // 確認circle沒有比view寬
  let toTranslate = '';
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
  }

  /////////////////////////////
  //*----- 計算 arc ---------*/
  ////////////////////////////

  // 總共的，給灰色用
  let degree = (hasPositionPercentage/100*360);
  let colorLevel = Math.ceil( degree/90);

  // 個別顏色的
  let colorCircleBorder = [];

  // 一個 arc 90 度，有幾個 arc 要是彩色，預設是 1 ，每多 90 度要多一個 arc
  // 計算每個立場有幾個彩度
  // 計算 rotate 度數 = 45 + 之前總和 (不包括自己)

  let colorRotateStyle = [];
  let sum = 0;

  // 其他兩個畫面並不需要算不同顏色的 arcs
  if(!positionPercentages)
     positionPercentages = [];

  positionPercentages.map((value,index)=>{

     let d = (value.percentage/100 * hasPositionPercentage/100 * 360);
     let c = Math.ceil( d/90);
     value.colorLevel = c;

     colorRotateStyle.push(45+sum);

     sum+=d;
  })

  positionPercentages.map((value,index)=>{
      //第一個顏色圈，負責補底色
      let borderColor = ["gray","gray","gray","gray"];
      if(index > 0){
        borderColor = ["transparent","transparent","transparent","transparent"];
      }

      for(let i = 0; i<4; i++){
          if(i<value.colorLevel){
             borderColor[i] = position2color(value.position);
          }
      }
      colorCircleBorder.push(borderColor);
  })


  //gray circle
  let grayCircleBorder = ["transparent","transparent","transparent","transparent"];
  let grayRotateDegree = 45+degree%90;

  for(let i = 0; i<4; i++){
      if(i+1 === colorLevel){
          if(degree%90 !==0){
              grayCircleBorder[i] = "gray";
          }else{
              grayCircleBorder[i+1] = "gray";
          }

      }
  }

  //第四個 arc 換色
  if((colorLevel === 4)&&(degree!==360)){
    //第三個彩色圈的第四個 arc 要換色
    colorCircleBorder[2][3] = "transparent";
    grayCircleBorder[3] = position2color(position);

    //rorate 要改，最後的 90 依照比例倒退嚕
    grayRotateDegree = 45-( (90-(degree-270))/90 *45);
  }


  // 以下是要給出去的 inline style
  let colorCircleBorderStyle = [];

  colorCircleBorder.map((key,index)=>{
      colorCircleBorderStyle.push(`${colorCircleBorder[index][0]} ${colorCircleBorder[index][1]} ${colorCircleBorder[index][2]} ${colorCircleBorder[index][3]}`)
  })


  let grayCircleBorderStyle = `${grayCircleBorder[0]} ${grayCircleBorder[1]} ${grayCircleBorder[2]} ${grayCircleBorder[3]}`;

  // 算inline styles
  let marginStyles = {
    margin: `${outerMarginTop}px ${outerMarginLeft}px`,
  }
  // 這是一般用
  let circleStyles = prefixr({
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'relative',
    width: diameter,
    height: diameter,
    margin: `${borderWidth}px 0`,
    boxShadow: `0 0 0 ${borderWidth}px ${position2color(position)}`,
    borderRadius: '50%',
    transform: toTranslate
  })


  // 以下 circle 是為了 arc
  let baseCircleStyles = prefixr({
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'relative',
    width: diameter,
    height: diameter,
    margin: `${borderWidth}px 0`,
    borderRadius: '50%',
    transform: toTranslate,
  })
  let colorCircleStylesA = prefixr({
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'absolute',
    top: `-${borderWidth}px`,
    left: `-${borderWidth}px`,
    width: diameter + borderWidth*2,
    height: diameter + borderWidth*2,
    border: `${borderWidth}px solid`,
    borderColor: colorCircleBorderStyle[0],
    borderRadius: '50%',
    transform: `rotate(${colorRotateStyle[0]}deg)`
  })
  let colorCircleStylesB = prefixr({
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'absolute',
    top: `-${borderWidth}px`,
    left: `-${borderWidth}px`,
    width: diameter + borderWidth*2,
    height: diameter + borderWidth*2,
    border: `${borderWidth}px solid`,
    borderColor: colorCircleBorderStyle[1],
    borderRadius: '50%',
    transform: `rotate(${colorRotateStyle[1]}deg)`
  })
  let colorCircleStylesC = prefixr({
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'absolute',
    top: `-${borderWidth}px`,
    left: `-${borderWidth}px`,
    width: diameter + borderWidth*2,
    height: diameter + borderWidth*2,
    border: `${borderWidth}px solid`,
    borderColor: colorCircleBorderStyle[2],
    borderRadius: '50%',
    transform: `rotate(${colorRotateStyle[2]}deg)`
  })
  let grayCircleStyles = prefixr({
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
  })
  // let rectStyles = prefixr({
  //   position: 'absolute',
  //   top: `${offsetTop}px`,
  //   left: `${offsetLeft}px`,
  //   width: rectWidth,
  //   height: rectHeight,
  // })
  let wrapStyles = prefixr({
    position: 'relative',
    width: diameter + borderWidth*2,
    height: diameter + borderWidth*2,
  })
  let rectStyles = prefixr({
    position: 'absolute',
    top: `${offsetTop}px`,
    left: `${offsetLeft}px`,
    width: rectWidth,
    height: rectHeight,
  })


  // 如果是百分百表態，要先畫最多數，再用少數蓋
  // 並且如果全部是灰的，把顏色改成 transparent
  let finalA = colorCircleStylesA;
  let finalB = colorCircleStylesB;
  let finalC = colorCircleStylesC;
  if(hasPositionPercentage === 100){
    finalA = colorCircleStylesC; //最多數

    finalB = colorCircleStylesB; //次多數，可能沒有
    if( colorCircleStylesB.borderColor === "gray gray gray gray")
        finalB.borderColor = "transparent";

    finalC = colorCircleStylesA; //第三多數，可能沒有
    if( colorCircleStylesA.borderColor === "gray gray gray gray")
        finalC.borderColor = "transparent";
  }

  return {
    margin: marginStyles,
    circle: circleStyles,
    baseCircle: baseCircleStyles,
    colorCircleA: finalA,
    colorCircleB: finalB,
    colorCircleC: finalC,
    grayCircle: grayCircleStyles,
    wrap: wrapStyles,
    rect: rectStyles
  }
}
