import React from "react";
import classnames from "classnames/bind";
import styles from "./CompManageList.module.scss";
import Button from "../components/common/Button";

const cn = classnames.bind(styles);
const CompManageList = () => {
  return (
    <div className={cn("body")}>
      <Button gray="true">평가 항목</Button>
      <Button gray="true">점수 입력</Button>
    </div>
  );
};

export default CompManageList;
