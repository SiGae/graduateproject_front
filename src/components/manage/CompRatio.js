import React from "react";
import styled, { css } from "styled-components";
import classNames from "classnames/bind";
import styles from "./CompRatio.module.scss";
import Responsive from "../common/Responsive";
import { AiFillPlusCircle } from "react-icons/ai";

const DivTemplate = styled(Responsive)`
  margin-top: 20px;
  padding: 0px;
`;

const commonStyle = css`
  width: 140px;
  margin-right: 20px;
`;
const FirstInput = styled.input`
  ${commonStyle}
  height: 30px;
`;

const SecondInput = styled.input`
  ${commonStyle}
  height: 50px;
`;
const DataList = ({ onChange }) => {
  return (
    <div className={cn("listBody")}>
      <FirstInput placeholder={"첫 번째"}></FirstInput>
      <SecondInput></SecondInput>
    </div>
  );
};

const cn = classNames.bind(styles);
const CompRatio = ({ listArr, onChange }) => {
  return (
    <DivTemplate>
      <div className={cn("body")}>
        {listArr.length !== 0 &&
          listArr.map((ratio, index) => (
            <DataList key={index} onChange={(e) => onChange(e, index)} />
          ))}
        <AiFillPlusCircle className={cn("plus")} />
      </div>
    </DivTemplate>
  );
};

export default CompRatio;
