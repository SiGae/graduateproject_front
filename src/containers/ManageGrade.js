import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  initialization,
  change_input,
  grade_modify,
  student_replace,
  get_studentList,
  send_studentList,
} from "../modules/grade";
import CompGrade from "../components/manage/CompGrade";
import { onlyForNumber } from "../lib/utils/util";
import {
  sortStudentList,
  setNumOfPerson,
  checkGrade,
} from "./lib/ManageGradeUtil";

const ManageGrade = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user }));
  const { grade } = useSelector(({ grade }) => ({ grade }));
  const [lecture, setLecture] = useState("");
  const [students, setStudents] = useState([]);
  const [isHundred, setIsHundred] = useState(false);

  // Data appearing decision
  const [fMode, setFMode] = useState(false);
  const [dialVisible, setDialVisible] = useState(false);

  // A, B, C, D 비율 적용
  const onModifyRatio = useCallback(() => {
    const { studentList, gradeRatioArr, fNumber } = grade;
    const totalNumber = studentList.length - fNumber; // F를 제외한 총 학생 수

    //console.log("총 인원 수(F제외) : ", totalNumber);
    let sum = 0;
    for (let i in gradeRatioArr) {
      sum += Number(gradeRatioArr[i]);
    }

    if (sum !== 100) {
      setIsHundred(false); // set variable
      // alert("비율 100을 맞춰 주십시오");
      return;
    }

    setIsHundred(true); // set variable
    // 비율 100 이라면 등급 당 인원수 계산
    const numOfPersonI = []; // 등급당 인원수 Integer
    const numOfPersonF = []; // 등급당 인원수 {index, val:float}
    let minNumOfPerson = 0; // 최소 사람의 수
    for (let i in gradeRatioArr) {
      // 해당 등급 인원수 = F제외 총 인원수 * (입력 등급 비율 / 100)
      let tempResult = totalNumber * (Number(gradeRatioArr[i]) / 100);
      numOfPersonF.push({
        index: i,
        val: tempResult,
      });
      numOfPersonI.push(parseInt(tempResult));
      minNumOfPerson += Math.floor(tempResult);
    }

    /**
     * 다시 등급 매길 학생의 수 = 총 학생 수 - 최소 학생 수
     * ex) 
       A등급, B등급, C등급, D등급 인원수가 소수점일 때
       그 소수점 첫 번째 자리 중에서 최고 높은 소수점에다 인원을 추가하겠다는 의미
       setNumOfPerson = numOfPersonI에 소수점 가장 높은 등급에 인원수를 높여줌.
     *
     */
    const diff = totalNumber - minNumOfPerson; // 총 인원 - 현재 등급 매겨진 인원
    setNumOfPerson(diff, numOfPersonF, numOfPersonI);
    let stdIdx = 0;
    for (let i in numOfPersonI) {
      // F 제외하고 정렬, +등급 붙지 않은 학생 기준으로 등급 다시 매김.
      for (let j = 0; j < numOfPersonI[i]; j++) {
        // eslint-disable-next-line eqeqeq
        if (studentList[stdIdx].grade == "F") {
          j--;
        } else if (studentList[stdIdx].grade.length < 2) {
          // +등급이 붙이 않은 학생을 대상으로 재 정렬
          dispatch(
            grade_modify({ id: studentList[stdIdx].id, value: checkGrade(i) })
          );
        } else {
          // ELSE
        }
        if (stdIdx + 1 < studentList.length) {
          stdIdx++;
        }
      }
    }
  }, [grade, dispatch]);

  // dialogue
  const onPopupStat = useCallback((visible) => {
    setDialVisible(visible);
  }, []);

  // 드래그 마지막
  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;
      if (!result.destination) {
        return;
      }

      if (result.type === "STUDENTS") {
        // 최종 성적이 같지 않은 경우
        if (
          students[source.index].score !== students[destination.index].score
        ) {
          return;
        } else {
          // 최종 성적이 같은 경우
          dispatch(
            student_replace({
              sourceId: students[source.index].id,
              destinationId: students[destination.index].id,
            })
          );
        }
      }
    },
    [students, dispatch]
  );

  // 초기화
  useEffect(() => {
    dispatch(initialization());
  }, [dispatch]);

  // Login 확인
  useEffect(() => {
    if (user.userOnline !== "TRUE") {
      history.push("/");
    } else {
      // 강의 정보들을 불러온다.
      const localLecture = JSON.parse(localStorage.getItem("lecture"));
      setLecture(localLecture);
      // 학생들의 정보를 불러온다.
      dispatch(get_studentList(localLecture));
    }
  }, [dispatch, history, user.userOnline]);

  // Phase 2
  useEffect(() => {
    // 존재 : 강의, 비율, 학생 리스트
    if (
      lecture === "" ||
      grade.success[0] == null ||
      // eslint-disable-next-line eqeqeq
      grade.success[0] == undefined
    ) {
      return;
    }

    // eslint-disable-next-line eqeqeq
    if (grade.success[0] == false) {
      alert(
        "1.출석부 2.학생관리 (만점점수 입력 필수)순서로 진행하시길 바랍니다."
      );
      history.push("/main/menu");
    }
    // 학점 순으로 정렬
    setStudents(sortStudentList(grade.studentList));
    onModifyRatio();
  }, [lecture, grade, onModifyRatio, history]);

  // Phase 3
  useEffect(() => {
    if (lecture === "" || grade.success[0] !== true) {
      return;
    }

    if (grade.success[1]) {
      history.push("/main/menu");
    }
  }, [lecture, grade.success, history]);

  // Grade change
  const itemClick = useCallback(
    (id, newGrade) => {
      // eslint-disable-next-line eqeqeq
      if (fMode) {
        // eslint-disable-next-line eqeqeq
        if (newGrade != "F") {
          dispatch(grade_modify({ id, value: "F" }));
        } else {
          dispatch(grade_modify({ id, value: "E", prevVal: newGrade }));
        }
        return;
      }

      // eslint-disable-next-line eqeqeq
      if (!fMode && newGrade != "F" && newGrade != "E") {
        // 학점이 +가 붙은 것들은 길이가 2이다.
        if (newGrade.length === 2) {
          newGrade = newGrade.replace("+", "");
        } else if (newGrade.length === 1) {
          newGrade += "+";
        } else {
          alert("Error");
        }
        dispatch(grade_modify({ id, value: newGrade }));
      }
    },
    [dispatch, fMode]
  );

  // F 선택 모드
  const switchForNot = useCallback(() => {
    setFMode(!fMode);
  }, [fMode]);

  // A, B, C, D 비율 설정
  const onChange = useCallback(
    (e) => {
      // name = index, value = contents
      const { name, value } = e.target;

      if (value.length > 3 || onlyForNumber(value)) {
        return;
      }

      // A(name 0)이면 value 30 까지
      // B(name 1)이면 value 35 까지
      // C(name 2)이면 C + D 35
      // D(name 3)이면 C + D 35
      const limitCD =
        100 - (Number(grade.gradeRatioArr[0]) + Number(grade.gradeRatioArr[1]));
      const val = Number(value);
      switch (Number(name)) {
        case 0:
          if (val > 30) {
            return;
          }
          break;
        case 1:
          if (val > 35) {
            return;
          }
          break;
        case 2:
          if (val + Number(grade.gradeRatioArr[3]) > limitCD) {
            return;
          }
          break;
        case 3:
          if (val + Number(grade.gradeRatioArr[2]) > limitCD) {
            return;
          }
          break;
        default:
          alert("Error : " + name);
      }

      dispatch(change_input({ name, value }));
    },
    [dispatch, grade.gradeRatioArr]
  );

  const onSubmit = useCallback(() => {
    // 비율 합계 100인지 체크
    if (!isHundred) {
      alert("비율 100이 되는지 확인하십시오.");
      return;
    }
    dispatch(
      send_studentList({
        subId: lecture.subId,
        studentList: grade.studentList,
        gradeRatioArr: grade.gradeRatioArr,
      })
    );
  }, [dispatch, grade.studentList, isHundred, lecture, grade.gradeRatioArr]);

  return (
    <div>
      <CompGrade
        // Data...
        studentList={students}
        gradeRatioArr={grade.gradeRatioArr}
        subId={lecture.subId}
        dialVisible={dialVisible}
        // function
        onChange={onChange}
        onPopupStat={onPopupStat}
        onSubmit={onSubmit}
        onDragEnd={onDragEnd}
        // status function
        fMode={fMode}
        isHundred={isHundred}
        switchForNot={switchForNot}
        itemClick={itemClick}
      ></CompGrade>
    </div>
  );
};

export default withRouter(ManageGrade);
