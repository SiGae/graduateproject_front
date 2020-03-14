import React from "react";
import styled, { css } from "styled-components";

const StyledStudentsList = styled.div`
  border-radius: 5rem;

  ${props => {
    props.check &&
      css`
        background: skyblue;
      `;
  }}

  ${props => {
    props.unChecked &&
      css`
        background: #e9e9e9;
      `;
  }}

  ${props => {
    props.tardy &&
      css`
        background: orange;
      `;
  }}
`;

const StudentsList = props => (
  <StyledStudentsList {...props}> ></StyledStudentsList>
);

export default StudentsList;
