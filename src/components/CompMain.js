import React from "react";
import classNames from "classnames/bind";
import styles from "./compMain.module.scss";
import main_menu from "../utils/main_menu";
import { GoSearch } from "react-icons/go";

const cn = classNames.bind(styles);

const CompMain = () => {
  return (
    <div className={cn("compMain")}>
      <div className={cn("compMainHead")}>Logo</div>
      <div className={cn("compMainSearchBar")}>
        <input placeholder="검색어를 입력해주세요"></input>
        <button>
          <GoSearch />
        </button>
      </div>
      <div className={cn("compMainMenu")}>{main_menu()}</div>
    </div>
  );
};

export default CompMain;
