import React, { useEffect } from "react";
import { connect } from "react-redux";
import { onChangeInput, initialization, login } from "../modules/login";
import CompLogin from "../components/CompLogin";
import { check, tempSetUser } from "../modules/user";
import { withRouter } from "react-router-dom";

const Login = ({
  // state
  form,
  auth,
  authError,
  userOnline,
  history,
  // action
  onChangeInput,
  initialization,
  login,
  check,
  tempSetUser
}) => {
  const onChange = e => {
    const { name, value } = e.target;
    onChangeInput({
      form: "login",
      key: name,
      value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("로그인 submit호출");
    const { username, password } = form;
    login({ username, password });
    //history.push("/RegisterPage");
  };

  // 제일 처음 떴을 때 로그인 값이 초기화 되어야 함.
  useEffect(() => {
    initialization("login");
  }, [initialization]);

  // 로그인 시 성공, 실패 처리
  useEffect(() => {
    const { username, auth } = form;
    if (authError) {
      console.log("오류발생");
      console.log(authError);
      return;
    }
    if (auth) {
      const userOnline = auth;
      console.log("로그인 성공");
      tempSetUser(username, auth);
      check({ username, userOnline });
    }
  }, [auth, authError, check, tempSetUser, form]);

  // 로그인 상태 유지 처리
  useEffect(() => {
    const userInfo = {
      id: form.username,
      userOnline: userOnline
    };
    if (userInfo.id !== "" && userOnline) {
      history.push("/main");
      try {
        localStorage.setItem("user", JSON.stringify(userInfo));
      } catch (e) {
        console.log("local Storage is not working");
      }
    }
  });
  return <CompLogin form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default connect(
  ({ clientInfos, user }) => ({
    form: clientInfos["login"],
    auth: clientInfos["auth"],
    authError: clientInfos["authError"],
    userOnline: user["userOnline"]
  }),
  {
    onChangeInput,
    initialization,
    login,
    check,
    tempSetUser
  }
)(withRouter(Login));
