import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { type_check, roomNumberCheck } from "../lib/utils/util";
import {
  initialization,
  change_input,
  choose_week,
  change_evaluation,
  get_file,
  submit,
} from "../modules/subject";
import CompCreateSubject from "../components/CompCreateSubject";

const CreateSubject = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user,
  }));
  const { subject, success } = useSelector(({ subjectInfo }) => subjectInfo);

  useEffect(() => {
    dispatch(initialization());
  }, [dispatch]);
  useEffect(() => {
    if (user.userOnline !== "TRUE") {
      alert("로그인 상태가 아닙니다.");
      history.push("/");
    }
  }, [history, user]);

  useEffect(() => {
    if (success === true) {
      history.push("/main/menu");
      dispatch(initialization());
    }
  }, [dispatch, history, success]);

  // 월화수목금 선택
  const onClickSubWeek = useCallback(
    (index) => {
      const subWeek = subject.subWeek;

      // true => false, false => true
      subWeek[index] === true
        ? dispatch(
            choose_week({
              index: index,
              value: false,
            })
          )
        : dispatch(
            choose_week({
              index: index,
              value: true,
            })
          );
    },
    [dispatch, subject.subWeek]
  );
  // 상대평가, 절대평가 선택
  const onClickAbsolute = useCallback(() => {
    const evaluation = subject.evaluation;
    // 상태가 1이면 0으로 바꾼다.
    if (evaluation === 1) {
      dispatch(
        change_evaluation({
          value: 0,
        })
      );
    }
    // 상태가 0이면 아무 행동 안함.
  }, [dispatch, subject.evaluation]);

  const onClickRelative = useCallback(() => {
    const evaluation = subject.evaluation;
    // 상태가 0이면 1으로 바꾼다.
    if (evaluation === 0) {
      dispatch(
        change_evaluation({
          value: 1,
        })
      );
    }
    // 상태가 1이면 0으로 바꾼다.
  }, [dispatch, subject.evaluation]);
  // input text타입 태그에 쓰임.

  const onChange = useCallback(
    (e) => {
      // 인풋 내용대로 상태 변화
      const data = {
        key: e.target.name,
        value: e.target.value,
      };
      if (data.key !== "type" || data.value === "") {
        dispatch(change_input(data));
        return;
      }

      if (type_check(data.value)) {
        dispatch(change_input(data));
      }
    },
    [dispatch]
  );

  // file 선택
  const onChangeFile = useCallback(
    (e) => {
      dispatch(
        get_file({
          file: e.target.files[0],
        })
      );
    },
    [dispatch]
  );
  // 제출
  const onSubmit = useCallback(() => {
    const { subName, type, roomNumber, subWeek, file } = subject;

    if (subName.length < 2) {
      alert("강의명은 2자 이상으로 입력해주세요.");
      return;
    }

    if (!type_check(type)) {
      alert("A-Z 중에서 한 글자만 입력해주세요");
      return;
    }

    if (!roomNumberCheck(roomNumber)) {
      alert("3-5자 숫자로 입력해주세요");
      return;
    }

    let subWeekCheck = 0;
    for (let i in subWeek) {
      if (subWeek[i] === true) subWeekCheck = 1;
    }
    if (subWeekCheck === 0) {
      alert("강의 요일을 최소 하나 선택해주세요");
      return;
    }
    if (file == null) {
      alert("파일 선택해주세요");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("file", subject.file);
    formData.append("subName", subject.subName);
    formData.append("type", subject.type);
    formData.append("memo", subject.memo);
    formData.append("roomNumber", subject.roomNumber);
    formData.append("subWeek", subject.subWeek);
    formData.append("evaluation", subject.evaluation);

    dispatch(submit(formData));
  }, [dispatch, subject, user.id]);

  return (
    <CompCreateSubject
      id={user.id}
      subject={subject}
      onClickSubWeek={onClickSubWeek}
      onClickAbsolute={onClickAbsolute}
      onClickRelative={onClickRelative}
      onChange={onChange}
      onChangeFile={onChangeFile}
      onSubmit={onSubmit}
    ></CompCreateSubject>
  );
};

export default withRouter(CreateSubject);

/**
 * const test = {
      subName: subject.subName,
      type: subject.type,
      memo: subject.memo,
      roomNumber: subject.roomNumber,
      subWeek: subject.subWeek,
      evaluation: subject.evaluation
    };
 */
