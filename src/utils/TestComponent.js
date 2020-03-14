import React, { useState } from "react";
import styled from "styled-components";
import client from "../lib/api/client";

const TitleBar = styled.div`
  border: 1px solid black;
`;

const TestComponent = ({ url }) => {
  const [files, setFiles] = useState("");

  const onChange = e => {
    setFiles(e.target.files);
  };

  const onClick = () => {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = e => {
      const formData = { file: e.target.result };

      console.warn(formData);

      return client
        .post("/fileupload", formData)
        .then(response => console.warn("result", response));
    };
  };
  return (
    <TitleBar>
      <input type="file" name="file" onChange={onChange}></input>
      <button onClick={onClick}>제출</button>
    </TitleBar>
  );
};

export default TestComponent;
