import React, { useEffect, useState, useRef, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./AttendModal.module.scss";
import { useDispatch } from "react-redux";
import client, { serverPath } from "../../lib/api/client";
import Draggable from "react-draggable";

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
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: -400,
      y: 200,
    },
  });
  const handleDrag = (e, ui) => {
    const { x, y } = state.deltaPosition;
    setState({
      ...state,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  const onStart = () => {
    setState({ ...state, activeDrags: ++state.activeDrags });
  };
  const onStop = () => {
    setState({ ...state, activeDrags: --state.activeDrags });
  };

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
        console.log("call : ", response.data.data);
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
        <Draggable
          defaultPosition={{ x: 0, y: 0 }}
          handle="strong"
          onStart={onStart}
          onStop={onStop}
        >
          <div className={cn("body")}>
            <div className={cn("title")}>
              <p onClick={() => cstOnClickAway(false)}>X</p>
              <strong className={cn("cursor")}>
                <h1> 출석 통계 </h1>
              </strong>
            </div>
            <div className={cn("content")}>
              {data.map((student, index) => (
                <StudentList key={index} student={student}></StudentList>
              ))}
            </div>
          </div>
        </Draggable>
      )}
    </React.Fragment>
  );
};

export default React.memo(AttendModal);

/**
  * <Draggable handle="strong" {...dragHandlers}>
            <div className="box no-cursor">
              <strong className="cursor">
                <div>Drag here</div>
              </strong>
              <div>You must click my handle to drag me</div>
            </div>
          </Draggable>
  */

/**
   * <React.Fragment>
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
   */
