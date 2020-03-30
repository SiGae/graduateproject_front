import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_attendance_data, add_data } from "../modules/attend";

const Attendance = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user
  }));
  const { attend } = useSelector(({ attend }) => ({
    attend: attend
  }));

  //console.log("날짜 체크", attend.month, attend.day);
  useEffect(() => {
    let lectureData = null;
    // Login 체크
    if (user.userOnline !== "TRUE") {
      alert("로그아웃 상태입니다.");
      history.push("/");
    } else {
      // 교수와 강의 아이디를 불러온다.
      const data = localStorage.getItem("lecture");
      lectureData = JSON.parse(data);

      // 날짜 데이터 생성
      const date = new Date();
      dispatch(
        add_data({
          month: date.getMonth() + 1,
          day: date.getDate(),
          subName: lectureData.subName
        })
      );
      // 출석 정보를 가져와야 함.
      dispatch(
        get_attendance_data({
          id: lectureData.id,
          subId: lectureData.subId,
          month: date.getMonth() + 1,
          day: date.getDate()
        })
      );
    }
  }, []);

  return (
    <div>
      <div>일단 실험중</div>
    </div>
  );
};

export default React.memo(withRouter(Attendance));
