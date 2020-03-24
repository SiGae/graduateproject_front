import client from "./client";

export const submitSubject = subjectInfo =>
  client.post("/makeclass", subjectInfo);
