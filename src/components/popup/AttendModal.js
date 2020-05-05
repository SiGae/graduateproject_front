import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AttendModal.module.scss";
import { useDispatch } from "react-redux";
import client, { serverPath } from "../../lib/api/client";

const cn = classNames.bind(styles);
const StudentList = ({ student }) => {
  return (
    <div className={cn("list")}>
      <h3>{student.id}</h3>
      <div className={cn("data")}>
        <p>이름 {student.name} </p>
        <p>결석 {student.결석} </p>
        <p>지각 {student.지각} </p>
        <p>출석 {student.출석} </p>
      </div>
      <div className={cn("line")} />
    </div>
  );
};
const AttendModal = ({ isVisible, subId, cstOnClickAway }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.post(serverPath + "/getAttendScore", {
          subId,
        });
        setData(response.data.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [subId, dispatch, isVisible]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    console.log("DATA : ", data);
  }, [isVisible, data]);

  return (
    <React.Fragment>
      {isVisible && (
        <React.Fragment>
          <div
            className={cn("over-lay")}
            onClick={() => cstOnClickAway(false)}
          />
          <div className={cn("body")}>
            <div className={cn("title")}>
              <h1> 출석 통계 </h1>
            </div>
            <div className={cn("content")}>
              {data.map((student, index) => (
                <StudentList key={index} student={student}></StudentList>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AttendModal;
