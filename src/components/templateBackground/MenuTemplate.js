import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";

const DivTemplate = styled(Responsive)`
  margin-top: 20px;
`;

const TemplateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;

  .department {
    margin-left: 10px;
  }
  .menuName {
    display: flex;
    margin-right: 10px;
  }
`;

const MenuTemplate = ({ department, menuName, children }) => {
  return (
    <DivTemplate>
      <TemplateBox>
        <h3 className="department">{department}</h3>
        <h3 className="menuName">{menuName}</h3>
      </TemplateBox>
      <hr />
      {children}
    </DivTemplate>
  );
};
export default MenuTemplate;
