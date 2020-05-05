import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";

// Action Type 정의
const CHANGE_INPUT = "login/CHANGE_INPUT";
const INITIALIZATION = "login/INITIALIZATION";
const AUTH_INIT = "login/AUTH_INIT";
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  "login/REGISTER"
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  "login/LOGIN"
);
// LOGOUT
const LOGOUT = "user/LOGOUT";

// 액션 함수
// 모든 인풋 tag에 대응해서 값이 바뀌게하는 함수.
export const onChangeInput = createAction(
  CHANGE_INPUT,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);
export const auth_init = createAction(AUTH_INIT);
// 초기 렌더링
export const initialization = createAction(INITIALIZATION, (form) => form);

export const register = createAction(
  REGISTER,
  ({ username, password, e_mail, phone }) => ({
    username,
    password,
    e_mail,
    phone,
  })
);
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));
export const logout = createAction(LOGOUT);

function logInFailureSaga() {
  try {
    console.log("삭제중...");
    localStorage.removeItem("user");
    console.log("삭제완료");
  } catch (e) {
    console.log("로컬 데이터 저장소 에러");
  }
}

// Generator 작성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGIN_FAILURE, logInFailureSaga);
}

const initialState = {
  register: {
    username: "", // ID
    password: "", // Password
    passwordConfirm: "", // Password confirm
    e_mail: "", // e-mail
    phone: "", // phone number
  },
  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
};

// 리듀서
const clientInfos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZATION]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [AUTH_INIT]: (state) => ({
      ...state,
      auth: null,
    }),
    // 회원가입
    [REGISTER_SUCCESS]: (state, { payload: { auth } }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: { error } }) => ({
      ...state,
      authError: error,
    }),
    // 로그인
    [LOGIN_SUCCESS]: (state, { payload: { auth } }) => {
      console.log("LOGIN_SUCCESS", auth);
      return {
        ...state,
        authError: null,
        auth,
      };
    },
    [LOGIN_FAILURE]: (state, { payload: { error } }) => ({
      ...state,
      authError: error,
    }),
  },

  initialState
);

export default clientInfos;
