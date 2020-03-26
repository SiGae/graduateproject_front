import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../lib/saga/createRequestSaga";
import * as attendAPI from "../lib/api/subject";

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
const getAttendSaga = createRequestSaga(GET_ATTENDANCE, attendAPI.getSubject);
export function* attendSaga() {
  yield takeLatest(GET_ATTENDANCE, getAttendSaga);
}

// initialState
const todayDate = new Date();
const initialState = {
  month: todayDate.getUTCMonth() + 1,
  day: todayDate.getDay(),
  students: [],
  pastDate: [],
  curIndexDate: null,
  success: null,
  error: null
};

const attend = handleActions(
  {
    [GET_ATTENDANCE_SUCCESS]: (state, { payload: { attendData } }) => ({
      attendData,
      success: true,
      error: null
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
