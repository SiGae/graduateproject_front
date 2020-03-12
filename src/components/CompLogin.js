import React from "react";
import { Link } from "react-router-dom";
import { formID, formPW } from "../utils/form_tag";
import classNames from "classnames/bind";
import styles from "./compLogin.module.scss";

const cn = classNames.bind(styles);
const CompLogin = ({ form, onChange, sendToServer }) => {
  return (
    <div className={cn("Login")}>
      <div className={cn("form")}>
        {formID(onChange, form)}
        {formPW(onChange, form)}
      </div>
      <div className={cn("LoginButton")}>
        <p onClick={() => sendToServer("login")}> 로그인 </p>
      </div>
      <div className={cn("Information")}>
        <div className={cn("Join")}>
          <Link to="/RegisterPage">회원가입</Link>
        </div>
        <div className={cn("Find")}>
          <p>ID</p>
          <p>,</p>
          <p>PW찾기</p>
        </div>
      </div>
    </div>
  );
};

export default CompLogin;
//<FormTag onChangeInput={onChangeInput} clientInfos={clientInfos} />
