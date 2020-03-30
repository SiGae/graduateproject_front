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
// ACTION FUNCTION
export const get_attendance_data = createAction(
  GET_ATTENDANCE,
  ({ id, subId }) => ({
    id,
    subId
  })
);
// SAGA Generate function
const getAttendSaga = createRequestSaga(GET_ATTENDANCE, attendAPI.getDate);
export function* attendSaga() {
  yield takeLatest(GET_ATTENDANCE, getAttendSaga);
}

const initialState = {
  date: [],
  studentList: [],
  curIndexDate: null,
  success: null,
  error: null
};

const attend = handleActions(
  {
    [GET_ATTENDANCE_SUCCESS]: (state, { payload: { date, success } }) =>
      produce(state, draft => {
        draft["date"] = date;
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
