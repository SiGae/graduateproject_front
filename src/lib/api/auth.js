import client, { serverPath } from "./client";

// 로그인
export const login = ({ username, password }) =>
  client.post(serverPath + "/login", { username, password });

// 회원가입
export const register = ({ username, password, e_mail, phone }) =>
  client.post(serverPath + "/register", {
    username,
    password,
    e_mail,
    phone
  });

// 로그인 상태 체크
export const check = ({ id, userOnline }) =>
  client.get(serverPath + "/check", { id, userOnline });

// 로그아웃
export const logout = ({ id }) => client.post(serverPath + "/logout", { id });
