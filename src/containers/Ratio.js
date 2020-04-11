import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { sendRatio, getRatio } from "../modules/ratio";

const Ratio = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user
  }));
  const [lecture, setLecture] = useState("");

  // Login 검증
  useEffect(() => {
    // 로그인 여부
    if (user.userOnline !== "TRUE") {
      alert("로그아웃 상태입니다.");
      history.push("/");
    } else {
      // 로그인 시 id, subId를 불러온다.
      const localLecture = JSON.parse(localStorage.getItem("lecture"));
      setLecture(localLecture);

      console.log("Ratio");
    }
  }, [user, dispatch, history]);

  // 비율 들고오기
  useEffect(() => {
    if (lecture === "") {
      return;
    }

    // 비율 들고오기 (과목 ID)
    //getRatio(lecture.subId);
  });
  // + 버튼 누를 시
  return (
    <div>
      <div>실험 중..</div>
    </div>
  );
};

export default withRouter(Ratio);
