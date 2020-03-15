import React from "react";
import classnames from "classnames/bind";
import styles from "./compAttendance.module.scss";

const cn = classnames.bind(styles);

const StudentsList = ({ student, color }) => {
  return (
    <div className={cn("StudentList", color)}>
      <p>{student.name}</p>
      <p>{student.schoolId}</p>
    </div>
  );
};

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

  const checkColor = ["skyblue", "gray", "yellow"];
  return (
    <div className={cn("CompAttendance")}>
      <div className={cn("SubjectHead")}>
        <h3>{subName}</h3>
        <text>전체선택</text>
      </div>
      <div className={cn("Date")}>
        <p>
          {date.month}월 {date.day}일
        </p>
      </div>
      {students.map(student => {
        return (
          <StudentsList
            key={student.schoolId}
            student={student}
            color={checkColor[student.check]}
            onToggle={onToggle}
          ></StudentsList>
        );
      })}
    </div>
  );
};

export default CompAttendance;
