import React from "react";
import classNames from "classnames/bind";
import styles from "./LoginTemplate.module.scss";
import logo from "../../logo.png";

const cn = classNames.bind(styles);

const LoginTemplate = ({ children }) => {
  return (
    <div className={cn("LoginTemplate")}>
      <div className={cn("WhiteBox")}>
        <div className={cn("logo-area")}>
          <img src={logo} width="100%" alt="logo" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default LoginTemplate;
