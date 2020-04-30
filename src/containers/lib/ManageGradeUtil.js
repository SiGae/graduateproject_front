export function sortStudentList(strList) {
  const sortArr = [[], [], [], [], [], [], [], [], [], [], []];

  for (let i in strList) {
    const sIdx = sortCondition(strList[i].grade);
    sortArr[sIdx].push(strList[i]);
  }

  let sortedArr = [];
  for (let i in sortArr) {
    if (sortArr[i].length > 0) {
      sortedArr = sortedArr.concat(sortArr[i]);
    }
  }

  return sortedArr;
}

function sortCondition(grade) {
  // eslint-disable-next-line eqeqeq
  if (grade == "A+") {
    return 0;
    // eslint-disable-next-line eqeqeq
  } else if (grade == "A") {
    return 1;
    // eslint-disable-next-line eqeqeq
  } else if (grade == "B+") {
    return 2;
    // eslint-disable-next-line eqeqeq
  } else if (grade == "B") {
    return 3;
    // eslint-disable-next-line eqeqeq
  } else if (grade == "C+") {
    return 4;
    // eslint-disable-next-line eqeqeq
  } else if (grade == "C") {
    return 5;
    // eslint-disable-next-line eqeqeq
  } else if (grade == "D+") {
    return 6;
    // eslint-disable-next-line eqeqeq
  } else if (grade == "D") {
    return 7;
    // eslint-disable-next-line eqeqeq
  } else if (grade == "F") {
    return 8;
    // eslint-disable-next-line eqeqeq
  } else if (grade == "E") {
    return 9;
  } else {
    console.log("sorting Error", grade);
  }
}

// 인원수 구하기 (반복횟수, 비율 인원수, 실제 나타낼 인원수)
export function setNumOfPerson(repeat, numOfPersonF, numOfPersonI) {
  let sliceArr = [];

  // 다시 등급 매길 학생의 수 만큼 반복 하되 소숫점 1째자리 제일 큼 기준으로 계산
  for (let i = 0; i < repeat; i++) {
    let maxNumChoice = parseInt(numOfPersonF[0].val * 10) % 10;
    let sliceIdx = 0;
    for (let j = 1; j < numOfPersonF.length; j++) {
      const tempVal = parseInt(numOfPersonF[j].val * 10) % 10;
      if (maxNumChoice < tempVal) {
        maxNumChoice = tempVal;
        sliceIdx = j;
      }
    }
    sliceArr = sliceArr.concat(numOfPersonF.splice(sliceIdx, 1));
  }

  for (let i in sliceArr) {
    numOfPersonI[sliceArr[i].index]++;
  }
}

export function checkGrade(index) {
  switch (Number(index)) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    default:
      return "E";
  }
}
