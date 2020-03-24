export function email_check(email) {
  const regex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return email !== "" && email !== "undefined" && regex.test(email);
}

export function phoneNum_check(phone) {
  const regex = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g;
  return phone !== "" && phone !== "undefined" && regex.test(phone);
}

export function type_check(type) {
  if (type === "" || type === "undefined" || type.length > 1) {
    return false;
  }

  const regex = /([A-Z]{1})$/;
  return regex.test(type);
}

export function roomNumberCheck(roomNumber) {
  const regex = /([0-9]{3,5})/;
  console.log(roomNumber);
  console.log("ROOMNUMBER", regex.exec(roomNumber));
  return (
    roomNumber !== "" && roomNumber !== "undefined" && regex.test(roomNumber)
  );
}
