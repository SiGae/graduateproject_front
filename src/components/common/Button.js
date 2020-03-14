import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: #3bc9db;
  &:hover {
    background: #22b8cf;
  }
`;

const Button = props => <StyledButton {...props} />;

export default Button;
