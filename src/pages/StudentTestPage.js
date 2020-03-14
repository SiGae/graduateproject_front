import React, { useState, useEffect } from "react";
//import CompAttendance from "../components/CompAttendance";

const students = [
  {
    name: "가나다",
    schoolId: 111111,
    department: "컴퓨터공학과",
    check: false
  },
  {
    name: "나다가",
    schoolId: 222222,
    department: "컴퓨터공학과",
    check: false
  },
  {
    name: "다나가",
    schoolId: 333333,
    department: "컴퓨터공학과",
    check: false
  }
];

const StudentTestPage = () => {
  const dateObj = new Date();
  const [date, setDate] = useState({
    date: dateObj.getDate(),
    year: dateObj.getFullYear(),
    month: dateObj.getUTCMonth() + 1
  });

  console.log(date);
  return (
    <>
      <p>{students[0].name}</p>
      <p>{students[1].name}</p>
      <p>{students[2].name}</p>
    </>
  );
};

export default StudentTestPage;

// <CompAttendance students={students} date={date}></CompAttendance>
