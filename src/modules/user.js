import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";
import createRequestSaga, {
  createRequestActionTypes
} from "../lib/saga/createRequestSaga";

// I'm in sign
const TEMP_SET_USER = "user/TEMP_SET_USER";
// LOGOUT
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes(
  "user/LOGOUT"
);

// ACTION function
export const tempSetUser = createAction(TEMP_SET_USER, ({ id, userOnline }) => {
  return {
    id,
    userOnline
  };
});
export const logout = createAction(LOGOUT, id => id);
// GENERATOR
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout);

function cleanLocalStorage() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  id: null,
  userOnline: null
  //checkError: null
};

const user = handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: { id, userOnline } }) => ({
      ...state,
      id,
      userOnline
    }),
    [LOGOUT_SUCCESS]: state => {
      cleanLocalStorage();
      return initialState;
    },
    [LOGOUT_FAILURE]: (state, { payload: { error } }) => ({
      ...state,
      error: error
    })
  },
  initialState
);

export default user;

/*

 *  1. 로그인 상태 확인 기능.
 *    - user 데이터에 (true, false) 값 설정 할 수 있다
 *  2. 서버로 부터 로그인이 되어있는 상태인지 Check 하는 기능
 *    - 로그인 상태이다. -> true
 *    - 아니다 -> false
 *
  

  // ACTION
  // 회원 정보 확인
  const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    "user/CHECK"
  );

   // ACTION DEFINITION
  
  export const check = createAction(CHECK, ({ id, userOnline }) => ({
    id,
    userOnline
  }));
 
  
function checkFailureSaga() {
  try {
    console.log("삭제중...");
    localStorage.removeItem("user");
    console.log("삭제완료");
  } catch (e) {
    console.log("로컬 데이터 저장소 에러");
  }
}
  

  // saga
  const checkSaga = createRequestSaga(CHECK, authAPI.check);
  // IN SAGA
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  
  // For reducer
  [CHECK_SUCCESS]: (state, { payload: userOnline }) => {
      return {
        ...state,
        userOnline,
        checkError: null
      };
    },
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error
    }),
    
 */
