import React from "react";
import classNames from "classnames/bind";
import styles from "./ItemList.module.scss";

const cn = classNames.bind(styles);
const SubjectList = ({ subjectName, id }) => {
  return (
    <div className={cn("itemList")}>
      <p>{subjectName}</p>
      <button>이동</button>
    </div>
  );
};
const CompSubjectList = ({ title, subList }) => {
  return (
    <div className={cn("CompSubjectList")}>
      <div className={cn("head")}>
        <h3>{title}</h3>
      </div>
      <div className={cn("body")}>
        {subList.map(list => {
          return <div></div>;
        })}
      </div>
    </div>
  );
};

export default CompSubjectList;
