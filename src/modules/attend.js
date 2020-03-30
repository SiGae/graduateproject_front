import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../lib/saga/createRequestSaga";
import * as attendAPI from "../lib/api/subject";
import produce from "immer";

// ACTION TYPE DEFINITION
const [
  GET_ATTENDANCE,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_FAILURE
] = createRequestActionTypes("attend/GET_ATTENDANCE_DATA");
// Add about date
const ADD_DATA = "attend/ADD_DATA";
// ACTION FUNCTION
export const get_attendance_data = createAction(
  GET_ATTENDANCE,

  ({ id, subId, month, day }) => ({
    id,
    subId,
    month,
    day
  })
);
export const add_data = createAction(ADD_DATA, ({ month, day, subName }) => ({
  month,
  day,
  subName
}));
// SAGA Generate function
const getAttendSaga = createRequestSaga(GET_ATTENDANCE, attendAPI.getDate);
export function* attendSaga() {
  yield takeLatest(GET_ATTENDANCE, getAttendSaga);
}

const initialState = {
  month: "",
  day: "",
  subName: "",
  pastDate: [],
  studentList: [],
  curIndex: 0,
  success: null,
  error: null
};

const attend = handleActions(
  {
    [ADD_DATA]: (state, { payload: { month, day, subName } }) =>
      produce(state, draft => {
        draft["month"] = month;
        draft["day"] = day;
        draft["subName"] = subName;
      }),
    [GET_ATTENDANCE_SUCCESS]: (
      state,
      { payload: { pastDate, studentList, success } }
    ) =>
      produce(state, draft => {
        draft["pastDate"] = pastDate;
        draft["studentList"] = studentList;
        draft["success"] = success;
        draft["error"] = null;
      }),
    [GET_ATTENDANCE_FAILURE]: (state, { payload: { error } }) => ({
      ...state,
      success: null,
      error: error
    })
  },
  initialState
);

export default attend;
