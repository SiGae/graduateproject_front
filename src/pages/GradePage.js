import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import SubjectChoice from "../containers/SubjectChoice";

const GradePage = ({ history }) => {
  const { user } = useSelector(({ user }) => ({ user }));

  // 등급 관리 버튼
  const btnGrade = useCallback(
    (subId, subName) => {
      const { id } = user;
      console.log("강의선택", subName);
      // 로컬 데이터에 값 저장
      try {
        localStorage.setItem("lecture", JSON.stringify({ id, subId, subName }));
      } catch (e) {
        console.log("local Storage is not working");
      }

      // 해당 페이지로 이동.
      history.push("/main/manageGrade");
    },
    [history, user]
  );

  return <SubjectChoice menuName="등급관리" menuBtn={btnGrade}></SubjectChoice>;
};

export default withRouter(GradePage);
