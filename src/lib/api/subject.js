import client from "./client";

// 강의 생성에서 사용
// 강의 데이터를 서버쪽으로 넘김
export const submitSubject = ({ subjectInfo, text }) =>
  client.post("/makeclass_text", subjectInfo, "multipart/form-data");
/*
  const response =
    text == "file"
      ? client.post("/makeclass_file", subjectInfo)
      : client.post("/makeclass_text", subjectInfo);
      */

// 출석에서 사용
// 강의 데이터를 서버 쪽에서 받아 옴
export const getSubject = ({ id, subId }) =>
  client.get("/getclass", { id, subId });

/**
 *
 */
