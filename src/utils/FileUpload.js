import React, { useState } from "react";
import styled from "styled-components";
import client from "../lib/api/client";

const TitleBar = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

const FileUpload = ({ url }) => {
  const [files, setFiles] = useState("");

  const onChange = e => {
    setFiles(e.target.files[0]);
  };

  const onClick = url => {
    const formData = new FormData();
    formData.append("file", files);
    console.log("내용좀", files);
    return client
      .post(url, files)
      .then(res => {
        console.log("성공");
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <TitleBar>
      <form action={url} method="POST" encType="multipart/form-data">
        <input type="file" name="file" onChange={onChange}></input>
        <button onClick={() => onClick(url)}>제출</button>
      </form>
    </TitleBar>
  );
};

export default FileUpload;

/**
 * let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = e => {
      const formData = { file: e.target.result };

      console.warn(formData);

      return client
        .post(url, formData)
        .then(response => console.warn("result", response));
    };
 */
