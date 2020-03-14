import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import clientInfos, { authSaga } from "./login";
import loading from "./loading";
import user, { userSaga } from "./user";

const rootReducer = combineReducers({
  clientInfos,
  loading,
  user
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}
export default rootReducer;
