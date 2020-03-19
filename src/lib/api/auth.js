import client from "./client";

// 로그인
export const login = ({ username, password }) =>
  client.post("/login", { username, password });

// 회원가입
export const register = ({ username, password, e_mail, phone }) =>
  client.post("/register", {
    username,
    password,
    e_mail,
    phone
  });

// 로그인 상태 체크
export const check = ({ id, userOnline }) =>
  client.get("/check", { id, userOnline });

// 로그아웃
export const logout = ({ id }) => client.post("/logout", { id });

//http://27.96.131.6/api/auth
