import React from "react";
import SubjectChoice from "../containers/SubjectChoice";
import { withRouter } from "react-router-dom";

const ManageStudent = ({ history }) => {
  const onChoice = (subId, subName) => {
    // 로컬 데이터에 값 저장
    try {
      localStorage.setItem("lecture", JSON.stringify({ subId, subName }));
    } catch (e) {
      console.log("local Storage is not working");
    }

    // ManageList
    history.push("/main/mngStudent");
  };

  return <SubjectChoice menuBtn={onChoice} menuName="관리"></SubjectChoice>;
};

export default withRouter(ManageStudent);
