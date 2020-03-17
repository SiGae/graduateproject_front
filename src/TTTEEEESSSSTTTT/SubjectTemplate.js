import React from "react";
import classNames from "classnames/bind";
import styles from "./SubjectTemplate.module.scss";

const cn = classNames.bind(styles);
const SubjectTemplate = ({ title, children }) => {
  return (
    <div className={cn("SubjectTemplate")}>
      <div className={cn("title")}>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default SubjectTemplate;
