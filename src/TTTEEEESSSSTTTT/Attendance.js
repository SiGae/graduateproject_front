import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Attendance.module.scss";
import SubjectTemplate from "./SubjectTemplate";

const cn = classNames.bind(styles);

const Attendance = () => {
  const dateObj = new Date();
  const [date, setDate] = useState({
    day: dateObj.getDate(),
    year: dateObj.getFullYear(),
    month: dateObj.getUTCMonth() + 1
  });

  return (
    <SubjectTemplate>
      <div className={cn("AttendanceDate")}>
        <hr />
        <p style={{ fontWeight: "bold" }}>
          {date.month}월 {date.day}일
        </p>
        <hr />
      </div>
    </SubjectTemplate>
  );
};

export default Attendance;
