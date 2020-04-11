import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_professor } from "../modules/professor";
import CompSubjectList from "../components/CompSubjectList";

const SubjectChoice = ({ menuName, menuBtn, history, functionChild }) => {
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
      // 사용자가 생성한 (과목리스트, 부서이름 불러옴)
      dispatch(get_professor(user));
    }
  }, [user, dispatch, history]);

  return (
    <CompSubjectList
      department="컴퓨터공학과"
      subjectList={professor.subjectList}
      onClick={menuBtn}
      menuName={menuName}
      functionChild={functionChild}
    ></CompSubjectList>
  );
};

export default withRouter(SubjectChoice);
