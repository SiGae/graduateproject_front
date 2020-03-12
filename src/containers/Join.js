import React, { useEffect } from "react";
import { connect } from "react-redux";
import { onChangeInput, sendToServer, initialization } from "../modules/login";
import CompJoin from "../components/CompJoin";

const Join = ({ form, onChangeInput, sendToServer, initialization }) => {
  const onChange = e => {
    const { name, value } = e.target;
    onChangeInput({
      form: "register",
      key: name,
      value
    });
  };

  useEffect(() => {
    initialization("register");
  }, [initialization]);

  return (
    <CompJoin form={form} onChange={onChange} sendToServer={sendToServer} />
  );
};

export default connect(
  ({ clientInfos }) => ({
    form: clientInfos["register"]
  }),
  {
    onChangeInput,
    initialization,
    sendToServer
  }
)(Join);
