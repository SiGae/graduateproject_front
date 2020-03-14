import React, { useEffect } from "react";
import axios from "axios";

const test = axios.create();
const objectThree = {
  name: "김민수"
};

const ViewTest = () => {
  useEffect(() => {
    test.post("/login", { objectThree }).then(response => {
      console.log(response);
    });
  }, []);

  /*
  useEffect(() => {
    test.post("http://27.96.131.6:5000/login", objectThree).then(response => {
      console.log(response);
    });
  }, []);
*/
  return (
    <div>
      <p>로딩중</p>
    </div>
  );
};

export default ViewTest;
