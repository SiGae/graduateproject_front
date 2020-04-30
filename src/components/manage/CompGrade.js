import React from "react";
import classNames from "classnames/bind";
import styles from "./CompGrade.module.scss";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import Button from "../../components/common/Button";

const cn = classNames.bind(styles);
const Template = styled(Responsive)`
  padding: 0px;
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
      <p>{student.id}</p>
      <p>{student.name}</p>
    </div>
  );
};

const CompGrade = ({
  itemClick,
  switchForNot,
  studentList,
  gradeRatioArr,
  onChange,
  onSubmit,
  fMode,
  isHundred,
}) => {
  return (
    <Template>
      <div className={cn("head")}>
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
        {studentList.map((student, index) => (
          <ItemList
            key={index}
            itemClick={() => itemClick(student.id, student.grade)}
            student={student}
          ></ItemList>
        ))}
      </div>
      <div className={cn("footer")}>
        <div className={cn("save")}>
          <Button onClick={onSubmit}>저장</Button>
        </div>
      </div>
    </Template>
  );
};

export default CompGrade;

/**
 *  <input
            placeholder="A비율(%)"
            name={0}
            value={gradeRatioArr[0]}
            onChange={onChange}
          ></input>
          <input
            placeholder="B비율(%)"
            name={1}
            value={gradeRatioArr[1]}
            onChange={onChange}
          ></input>
          <input placeholder="C비율(%)"></input>
          <input placeholder="D비율(%)"></input>

          <Button onClick={onModifyRatio}>비율적용</Button>
 */
