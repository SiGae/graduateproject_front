import React from "react";
import { Link } from "react-router-dom";
import className from "classnames/bind";
import styles from "./Main_menu.module.scss";

const cn = className.bind(styles);

function makeMultiBox(text, color, src) {
  return (
    <Link to={src} className={cn("utilsMenuBox")} style={{ background: color }}>
      <p className={cn("utilsMenuText")}>{text}</p>
    </Link>
  );
}

function Main_menu() {
  return (
    <div className={cn("utilsMultiMenu")}>
      {makeMultiBox("정보 수정", "#FF8282", "/main/menu")}
      {makeMultiBox("출석 체크", "#F5AF64", "/main/subjectChoice")}
      {makeMultiBox("강의 시간표", "#FFE13C", "/main/menu")}
      {makeMultiBox("강의 개설", "skyblue", "/main/menu")}
      {makeMultiBox("학생 관리", "#3296FF", "/main/menu")}
      {makeMultiBox("점수 입력", "#90AFFF", "/main/menu")}
    </div>
  );
}

export default Main_menu;
