import React from "react";
//import classNames from "classnames/bind";
import MenuTemplate from "./templateBackground/MenuTemplate";
import SubjectList from "./list/SubjectList";

const CompSubjectList = ({ department, subjectList }) => {
  return (
    <MenuTemplate department={department} menuName="출석체크">
      <div className="SubListBox">
        <SubjectList></SubjectList>
        <SubjectList></SubjectList>
        <SubjectList></SubjectList>
        <SubjectList></SubjectList>
        <SubjectList></SubjectList>
      </div>
    </MenuTemplate>
  );
};

export default CompSubjectList;
