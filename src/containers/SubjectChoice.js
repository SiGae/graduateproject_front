import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_professor } from "../modules/professor";
import CompSubjectList from "../components/CompSubjectList";

const SubjectChoice = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user
  }));

  console.log("SubjectChoice", user);
  // 로그인 여부
  useEffect(() => {
    if (user.userOnline !== "TRUE") {
      alert("로그아웃 상태입니다.");
      history.push("/");
    } else {
      // 로그인 시 교수정보와 강의 데이터를 받아옴.
      dispatch(get_professor(user));
    }
  }, [user]);

  return <CompSubjectList department="컴퓨터공학과"></CompSubjectList>;
};

export default withRouter(SubjectChoice);
