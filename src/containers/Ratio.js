import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  send_ratio,
  get_ratio,
  input_change,
  add_data,
  remove_ratio,
  initialization,
} from "../modules/ratio";
import CompRatio from "../components/manage/CompRatio";
import { onlyForNumber } from "../lib/utils/util";

const Ratio = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user }));
  const { ratio } = useSelector(({ ratio }) => ({
    ratio: ratio,
  }));
  const [lecture, setLecture] = useState("");

  useEffect(() => {
    dispatch(initialization());
  }, [dispatch]);

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 비율 들고오기
  useEffect(() => {
    if (lecture === "") {
      return;
    }

    if (ratio.success[0] === true) {
      history.push("/main/manageStudent");
    }

    // 비율 들고오기 (과목 ID)
    if (ratio.success[1] == null) {
      dispatch(get_ratio({ subId: lecture.subId }));
    }
  }, [dispatch, ratio, lecture, history]);

  // + 버튼 누를 시
  const onAddData = () => {
    dispatch(add_data());
  };

  // text field 입력 시
  const onChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "ratio") {
      if (value.length > 3 || onlyForNumber(value)) {
        return;
      }
    }

    dispatch(input_change({ idx: index, label: name, contents: value }));
  };

  // 리스트 더블 클릭 시
  const onDoubleClick = (idx) => {
    dispatch(remove_ratio({ idx }));
  };

  // 설정 버튼 클릭 시
  const onSendData = () => {
    let checkName = true;
    let sum = 0;
    for (let dataIdx in ratio.ratioArr) {
      const ratioVal = ratio.ratioArr[dataIdx].ratio;
      if (ratio.ratioArr[dataIdx].name === "") {
        checkName = false;
      }
      sum += Number(ratioVal);
    }

    console.log("합계 : ", sum);
    if (sum !== 100 || sum > 100) {
      alert("비율을 100%으로 맞춰주십시오.");
      return;
    }

    if (checkName === false) {
      alert("설정되지 않은 이름이 있습니다.");
      return;
    }

    dispatch(
      send_ratio({
        subId: lecture.subId,
        ratioArr: ratio.ratioArr,
      })
    );
  };

  return (
    <div>
      <CompRatio
        ratioArr={ratio.ratioArr}
        onChange={onChange}
        onAddData={onAddData}
        onSendData={onSendData}
        onDoubleClick={onDoubleClick}
      ></CompRatio>
    </div>
  );
};

export default React.memo(withRouter(Ratio));
