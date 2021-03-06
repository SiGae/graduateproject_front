import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_ratio, initialization as ratioInit } from "../modules/ratio";
import {
  initialization as transcriptInit,
  get_transcript,
  get_list,
  set_studentList,
  student_score_input,
  perfect_score_input,
  send_transcript,
  set_perfectScore,
} from "../modules/transcript";
import CompTranscript from "../components/manage/CompTranscript";
import { setScoreCheck } from "../lib/utils/util";
import { produce } from "immer";

const Transcript = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user }));
  const { ratio } = useSelector(({ ratio }) => ({ ratio: ratio }));
  const { transcript, studentList } = useSelector(({ transcript }) => ({
    transcript: transcript,
    studentList: transcript.studentList,
  }));
  const [lecture, setLecture] = useState("");
  const [dialVisible, setDialVisible] = useState(false);

  const onPopupVisible = useCallback((val) => {
    setDialVisible(val);
  }, []);
  // Phase 1
  // 초기화
  useEffect(() => {
    dispatch(ratioInit());
    dispatch(transcriptInit());
    //console.log("\n\nTranscript 초기화 완료\n");
  }, [dispatch]);

  // 로그인 여부
  useEffect(() => {
    if (user.userOnline !== "TRUE") {
      alert("로그아웃 상태입니다.");
      history.push("/");
    } else {
      // Login 성공시 강의 정보를 불러온다.
      const localLecture = JSON.parse(localStorage.getItem("lecture"));
      setLecture(localLecture);
      // 비율 요청
      dispatch(get_ratio(localLecture));
      // 스코어 요청
      dispatch(get_transcript(localLecture));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Phase 2
  useEffect(() => {
    if (lecture === "") {
      return;
    }

    if (ratio.success[1] === false) {
      alert("비율을 먼저 입력해주세요.");
      history.push("/main/menu");
    }
    if (
      ratio.success[1] === true &&
      transcript.success[0] === false &&
      transcript.success[2] === null
    ) {
      //console.log("서버에 데이터 존재x");
      // 만점 점수를 만든다.
      dispatch(set_perfectScore({ length: ratio.ratioArr.length }));
      // studentList 불러온다
      dispatch(get_list({ subId: lecture.subId }));
    }
  }, [
    dispatch,
    lecture,
    ratio.success,
    transcript.success,
    history,
    ratio.ratioArr.length,
  ]);
  // Phase 3
  useEffect(() => {
    if (
      lecture === "" ||
      studentList.length <= 0 ||
      transcript.success[0] === true
    ) {
      return;
    }

    if (transcript.success[3] == null) {
      const maxLabelLength = ratio.ratioArr.length;
      dispatch(set_studentList({ studentList, maxLabelLength }));
    }
    // Score에 셋팅 한다.
  }, [
    dispatch,
    lecture,
    studentList,
    ratio.ratioArr.length,
    transcript.success,
  ]);

  // 만점 점수 입력
  const perfScoreChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (setScoreCheck(value)) {
        return;
      }
      dispatch(perfect_score_input({ name, value }));
    },
    [dispatch]
  );
  // 학생 점수 입력
  const stdScoreChange = useCallback(
    ({ e, stdIdx }) => {
      const { name, value } = e.target;
      if (setScoreCheck(value) || transcript.perfectScore[name] === "") {
        return;
      }
      const maxNum = Number(transcript.perfectScore[name]);
      const minNum = Number(value);

      if (maxNum < minNum) {
        alert("만점 점수보다 작게 입력해주십시오.");
        return;
      }

      dispatch(student_score_input({ stdIdx, name, value }));
    },
    [dispatch, transcript.perfectScore]
  );

  // Sever 저장
  const submitToServer = useCallback(() => {
    const { perfectScore } = transcript;
    const { ratioArr } = ratio;

    /**
     * 만점 점수를 입력하고 학생 점수 입력한 뒤
     * 만점 점수 수정 했을 때 만점 점수가 학생 점수보다 
       낮아지는 경우가 생길 수가 있음.
     */
    let studentList = transcript.studentList;
    for (let pIdx in perfectScore) {
      for (let sIdx in studentList) {
        if (studentList[sIdx].label[pIdx] === "") {
          studentList = produce(studentList, (draft) => {
            draft[sIdx].label[pIdx] = "0";
          });
        }
        if (
          // 만점 점수보다 학생 점수 입력이 더 큰 것이 있다면...
          Number(perfectScore[pIdx]) < Number(studentList[sIdx].label[pIdx])
        ) {
          alert(
            studentList[sIdx].name +
              "의 " +
              ratioArr[pIdx].name +
              "를 바꿔주세요"
          );
          return;
        }
      }
    }

    dispatch(
      send_transcript({
        subId: lecture.subId,
        studentList: studentList,
        perfectScore: perfectScore,
      })
    );
    history.push("/main/menu");
  }, [dispatch, lecture.subId, transcript, ratio, history]);

  return (
    <CompTranscript
      stdScoreChange={stdScoreChange}
      perfScoreChange={perfScoreChange}
      onSubmit={submitToServer}
      ratioArr={ratio.ratioArr}
      studentList={transcript.studentList}
      perfectScore={transcript.perfectScore}
      subId={lecture.subId}
      dialVisible={dialVisible}
      onPopupVisible={onPopupVisible}
    ></CompTranscript>
  );
};

export default React.memo(withRouter(Transcript));

/**
 *
 */
