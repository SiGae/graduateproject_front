import React from "react";
import "./compAttendance.module.scss";
import StudentsList from "./common/StudentsList";

const CompAttendance = ({
  // data
  subName,
  date,
  students,
  // action
  onCheckedAll,
  onToggle
}) => {
  /**
   * CSS check 여부에 따라 색깔이 바뀌어야 함.
   * 0 : skyblue
   * 1 : red
   * 2 : orange
   * */

  //const checkColor = ["check", "#unChecked", "tardy"];
  return (
    <div className="CompAttendance">
      <div className="SubjectHead">
        <h3>{subName}</h3>
      </div>
      <div className="Date">
        <p></p>
        <p>월</p>
        <p></p>
        <p>일</p>
      </div>
      {students.map(student => {
        //const color = checkColor[student.check];
        const color = "check"; // Test 용
        return (
          <StudentsList color={color}>
            <p>이름</p>
            <p>학번</p>
          </StudentsList>
        );
      })}
    </div>
  );
};

export default CompAttendance;
