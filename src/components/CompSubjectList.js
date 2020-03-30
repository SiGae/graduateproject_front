import React from "react";
//import classNames from "classnames/bind";
import MenuTemplate from "./templateBackground/MenuTemplate";
import SubjectList from "./list/SubjectList";

const CompSubjectList = ({ department, subjectList, onClick }) => {
  return (
    <MenuTemplate department={department} menuName="출석체크">
      <div className="SubListBox">
        {subjectList.map(subject => (
          <SubjectList
            key={subject.id}
            subName={subject.name}
            onClick={() => onClick(subject.id, subject.name)}
          />
        ))}
      </div>
    </MenuTemplate>
  );
};

export default CompSubjectList;

/**
 *
 */
