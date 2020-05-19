import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  initialization,
  get_date,
  get_students,
  set_subName,
  toggle,
  moveIndex,
  submit_attend,
} from "../modules/attend";
import CompAttendance from "../components/CompAttendance";

const Attendance = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user }));
  const { attend } = useSelector(({ attend }) => ({ attend: attend }));
  const [lecture, setLecture] = useState("");
  const [dialVisible, setDialVisible] = useState(false);

  const onPopupVisible = useCallback((visible) => {
    setDialVisible(visible);
  }, []);

  useEffect(() => {
    dispatch(initialization());
  }, [dispatch]);

  // Mount시
  useEffect(() => {
    // Login 체크
    if (user.userOnline !== "TRUE") {
      alert("로그아웃 상태입니다.");
      history.push("/");
    } else {
      // 교수와 강의 아이디를 불러온다.
      const localLecture = JSON.parse(localStorage.getItem("lecture"));
      setLecture(localLecture);
      // 날짜 받아오기
      dispatch(get_date(localLecture));
      // 강의 정보 셋팅
      dispatch(set_subName({ subName: localLecture.subName }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 마운트 뒤 부턴 이 함수 작동.
  useEffect(() => {
    if (attend.error !== null) return;
    if (attend.stdStatus === true) {
      const { subId } = lecture;
      const { month, day } = attend.date[attend.curIndex];
      // 출석 정보를 가져와야 함.
      dispatch(get_students({ subId, month: month, day: day }));
    }
  }, [attend, dispatch, lecture]);

  // onToggle
  function onToggle(id) {
    dispatch(toggle({ id }));
  }
  // onMoveIndex
  function onMoveIndex(idx) {
    if (attend.date.length <= idx || idx < 0) {
      alert("요청 날짜가 더 이상 존재 하지 않습니다.");
      return 0;
    }

    // 현재 가리키는 인덱스 조정
    dispatch(moveIndex(idx));
  }
  // onSave
  function onSave() {
    const { month, day } = attend.date[attend.curIndex];
    dispatch(
      submit_attend({
        month: month,
        day: day,
        subId: lecture.subId,
        studentList: attend.studentList,
      })
    );

    history.push("/main/menu");
  }

  return (
    <CompAttendance
      month={attend.date[attend.curIndex].month}
      day={attend.date[attend.curIndex].day}
      subName={attend.subName}
      studentList={attend.studentList}
      curIndex={attend.curIndex}
      dialVisible={dialVisible}
      subId={lecture.subId}
      onToggle={onToggle}
      onMoveIndex={onMoveIndex}
      onSave={onSave}
      onPopupVisible={onPopupVisible}
    ></CompAttendance>
  );
};

export default React.memo(withRouter(Attendance));

/**
 *
 */
