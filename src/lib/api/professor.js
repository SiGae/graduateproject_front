import client from "./client";

export const professor = ({ id }) => client.get("/professor", { id });
