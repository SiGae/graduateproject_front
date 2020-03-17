import React, { useState } from "react";
import CompAttendance from "../components/CompAttendance";

const students = [
  {
    name: "가나다",
    schoolId: 111111,
    department: "컴퓨터공학과",
    check: 0
  },
  {
    name: "나다가",
    schoolId: 222222,
    department: "컴퓨터공학과",
    check: 1
  },
  {
    name: "다나가",
    schoolId: 333333,
    department: "컴퓨터공학과",
    check: 2
  }
];

const StudentTestPage = () => {
  const dateObj = new Date();
  const [date, setDate] = useState({
    day: dateObj.getDate(),
    year: dateObj.getFullYear(),
    month: dateObj.getUTCMonth() + 1
  });

  console.log(date);
  return (
    <>
      <CompAttendance
        subName={"멀티미디어"}
        date={date}
        students={students}
      ></CompAttendance>
    </>
  );
};

export default StudentTestPage;

//
