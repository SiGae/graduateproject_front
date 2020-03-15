/**
 *  1. 로그인 상태 확인 기능.
 *    - user 데이터에 (true, false) 값 설정 할 수 있다
 *  2. 서버로 부터 로그인이 되어있는 상태인지 Check 하는 기능
 *    - 로그인 상태이다. -> true
 *    - 아니다 -> false
 */

import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";
import createRequestSaga, {
  createRequestActionTypes
} from "../lib/saga/createRequestSaga";

const TEMP_SET_USER = "user/TEMP_SET_USER";
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  "user/CHECK"
);

// ACTION function
export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);

function checkFailureSaga() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("로컬 데이터 저장소 에러");
  }
}
// saga
const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
}

const initialState = {
  user: null,
  checkError: null
};

const user = handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error
    })
  },
  initialState
);

export default user;
