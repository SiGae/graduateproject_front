import React from "react";
import classNames from "classnames/bind";
import styles from "./compMain.module.scss";
import Main_menu from "../utils/Main_menu";
import Responsive from "./common/Responsive";
import styled from "styled-components";

const CustomResponsive = styled(Responsive)`
  min-height: 400px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
`;
const cn = classNames.bind(styles);
const CompMain = () => {
  return (
    <CustomResponsive>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <Main_menu />
    </CustomResponsive>
  );
};

export default CompMain;
