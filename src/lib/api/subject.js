import client from "./client";

// 강의 생성에서 사용
// 강의 데이터를 서버쪽으로 넘김
export const submitSubject = subjectInfo =>
  client.post("/makeclass_text", subjectInfo, "multipart/form-data");

// 출석에서 사용
// 강의 데이터를 서버 쪽에서 받아 옴
export const getDate = ({ id, subId, month, day }) =>
  client.post("/getCheckMode", { id, subId, month, day });

export const getClass = ({ month, day }) =>
  client.get("/professor/getClass", { month, day });
/**
 *
 */
