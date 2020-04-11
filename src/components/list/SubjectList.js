import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const SubjectBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 2em;
  border: 1px solid black;
  box-sizing: border-box;
  .subjectName {
    display: flex;
    align-items: center;
    justify-content: center;

    flex: 1;
  }
`;

const StyledButton = styled(Button)``;
const SubjectList = ({ subName, onClick, functionChild }) => {
  return (
    <SubjectBlock>
      <h3 className="subjectName">{subName}</h3>
      {functionChild !== true ? (
        <StyledButton gray={true} onClick={onClick}>
          {subName}
        </StyledButton>
      ) : (
        onClick()
      )}
    </SubjectBlock>
  );
};

export default SubjectList;
