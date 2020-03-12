import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// Action Type 정의
const CHANGE_INPUT = "login/CHANGE_INPUT";
const LOGIN = "login/LOGIN";
const INITIALIZATION = "login/INITIALIZATION";

// 액션 함수

// 모든 인풋 tag에 대응해서 값이 바뀌게하는 함수.
export const onChangeInput = createAction(
  CHANGE_INPUT,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);

// 초기 렌더링
export const initialization = createAction(INITIALIZATION, form => form);
// 로그인 버튼 클릭시 서버로 보내는 액션이 발생 하게 하는 함수.
export const sendToServer = createAction(LOGIN, form => form);

const initialState = {
  register: {
    username: "", // ID
    password: "", // Password
    passwordConfirm: "", // Password confirm
    e_mail: "", // e-mail
    phone: "" // phone number
  },
  login: {
    username: "",
    password: ""
  }
};

// 리듀서
const clientInfos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [INITIALIZATION]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form]
    }),
    [LOGIN]: (state, { payload: form }) => {
      console.log("상태", state);
      console.log("액션", form);
      console.log("서버로 보내는 코드 작성좀");
      return {
        ...state,
        [form]: initialState[form]
      };
    }
  },
  initialState
);

export default clientInfos;
