import React from "react";
import { Link } from "react-router-dom";
import { formID, formPW } from "../utils/form_tag";
import Button from "./common/Button";
import classNames from "classnames/bind";
import styles from "./compLogin.module.scss";

const cn = classNames.bind(styles);
const CompLogin = ({ form, onChange, onSubmit }) => {
  return (
    <div className={cn("Login")}>
      <form onSubmit={onSubmit}>
        <div className={cn("form")}>
          {formID(onChange, form)}
          {formPW(onChange, form)}
        </div>
        <div className={cn("LoginButton")}>
          <Button>로그인</Button>
        </div>
      </form>
      <div className={cn("Information")}>
        <div className={cn("Join")}>
          <Link to="/RegisterPage" className={cn("babo")}>
            회원가입
          </Link>
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
