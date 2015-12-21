import district2cht from './district2cht';

export default function peopleInfo(name, age, a1, a2, isC, c1, c2) {
  const NATIONAL = 'Proportional';
  const NA = 'N/A';

  //console.log(`'${name}', '${age}', '${a1}', '${a2}', '${isC}', '${c1}', '${c2}'`);
  //console.log(name, age, a1, a2, isC, c1, c2);

  a2 = (a1 === NATIONAL || a2 === NA) ? '' : `第${a2}選區`;
  c2 = (c1 === NATIONAL || c2 === NA) ? '' : `第${c2}選區`;

  let isCaucus = (name.indexOf('黨團') !== -1);
  let ageText;
  if(age){
      ageText = (isCaucus ? '' : `${age}歲`);
  }
  let legislatorTitle, legislatorDistrict;
  if(a1){
      legislatorTitle = (isCaucus ? '第八屆黨團' : `第八屆${district2cht(a1)}${a2}立委`);
      legislatorDistrict = (isCaucus || a1 === 'Proportional') ? '' : `${district2cht(a1)}${a2}`;

      //處理縣市升格的問題，第八屆是「桃園縣」，第九屆是「桃園市」
      if(legislatorTitle.indexOf("桃園市")!==-1){
         legislatorTitle = legislatorTitle.replace("桃園市", "桃園縣");
      }
      if(legislatorDistrict.indexOf("桃園市")!==-1){
         legislatorDistrict = legislatorDistrict.replace("桃園市", "桃園縣");
      }

  }
  let candidateTitle = (isC ? (isCaucus ? '' : `${district2cht(c1)}${c2}`) : '');

  return {
    isCaucus: isCaucus,
    ageText: ageText,
    legislatorTitle: legislatorTitle,
    legislatorDistrict: legislatorDistrict,
    candidateTitle: candidateTitle,
  }
}
