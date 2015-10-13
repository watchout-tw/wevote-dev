export default function peopleInfo(name, age, a1, a2, isC, c1, c2) {
  const NATIONAL = '全國不分區';
  const NA = 'N/A';

  //console.log(`'${name}', '${age}', '${a1}', '${a2}', '${isC}', '${c1}', '${c2}'`);
  //console.log(name, age, a1, a2, isC, c1, c2);

  a2 = (a1 === NATIONAL || a2 === NA) ? '' : `第${a2}選區`;
  c2 = (c1 === NATIONAL || c2 === NA) ? '' : `第${c2}選區`;

  let isCaucus = (name.indexOf('黨團') !== -1);
  let ageText = (isCaucus ? '' : `${age}歲`);
  let legislatorTitle = (isCaucus ? '第八屆黨團' : `第八屆${a1}${a2}立委`);
  let candidateTitle = (isC === true ? (isCaucus ? '' : `2016第九屆${c1}${c2}立委候選人`) : '');

  return {
    isCaucus: isCaucus,
    ageText: ageText,
    legislatorTitle: legislatorTitle,
    candidateTitle: candidateTitle,
  }
}
