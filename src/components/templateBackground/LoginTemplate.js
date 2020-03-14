import React from "react";
import classNames from "classnames/bind";
import styles from "./LoginTemplate.module.scss";

const cn = classNames.bind(styles);

const LoginTemplate = ({ children }) => {
  return (
    <div className={cn("LoginTemplate")}>
      <div className={cn("WhiteBox")}>
        <div className={cn("logo-area")}>LOGO</div>
        {children}
      </div>
    </div>
  );
};

export default LoginTemplate;
