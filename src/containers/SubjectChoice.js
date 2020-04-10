import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_professor } from "../modules/professor";
import CompSubjectList from "../components/CompSubjectList";

const SubjectChoice = ({ menuName, menuBtn, history }) => {
  // 로그인 정보와 교수 정보를 받아온다.
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user,
  }));
  const { professor } = useSelector(({ professor }) => ({
    professor: professor,
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

  return (
    <CompSubjectList
      department="컴퓨터공학과"
      subjectList={professor.subjectList}
      onClick={menuBtn}
      menuName={menuName}
    ></CompSubjectList>
  );
};

export default withRouter(SubjectChoice);
