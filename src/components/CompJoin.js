import React from "react";
import classNames from "classnames/bind";
import styles from "./compJoin.moudle.scss";
import FormTag from "../utils/form_tag";

const cn = classNames.bind(styles);

const CompJoin = ({ form, onChange, sendToServer }) => {
  return (
    <div className={cn("CompJoin")}>
      <h2 className={cn("CompHead")}>회원가입</h2>
      <div className={cn("form")}>
        <FormTag onChange={onChange} form={form} />
      </div>
      <div
        className={cn("CompRequest")}
        onClick={() => sendToServer("register")}
      >
        회원가입 요청
      </div>
    </div>
  );
};

export default CompJoin;
