import React from "react";
import classNames from "classnames/bind";
import styles from "./compMain.module.scss";
import { GoSearch } from "react-icons/go";
import Main_menu from "../utils/Main_menu";

const cn = classNames.bind(styles);

const CompMain = () => {
  return (
    <div className={cn("compMain")}>
      <div className={cn("compMainSearchBar")}>
        <input placeholder="검색어를 입력해주세요"></input>
        <button>
          <GoSearch />
        </button>
      </div>
      <div className={cn("compMainMenu")}>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <Main_menu />
      </div>
    </div>
  );
};

export default CompMain;
