import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import clientInfos, { authSaga } from "./login";
import loading from "./loading";
import user, { userSaga } from "./user";
import professor, { professorSaga } from "./professor";
import subjectInfo, { subjectSaga } from "./subject";
import attend, { attendSaga } from "./attend";

const rootReducer = combineReducers({
  clientInfos,
  loading,
  user,
  professor,
  subjectInfo,
  attend
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    professorSaga(),
    subjectSaga(),
    attendSaga()
  ]);
}
export default rootReducer;
