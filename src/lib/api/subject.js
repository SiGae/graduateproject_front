import client, { serverPath } from "./client";

// 강의 생성에서 사용
// 강의 데이터를 서버쪽으로 넘김
export const submitSubject = (subjectInfo) =>
  client.post(
    serverPath + "/makeclass_text",
    subjectInfo,
    "multipart/form-data"
  );

// 출석에서 사용
// 강의 데이터를 서버 쪽에서 받아 옴
export const getCheckDate = (subId) =>
  client.post(serverPath + "/getCheckDate", { subId });

export const getStudentList = ({ subId, month, day }) =>
  client.post(serverPath + "/getStudentList", { subId, month, day });

export const submitAttend = ({ month, day, subId, studentList }) =>
  client.post(serverPath + "/attendData", { month, day, subId, studentList });

// 비율 설정에서 사용
// 교수의 강의 채점 비율을 서버에 보냄
export const submitRatio = ({ subId, ratioArr }) =>
  client.post(serverPath + "/createRatio", { subId, ratioArr });

// 채점 비율을 서버에서 받아 옴.
export const getRatio = ({ subId }) =>
  client.post(serverPath + "/getRatio", { subId });

// 점수 평가 페이지에서 입력되어진 학생 별 점수 정보들을 받아옴
export const getScore = ({ subId }) =>
  client.post(serverPath + "/getTranscript", { subId });

// 점수 평가 페이지에서 입력된 정보들을 서버로 보냄
export const SendScore = ({ subId, studentList, perfectScore }) =>
  client.post(serverPath + "/sendScore", { subId, studentList, perfectScore });

// 직관적인 등급 수정
export const getGrade = ({ subId }) =>
  client.post(serverPath + "/getGrade", { subId });

// 등급 수정된 학생 보내기
export const sendGrade = ({ subId, studentList, gradeRatioArr }) =>
  client.post(serverPath + "/manageGrade", {
    subId,
    studentList,
    gradeRatioArr,
  });
