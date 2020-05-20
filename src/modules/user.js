import { createAction, handleActions } from "redux-actions";
import { takeLatest, call } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";

// I'm in sign
const TEMP_SET_USER = "user/TEMP_SET_USER";
// LOGOUT
const [LOGOUT] = "user/LOGOUT";

// ACTION function
export const tempSetUser = createAction(TEMP_SET_USER, ({ id, userOnline }) => {
  return {
    id,
    userOnline,
  };
});
export const logout = createAction(LOGOUT, (id) => id);
// GENERATOR
function* logoutSaga(id) {
  cleanLocalStorage();
  yield call(authAPI.logout, id);
}

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
  userOnline: null,
  //checkError: null
};

const user = handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: { id, userOnline } }) => {
      return {
        ...state,
        id,
        userOnline,
      };
    },
    [LOGOUT]: (state) => {
      //console.log("LOGOUT");
      return initialState;
    },
  },
  initialState
);

export default user;
