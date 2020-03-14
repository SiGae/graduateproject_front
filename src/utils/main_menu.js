import React from "react";
import className from "classnames/bind";
import styles from "./main_menu.module.scss";

const cn = className.bind(styles);

function makeMultiBox(text, color) {
  return (
    <div className={cn("utilsMenuBox")} style={{ background: color }}>
      <p className={cn("utilsMenuText")}>{text}</p>
    </div>
  );
}

const main_menu = () => {
  return (
    <div className={cn("utilsMultiMenu")}>
      {makeMultiBox("정보 수정", "#FF8282")}
      {makeMultiBox("출석 체크", "#F5AF64")}
      {makeMultiBox("강의 시간표", "#FFE13C")}
      {makeMultiBox("강의 개설", "skyblue")}
      {makeMultiBox("학생 관리", "#3296FF")}
      {makeMultiBox("점수 입력", "#90AFFF")}
    </div>
  );
};

export default main_menu;
