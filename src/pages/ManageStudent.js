import React from "react";
import { useSelector } from "react-redux";
import SubjectChoice from "../containers/SubjectChoice";
import { withRouter } from "react-router-dom";
import Button from "../components/common/Button";

const ManageStudent = ({ history }) => {
  const { user } = useSelector(({ user }) => ({
    user: user
  }));

  function setLecture(subId, subName) {
    const { id } = user;
    // 로컬 데이터에 값 저장
    try {
      localStorage.setItem("lecture", JSON.stringify({ id, subId, subName }));
    } catch (e) {
      console.log("local Storage is not working");
    }
  }

  // 평가 설정 버튼
  const onManageRatio = (subId, subName) => {
    // Lecture에 (과목 ID, 과목 Name) 저장.
    setLecture(subId, subName);
    // 비율 설정 페이지로 이동
    history.push("/main/ratio");
  };

  // 학생 성적 관리 버튼
  const onManageTranscript = (subId, subName) => {
    // Lecture에 (과목 ID, 과목 Name) 저장.
    setLecture(subId, subName);
    // 학생 성적 입력 페이지로 이동
    history.push("/main/transcript");
  };

  const ChildrenComponent = (subId, subName) => {
    return (
      <>
        <Button
          gray="true"
          style={{ marginRight: "3px" }}
          onClick={() => onManageRatio(subId, subName)}
        >
          평가 설정
        </Button>
        <Button gray onClick={() => onManageTranscript(subId, subName)}>
          학생 성적 관리
        </Button>
      </>
    );
  };

  return (
    <SubjectChoice
      menuName="학생 성적 관리"
      menuBtn={ChildrenComponent}
      functionChild={true}
    ></SubjectChoice>
  );
};

export default withRouter(ManageStudent);
