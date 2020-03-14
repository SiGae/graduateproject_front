import client from "./client";

// Login
export const login = ({ username, password }) =>
  client.post("/login", { username, password });

export const register = ({ username, password, e_mail, phone }) =>
  client.post("/register", {
    username,
    password,
    e_mail,
    phone
  });

export const check = () => client.get("/check");

//http://27.96.131.6/api/auth
