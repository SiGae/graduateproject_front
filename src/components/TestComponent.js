import React from "react";
import styled from "styled-components";
import FileUploader from "../utils/FileUploader";

const TitleBar = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid black;
`;

const TestComponent = () => {
  return (
    <>
      <FileUploader url="/api/file"></FileUploader>
      <textarea></textarea>
    </>
  );
};

export default TestComponent;
