import React from "react";
import "./form-tag.moudle.scss";

function formTag(
  type, // "text", "password"
  onChange, // Action Listener
  value, // state to change
  name, // input name
  string // text next to input
) {
  return (
    <div className="formTag">
      <div className="formMulti">
        <p>{string} </p>
        <input type={type} onChange={onChange} name={name} value={value} />
      </div>
    </div>
  );
}

export function formID(onChange, { username }) {
  // type, action, value, name, string
  return formTag("text", onChange, username, "username", "ID");
}

export function formPW(onChange, { password }) {
  return formTag("password", onChange, password, "password", "password");
}

export function formPWC(onChange, { passwordConfirm }) {
  return formTag(
    "password",
    onChange,
    passwordConfirm,
    "passwordConfirm",
    "password2"
  );
}

export function formE_mail(onChange, { e_mail }) {
  return formTag("text", onChange, e_mail, "e_mail", "e-mail");
}

export function formPhone(onChange, { phone }) {
  return formTag("text", onChange, phone, "phone", "phone");
}

const FormTag = ({ onChange, form }) => {
  return (
    <div className="Form">
      {formID(onChange, form)}
      {formPW(onChange, form)}
      {formPWC(onChange, form)}
      {formE_mail(onChange, form)}
      {formPhone(onChange, form)}
    </div>
  );
};

export default FormTag;
