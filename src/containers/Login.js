import React, { useEffect } from "react";
import { connect } from "react-redux";
import { onChangeInput, sendToServer, initialization } from "../modules/login";
import CompLogin from "../components/CompLogin";

const Login = ({ form, onChangeInput, initialization, sendToServer }) => {
  const onChange = e => {
    const { name, value } = e.target;
    onChangeInput({
      form: "login",
      key: name,
      value
    });
  };

  useEffect(() => {
    initialization("login");
  }, [initialization]);

  return (
    <CompLogin form={form} onChange={onChange} sendToServer={sendToServer} />
  );
};

export default connect(
  ({ clientInfos }) => ({
    form: clientInfos["login"]
  }),
  {
    onChangeInput,
    initialization,
    sendToServer
  }
)(Login);
