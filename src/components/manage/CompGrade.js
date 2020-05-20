import React from "react";
import classNames from "classnames/bind";
import styles from "./CompGrade.module.scss";
import styled, { css } from "styled-components";
import Responsive from "../common/Responsive";
import Button from "../../components/common/Button";
import AttendModal from "../popup/AttendModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const cn = classNames.bind(styles);
const Template = styled(Responsive)`
  padding: 0px;

  ${(props) =>
    props.dialVisible &&
    css`
      html {
        overflow: hidden;
      }
    `}
`;

// inputRatioList
const CompGradeRatio = ({ value, index, onChange }) => {
  const placeholder = ["A비율(%)", "B비율(%)", "C비율(%)", "D비율(%)"];
  return (
    <input
      placeholder={placeholder[index]}
      name={index}
      value={value}
      onChange={onChange}
    ></input>
  );
};

function colorCheck(grade) {
  const color = {
    A: "red",
    B: "blue",
    C: "green",
    D: "yellow",
    F: "gray",
  };

  return color[grade] || "";
}
// studentList
const ItemList = ({ itemClick, itemDoubleClick, student }) => {
  let grade = student.grade;
  let color = "";
  let plus = "";

  if (/[+]/g.test(student.grade)) {
    grade = student.grade.substring(0, 1);
    color = colorCheck(grade);
    plus = "plus";
    // color += color !== "" ? " plus" : "";
  } else {
    color = colorCheck(grade);
  }

  return (
    <div
      className={cn("item", color, plus)}
      onClick={itemClick}
      onDoubleClick={itemDoubleClick}
    >
      <div className={cn("stdInfo")}>
        <p>{student.id}</p>
        <p>{student.name}</p>
      </div>
      <div className={cn("score")}>
        {student &&
          student.component.map((list, index) => (
            <p key={index}>{list.score}</p>
          ))}
        <p>{student.grade}</p>
      </div>
    </div>
  );
};

const CompGrade = ({
  studentList,
  gradeRatioArr,
  dialVisible,
  subId,
  // ACTION
  itemClick,
  onChange,
  onSubmit,
  onDragEnd,
  switchForNot,
  fMode,
  isHundred,
  onPopupStat,
}) => {
  return (
    <Template dialVisible={dialVisible}>
      <div className={cn("head")}>
        <div className={cn("statistics")}>
          <p onClick={() => onPopupStat(true)}>출석 통계</p>
        </div>
        <div className={cn("grade")}>
          {gradeRatioArr.map((value, index) => (
            <CompGradeRatio
              key={index}
              value={value}
              index={index}
              onChange={onChange}
            ></CompGradeRatio>
          ))}
        </div>
      </div>
      <div className={cn("alert")}>
        {!isHundred && <p>총 비율 100을 맞춰주십시오.</p>}
      </div>
      <div className={cn("body")}>
        <p className={cn({ clicked: fMode })} onClick={switchForNot}>
          F선택 모드
        </p>
        <div className={cn("COBACKGROUND")}>
          <div className={cn("COEMPTY")}></div>
          <div className={cn("CONAME")}>
            {studentList[0] &&
              studentList[0].component.map((list, index) => (
                <p key={index}>{list.coname}</p>
              ))}
            <p>등급</p>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" type="STUDENTS">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className={cn("droppable")}>
                {studentList.map((student, index) => (
                  <Draggable
                    key={student.id}
                    draggableId={student.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={cn("draggable")}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ItemList
                          key={index}
                          itemClick={() => itemClick(student.id, student.grade)}
                          student={student}
                        ></ItemList>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className={cn("footer")}>
        <div className={cn("save")}>
          <Button onClick={onSubmit}>저장</Button>
        </div>
      </div>
      <AttendModal
        isVisible={dialVisible}
        cstOnClickAway={() => onPopupStat(false)}
        subId={subId}
      />
    </Template>
  );
};

export default React.memo(CompGrade);
