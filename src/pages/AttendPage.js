import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import SubjectChoice from "../containers/SubjectChoice";

const AttendPage = ({ history }) => {
  const user = useSelector(({ user }) => ({
    user: user,
  }));

  // 출석체크 버튼 클릭
  const goToAttend = (subId, subName) => {
    const { id } = user;
    //console.log("강의선택", subName);
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
    <SubjectChoice menuName="출석체크" menuBtn={goToAttend}></SubjectChoice>
  );
};

export default withRouter(AttendPage);
