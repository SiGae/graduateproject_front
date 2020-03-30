import client from "./client";

export const professor = ({ id }) => client.post("/professor", { id });
