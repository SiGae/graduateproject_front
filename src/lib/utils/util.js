export function email_check(email) {
  const regex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return email !== "" && email !== "undefined" && regex.test(email);
}

export function phoneNum_check(phone) {
  const regex = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g;
  return phone !== "" && phone !== "undefined" && regex.test(phone);
}

// 분반
export function type_check(type) {
  if (type === "" || type === "undefined" || type.length > 1) {
    return false;
  }

  const regex = /([A-Z]{1})$/;
  return regex.test(type);
}

// 강의실
export function roomNumberCheck(roomNumber) {
  const regex = /([0-9]{3,5})/;

  return (
    roomNumber !== "" && roomNumber !== "undefined" && regex.test(roomNumber)
  );
}

// 숫자만
export function onlyForNumber(data) {
  const regex = /[^0-9]{1,3}/g;

  return data !== "" && data !== "undefined" && regex.test(data);
}
