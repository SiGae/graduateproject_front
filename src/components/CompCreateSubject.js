import React from "react";
import styled, { css } from "styled-components";
import Responsive from "./common/Responsive";
import Button from "./common/Button";
import cn from "classnames";

const DivTemplate = styled(Responsive)`
  margin-top: 10px;
  padding: 0;
  h2 {
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const SendLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const BoxFormStyle = css`
  display: flex;
  align-items: center;
  width: 90%;
  height: 40px;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 200px;
    height: 100%;

    @media (max-width: 768px) {
      width: 150px;
    }
  }
`;

const BoxForm = styled.div`
  ${BoxFormStyle}

  input {
    border: 0;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
    padding: 0;
    height: 100%;
    margin-left: 20px;
    flex: 1;
  }
`;

const Week = styled.div`
  display: flex;
  margin-left: 20px;
  width: 300px;
  height: 100%;
  cursor: pointer;
  p {
    &:hover {
      background: skyblue;
      color: white;
    }
  }

  @media (max-width: 600px) {
    width: 250px;
  }

  .checked {
    background: skyblue;
    color: white;
  }
`;

const BoxForm2 = styled.div`
  ${BoxFormStyle}
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    height: 70px;

    input {
      margin-top: 20px;
      margin-left: 40px;
    }
  }
  .layout {
    display: flex;
    height: 100%;
  }

  button {
    border: 0;
    background: rgba(143, 170, 220);
    color: white;
    font-weight: bold;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
      background: rgba(180, 199, 231);
    }
  }

  .relativeStyle {
    background: rgba(180, 199, 231);
  }
  .absoluteStyle {
    background: rgba(180, 199, 231);
  }
`;

function Box({ type, value, name, string, onChange }) {
  return (
    <BoxForm>
      <p>{string}</p>
      <input type={type} name={name} value={value} onChange={onChange}></input>
    </BoxForm>
  );
}

function Evaluation({
  onClickAbsolute,
  onClickRelative,
  evaluation,
  onChangeFile
}) {
  const relativeStyle = evaluation === 1 ? true : false;
  const absoluteStyle = evaluation === 0 ? true : false;
  return (
    <BoxForm2>
      <div className="layout">
        <p>평가 기준</p>
        <button onClick={onClickRelative} className={cn({ relativeStyle })}>
          상대평가
        </button>
        <button onClick={onClickAbsolute} className={cn({ absoluteStyle })}>
          절대평가
        </button>
      </div>
      <form action={"/makeclass"} method="POST" encType="multipart/form-data">
        <input type="file" onChange={onChangeFile}></input>
      </form>
    </BoxForm2>
  );
}

const CompCreateSubject = ({
  subject,
  onClickSubWeek,
  onClickAbsolute,
  onClickRelative,
  onChange,
  onChangeFile,
  onSubmit
}) => {
  const { subWeek } = subject;
  return (
    <DivTemplate>
      <h2>강의 개설</h2>
      <Body>
        <Box
          type={"text"}
          value={subject.subName}
          name={"subName"}
          string={"강의명"}
          onChange={onChange}
        ></Box>
        <Box
          type={"text"}
          value={subject.type}
          name={"type"}
          string={"분반"}
          onChange={onChange}
        ></Box>
        <Box
          type={"text"}
          value={subject.memo}
          name={"memo"}
          string={"메모"}
          onChange={onChange}
        ></Box>
        <Box
          type={"text"}
          value={subject.roomNumber}
          name={"roomNumber"}
          string={"강의실"}
          onChange={onChange}
        ></Box>
        <BoxForm>
          <p>강의요일</p>
          <Week>
            <p
              onClick={() => onClickSubWeek(0)}
              className={cn({ checked: subWeek[0] })}
            >
              월
            </p>
            <p
              onClick={() => onClickSubWeek(1)}
              className={cn({ checked: subWeek[1] })}
            >
              화
            </p>
            <p
              onClick={() => onClickSubWeek(2)}
              className={cn({ checked: subWeek[2] })}
            >
              수
            </p>
            <p
              onClick={() => onClickSubWeek(3)}
              className={cn({ checked: subWeek[3] })}
            >
              목
            </p>
            <p
              onClick={() => onClickSubWeek(4)}
              className={cn({ checked: subWeek[4] })}
            >
              금
            </p>
          </Week>
        </BoxForm>
        <Evaluation
          onClickAbsolute={onClickAbsolute}
          onClickRelative={onClickRelative}
          evaluation={subject.evaluation}
          onChangeFile={onChangeFile}
        />
        <SendLayout>
          <Button gray onClick={onSubmit}>
            개설
          </Button>
        </SendLayout>
      </Body>
    </DivTemplate>
  );
};

export default CompCreateSubject;
