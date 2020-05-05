import client, { serverPath } from "./client";
import { SHA3 } from "sha3";

const hash = new SHA3(512);
// 로그인
export const login = ({ username, password }) => {
  hash.reset();
  hash.update(password);
  const hPassword = hash.digest("hex");
  return client.post(serverPath + "/login", {
    username,
    password: hPassword,
  });
};
// 회원가입
export const register = ({ username, password, e_mail, phone }) => {
  hash.reset();
  hash.update(password);
  const hPassword = hash.digest("hex");
  return client.post(serverPath + "/register", {
    username,
    password: hPassword,
    e_mail,
    phone,
  });
};

// 로그인 상태 체크
export const check = ({ id, userOnline }) =>
  client.get(serverPath + "/check", { id, userOnline });

// 로그아웃
export const logout = ({ id }) => client.post(serverPath + "/logout", { id });
