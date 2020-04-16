import React from "react";
import styled from "styled-components";
import classNames from "classnames/bind";
import styles from "./CompTranscript.module.scss";
import Responsive from "../common/Responsive";
import Button from "../common/Button";

const Body = styled(Responsive)`
  padding: 0rem;
  margin-top: 20px;
  min-height: 300px;
  max-height: 100%;

  width: 1234px;

  @media (max-width: 1264px) {
    width: 1024px;
  }
  @media (max-width: 1024px) {
    width: 770px;
  }
  @media (max-width: 770px) {
    width: 100%;
    padding: 0rem;
  }
`;

const Ratio = ({ name, perfectScore, index, onChange }) => {
  return (
    <div className={cn("topBox")}>
      <p>{name}</p>
      <input
        placeholder={"만점점수"}
        name={index}
        value={perfectScore[index]}
        onChange={onChange}
      ></input>
    </div>
  );
};

const StyledInput = ({ index, label, onChange }) => {
  return <input name={index} value={label} onChange={onChange}></input>;
};

const Student = ({ student, stdScoreChange }) => {
  const labelList = student.label;

  return (
    <div className={cn("studentBox")}>
      <div className={cn("stdInfo")}>
        <p>{student.id}</p>
        <p>{student.name}</p>
      </div>
      <div className={cn("label")}>
        {labelList &&
          labelList.map((label, index) => (
            <StyledInput
              key={index}
              index={index}
              label={label}
              onChange={stdScoreChange}
            ></StyledInput>
          ))}
      </div>
    </div>
  );
};
const cn = classNames.bind(styles);
const CompTranscript = ({
  // Data
  ratioArr,
  studentList,
  perfectScore,
  // Action
  stdScoreChange,
  perfScoreChange,
  onSubmit,
}) => {
  return (
    <Body>
      <div className={cn("top")}>
        <div className={cn("whisper")}></div>
        <div className={cn("ratioList")}>
          {perfectScore.length > 0 &&
            ratioArr.map((ratio, index) => (
              <Ratio
                key={index}
                name={ratio.name}
                perfectScore={perfectScore}
                index={index}
                onChange={(e) => perfScoreChange(e)}
              ></Ratio>
            ))}
        </div>
      </div>
      <div className={cn("contents")}>
        {studentList &&
          studentList.map((student, index) => (
            <Student
              key={index}
              student={student}
              stdScoreChange={(e) => stdScoreChange({ e, stdIdx: index })}
            />
          ))}
      </div>
      <div className={cn("submit")}>
        <Button onClick={onSubmit}>저장</Button>
      </div>
    </Body>
  );
};

export default React.memo(CompTranscript);
