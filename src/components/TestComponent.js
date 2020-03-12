import React from "react";
import styled from "styled-components";
import axios, { post } from "axios";

const TitleBar = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid black;
`;

const TestComponent = () => {
  const client = axios.create();

  const onChange = e => {
    let files = e.target.files;
    console.warn("data file", files);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = e => {
      const url = "http://27.96.131.6:5000/api/service";
      const formData = { file: e.target.result };

      return client
        .post(url, formData)
        .then(response => console.warn("result", response));
    };
  };
  return (
    <TitleBar>
      <input type="file" name="file" onChange={onChange}></input>
    </TitleBar>
  );
};

export default TestComponent;
