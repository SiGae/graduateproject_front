import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import clientInfos, { authSaga } from "./login";
import loading from "./loading";
import user, { userSaga } from "./user";
import professor, { professorSaga } from "./professor";

const rootReducer = combineReducers({
  clientInfos,
  loading,
  user,
  professor
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), professorSaga()]);
}
export default rootReducer;
