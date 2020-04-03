import client, { serverPath } from "./client";

export const professor = ({ id }) =>
  client.post(serverPath + "/professor", { id });
