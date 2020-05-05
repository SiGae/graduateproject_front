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
      {makeMultiBox("출석 체크", "#FF8282", "/main/subjectChoice")}
      {makeMultiBox("강의 개설", "#FFE13C", "/main/createSubject")}
      {makeMultiBox("학생 관리", "skyblue", "/main/manageStudent")}
      {makeMultiBox("등급 수정", "#90AFFF", "/main/subManagePage")}
    </div>
  );
}

export default Main_menu;

/**
 * Component 없앤 것
 *
 *
 */
