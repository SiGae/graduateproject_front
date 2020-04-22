import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_studentList } from "../modules/grade";

const ManageGrade = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user }));
  const { studentList } = useSelector(({ studentList }) => ({ studentList }));
  const [lecture, setLecture] = useState("");

  // Login 확인
  useEffect(() => {
    if (user.userOnline !== "TRUE") {
      history.push("/");
    } else {
      // 강의 정보들을 불러온다.
      const localLecture = JSON.parse(localStorage.getItem("lecture"));
      setLecture(localLecture);
      // 학생들의 정보를 불러온다.
      dispatch(get_studentList(localLecture));
    }
  }, [dispatch, history, user.userOnline]);

  return (
    <div>
      <div>일단 실험중</div>
    </div>
  );
};

export default withRouter(ManageGrade);
