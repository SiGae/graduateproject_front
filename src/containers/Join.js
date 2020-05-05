import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  onChangeInput,
  initialization,
  register,
  auth_init,
} from "../modules/login";
import CompJoin from "../components/CompJoin";
import { email_check, phoneNum_check } from "../lib/utils/util";
import { withRouter } from "react-router-dom";

const Join = ({
  // State
  form,
  auth,
  authError,
  user,
  // Browser History
  history,
  // Action
  onChangeInput,
  initialization,
  register,
  check,
  auth_init,
}) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({
      form: "register",
      key: name,
      value,
    });
  };

  const onSubmit = (e) => {
    console.log("작동확인");
    e.preventDefault();
    const { username, password, passwordConfirm, e_mail, phone } = form;

    if (password.length <= 2 || password !== passwordConfirm) {
      alert("비밀번호를 확인해주시기 바랍니다.");
      return;
    }

    if (!email_check(e_mail)) {
      alert("정상적인 이메일이 아닙니다.");
      return;
    }

    if (!phoneNum_check(phone)) {
      alert("정상적인 번호를 입력하세요");
      return;
    }

    register({ username, password, e_mail, phone });
  };

  useEffect(() => {
    initialization("register");
  }, [initialization]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
      return;
    }
    if (auth === "true") {
      initialization("auth");
      console.log("회원가입 성공");
      console.log(auth);
      history.push("/");
    }

    if (auth === "false") {
      alert("아이디가 중복");
      auth_init();
    }
  }, [auth, authError, history, initialization, auth_init]);

  return <CompJoin form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default connect(
  ({ clientInfos, user }) => ({
    form: clientInfos["register"],
    auth: clientInfos["auth"],
    authError: clientInfos["authError"],
    user: user["user"],
  }),
  {
    onChangeInput,
    initialization,
    register,
    auth_init,
  }
)(withRouter(Join));
