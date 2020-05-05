import React from "react";
import classnames from "classnames/bind";
import styles from "./compAttendance.module.scss";
import styled from "styled-components";
import Responsive from "./common/Responsive";
import Button from "./common/Button";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import AttendModal from "./popup/AttendModal";

const CustomResponsive = styled(Responsive)`
  margin-top: 20px;
  padding: 0px;
`;
const cn = classnames.bind(styles);

const StudentsList = ({ student, color, onToggle }) => {
  return (
    <div
      className={cn("StudentList", color)}
      onClick={() => onToggle(student.id)}
    >
      <p>{student.name}</p>
      <p>{student.id}</p>
    </div>
  );
};

const CompAttendance = ({
  // data
  subName,
  month,
  day,
  studentList,
  curIndex,
  dialVisible,
  subId,
  // action
  onToggle,
  onMoveIndex,
  onSave,
  onPopupVisible,
}) => {
  /**
   * CSS check 여부에 따라 색깔이 바뀌어야 함.
   * 0 : skyblue
   * 1 : red
   * 2 : orange
   * */

  const checkColor = ["skyblue", "gray", "yellow"];
  return (
    <CustomResponsive>
      <div className={cn("SubjectHead")}>
        <h2>{subName}</h2>
        <p onClick={() => onPopupVisible(true)}>출석현황</p>
      </div>
      <div className={cn("Date")}>
        <GoTriangleLeft
          className={cn("left")}
          onClick={() => onMoveIndex(curIndex - 1)}
        />
        <p>
          {month}월 {day}일
        </p>
        <GoTriangleRight
          className={cn("right")}
          onClick={() => onMoveIndex(curIndex + 1)}
        />
      </div>
      <div className={cn("body")}>
        {studentList.map((student, index) => {
          return (
            <StudentsList
              key={student.id}
              student={student}
              color={checkColor[student.status]}
              onToggle={onToggle}
            ></StudentsList>
          );
        })}
      </div>
      <div className={cn("save")}>
        <Button gray={true} onClick={onSave}>
          저장
        </Button>
      </div>
      <AttendModal
        isVisible={dialVisible}
        subId={subId}
        cstOnClickAway={() => onPopupVisible(false)}
      />
    </CustomResponsive>
  );
};

export default React.memo(CompAttendance);
