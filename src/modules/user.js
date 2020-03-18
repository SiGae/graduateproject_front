/**
 *  1. 로그인 상태 확인 기능.
 *    - user 데이터에 (true, false) 값 설정 할 수 있다
 *  2. 서버로 부터 로그인이 되어있는 상태인지 Check 하는 기능
 *    - 로그인 상태이다. -> true
 *    - 아니다 -> false
 */
import { createAction, handleActions } from "redux-actions";
import { takeLatest, call } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";
import createRequestSaga, {
  createRequestActionTypes
} from "../lib/saga/createRequestSaga";

const TEMP_SET_USER = "user/TEMP_SET_USER";
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  "user/CHECK"
);
// LOGOUT
const LOGOUT = "user/LOGOUT";

// ACTION function
export const tempSetUser = createAction(TEMP_SET_USER, ({ id, userOnline }) => {
  return {
    id,
    userOnline
  };
});
export const check = createAction(CHECK, ({ id, userOnline }) => ({
  id,
  userOnline
}));
export const logout = createAction(LOGOUT);

function checkFailureSaga() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("로컬 데이터 저장소 에러");
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
}
// saga
const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  id: null,
  userOnline: null,
  checkError: null,
  call: null
};

const user = handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: { id, userOnline } }) => ({
      ...state,
      id,
      userOnline
    }),
    [CHECK_SUCCESS]: (state, { payload: userOnline }) => {
      return {
        ...state,
        userOnline,
        checkError: null,
        call: true
      };
    },
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error
    }),
    [LOGOUT]: state => ({
      ...state,
      id: null,
      userOnline: null
    })
  },
  initialState
);

export default user;
