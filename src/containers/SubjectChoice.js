import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_professor } from "../modules/professor";
import CompSubjectList from "../components/CompSubjectList";

const SubjectChoice = ({ history }) => {
  // 로그인 정보와 교수 정보를 받아온다.
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user
  }));
  const { professor } = useSelector(({ professor }) => ({
    professor: professor
  }));

  useEffect(() => {
    // 로그인 여부
    if (user.userOnline !== "TRUE") {
      alert("로그아웃 상태입니다.");
      history.push("/");
    } else {
      // 로그인 시 교수정보와 강의 데이터를 받아옴.
      dispatch(get_professor(user));
    }
  }, [user, dispatch, history]);

  // 출석체크 버튼 클릭
  const goToAttend = (subId, subName) => {
    const { id } = user;
    console.log("강의선택", subName);
    // 로컬 데이터에 값 저장
    try {
      localStorage.setItem("lecture", JSON.stringify({ id, subId, subName }));
    } catch (e) {
      console.log("local Storage is not working");
    }

    // 해당 페이지로 이동.
    history.push("/main/attend");
  };

  return (
    <CompSubjectList
      department="컴퓨터공학과"
      subjectList={professor.subjectList}
      onClick={goToAttend}
    ></CompSubjectList>
  );
};

export default withRouter(SubjectChoice);
