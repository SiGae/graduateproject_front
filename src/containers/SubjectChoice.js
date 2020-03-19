import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_professor } from "../modules/professor";

const SubjectChoice = ({ history }) => {
  const dispatch = useDispatch();
  const state = useSelector(({ user }) => ({
    id: user.id,
    useOnline: user.userOnline
  }));

  // 로그인 여부
  useEffect(() => {
    if (!state.profOnline) {
      alert("로그아웃 상태입니다.");
      history.push("/");
    }
  });

  // 로그인 시 교수정보와 강의 데이터를 받아옴.
  useEffect(() => {
    if (state.profOnline) {
      get_professor();
    }
  });

  return <div>일단보자</div>;
};

export default withRouter(SubjectChoice);
