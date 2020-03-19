import React, { useEffect } from "react";
import { connect } from "react-redux";
import { onChangeInput, initialization, login } from "../modules/login";
import CompLogin from "../components/CompLogin";
import { withRouter } from "react-router-dom";
import { tempSetUser } from "../modules/user";

const Login = ({
  // state
  form,
  auth,
  authError,
  history,
  userOnline,
  // action
  onChangeInput,
  initialization,
  login,
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
  };

  // 제일 처음 떴을 때 로그인 값이 초기화 되어야 함.
  useEffect(() => {
    initialization("login");
  }, [initialization]);

  // 로그인 시 성공, 실패 처리
  useEffect(() => {
    if (authError) {
      console.log("오류발생");
      console.log(authError);
      return;
    }

    if (auth === "TRUE") {
      console.log("로그인성공");
      const id = form.username;
      const userOnline = auth;

      initialization("login");
      initialization("auth");
      tempSetUser({ id, userOnline });
      try {
        localStorage.setItem("user", JSON.stringify({ id, userOnline }));
      } catch (e) {
        console.log("local Storage is not working");
      }
    }
  }, [auth, authError, form, history, tempSetUser, initialization]);
  useEffect(() => {
    if (userOnline === "TRUE") {
      history.push("/main/menu");
    }
  });
  return <CompLogin form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default connect(
  ({ clientInfos, user }) => ({
    form: clientInfos["login"],
    auth: clientInfos["auth"],
    authError: clientInfos["authError"],
    userOnline: user.userOnline
  }),
  {
    onChangeInput,
    initialization,
    login,
    tempSetUser
  }
)(withRouter(Login));

/**
 * useEffect(() => {
    if (userOnline) {
      console.log(userOnline);
    }
    if (auth && userOnline && id && call) {
    
    }
  }, [userOnline, history, id, call]);
 */

//check({ id, userOnline });
