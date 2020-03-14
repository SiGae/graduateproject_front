export function email_check(email) {
  const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return email !== "" && email !== "undefined" && regex.test(email);
}

export function phoneNum_check(phone) {
  const regex = /^(010)|(011)[0-9]{7,8} $/;
  return phone !== "" && phone !== "undefined" && regex.test(phone);
}
