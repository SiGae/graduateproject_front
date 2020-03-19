import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const buttonStyle = css`
  border: none;
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

  ${props =>
    props.gray &&
    css`
      background: black;
      &:hover {
        background: lightgray;
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => {
  return props.to ? (
    <StyledLink {...props} gray={props.gray ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
