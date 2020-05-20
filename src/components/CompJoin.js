import React from "react";
import classNames from "classnames/bind";
import styles from "./compJoin.moudle.scss";
import FormTag from "../utils/form_tag";
import Button from "./common/Button";

const cn = classNames.bind(styles);

const CompJoin = ({ form, onChange, onSubmit }) => {
  return (
    <div className={cn("CompJoin")}>
      <h2 className={cn("CompHead")}>회원가입</h2>
      <form onSubmit={onSubmit}>
        <FormTag onChange={onChange} form={form} />
        <div className={cn("formButton")}>
          <Button>회원가입 요청</Button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(CompJoin);
