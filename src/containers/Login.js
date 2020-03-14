import React, { useEffect } from "react";
import { connect } from "react-redux";
import { onChangeInput, initialization, login } from "../modules/login";
import CompLogin from "../components/CompLogin";
import { check } from "../lib/api/auth";
import { withRouter } from "react-router-dom";

const Login = ({
  // state
  form,
  auth,
  authError,
  user,
  history,
  // action
  onChangeInput,
  initialization,
  login,
  check
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
    console.log(login);
    const { username, password } = form;
    login({ username, password });
    //history.push("/RegisterPage");
  };

  useEffect(() => {
    initialization("login");
  }, [initialization]);

  useEffect(() => {
    if (authError) {
      console.log("오류발생");
      console.log(authError);
      return;
    }

    if (auth) {
      console.log("로그인 성공");
      check();
    }
  }, [auth, authError, check]);

  return <CompLogin form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default connect(
  ({ clientInfos, user }) => ({
    form: clientInfos["login"],
    auth: clientInfos["auth"],
    authError: clientInfos["authError"],
    user: user["user"]
  }),
  {
    onChangeInput,
    initialization,
    login,
    check
  }
)(withRouter(Login));
