import React from "react";
//import classNames from "classnames/bind";
import MenuTemplate from "./templateBackground/MenuTemplate";
import SubjectList from "./list/SubjectList";

const CompSubjectList = ({
  department,
  subjectList,
  onClick,
  menuName,
  functionChild
}) => {
  return (
    <MenuTemplate department={department} menuName={menuName}>
      <div className="SubListBox">
        {subjectList.map(subject => (
          <SubjectList
            key={subject.id}
            subName={subject.name}
            onClick={() => onClick(subject.id, subject.name)}
            btnName={menuName}
            functionChild={functionChild}
          ></SubjectList>
        ))}
      </div>
    </MenuTemplate>
  );
};

export default CompSubjectList;

/**
 *
 */
