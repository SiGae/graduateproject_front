import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_ratio, initialization as ratioInit } from "../modules/ratio";
import {
  get_studentList,
  grade_modify,
  change_input,
  initialization as gradeInit,
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
  const [fMode, setFMode] = useState(false);

  // A, B, C, D 비율 적용
  const onModifyRatio = useCallback(() => {
    const { studentList, gradeRatioArr, fNumber } = grade;
    const totalNumber = studentList.length - fNumber; // F를 제외한 총 학생 수

    console.log("총 인원 수(F제외) : ", totalNumber);
    let sum = 0;
    for (let i in gradeRatioArr) {
      sum += Number(gradeRatioArr[i]);
    }

    if (sum !== 100) {
      setIsHundred(false);
      // alert("비율 100을 맞춰 주십시오");
      return;
    }

    setIsHundred(true);
    // 비율 100 이라면 등급 당 인원수 계산
    const numOfPersonI = []; // 등급당 인원수 Integer
    const numOfPersonF = []; // 등급당 인원수 {index, val:float}
    let minNumOfPerson = 0; // 최소 사람의 수
    for (let i in gradeRatioArr) {
      let tempResult = totalNumber * (Number(gradeRatioArr[i]) / 100);
      numOfPersonF.push({
        index: i,
        val: tempResult,
      });
      numOfPersonI.push(parseInt(tempResult));
      minNumOfPerson += Math.floor(tempResult);
    }
    // 총 학생 수 - 최소 학생 수 = 다시 등급 매길 학생의 수
    const diff = totalNumber - minNumOfPerson;
    setNumOfPerson(diff, numOfPersonF, numOfPersonI);
    let stdIdx = 0;
    for (let i in numOfPersonI) {
      for (let j = 0; j < numOfPersonI[i]; j++) {
        // eslint-disable-next-line eqeqeq
        if (studentList[stdIdx].grade == "F") {
          j--;
        } else if (studentList[stdIdx].grade.length < 2) {
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

  // 초기화
  useEffect(() => {
    dispatch(ratioInit());
    dispatch(gradeInit());
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
    if (lecture === "" || grade.success[0] !== true) {
      return;
    }
    // 학점 순으로 정렬
    setStudents(sortStudentList(grade.studentList));
    onModifyRatio();
  }, [lecture, grade, onModifyRatio]);

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
        if (newGrade != "F") {
          dispatch(grade_modify({ id, value: "F" }));
        } else {
          dispatch(grade_modify({ id, value: "E", prevVal: newGrade }));
        }
        return;
      }

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
        itemClick={itemClick}
        switchForNot={switchForNot}
        studentList={students}
        gradeRatioArr={grade.gradeRatioArr}
        onChange={onChange}
        onSubmit={onSubmit}
        fMode={fMode}
        isHundred={isHundred}
      ></CompGrade>
    </div>
  );
};

export default withRouter(ManageGrade);
