import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes
} from "../lib/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as subjectAPI from "../lib/api/subject";

// ACTION TYPE 정의
const CHANGE_INPUT = "subject/CHANGE_INPUT";
const CHOOSE_WEEK = "subject/CHOOSE_WEEK";
const CHANGE_EVALUATION = "subject/CHANGE_EVALUATION";
const GET_FILE = "subject/GET_FILE";
// SAGA ACTION TYPE
const [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAILURE] = createRequestActionTypes(
  "subject/SUBMIT"
);

// ACTION 함수 정의
export const change_input = createAction(CHANGE_INPUT, ({ key, value }) => ({
  key,
  value
}));
export const choose_week = createAction(CHOOSE_WEEK, ({ index, value }) => ({
  index,
  value
}));
export const change_evaluation = createAction(
  CHANGE_EVALUATION,
  ({ value }) => ({
    value
  })
);
export const get_file = createAction(GET_FILE, ({ file }) => ({ file }));
// SAGA ACTION FUNCTION
export const submit = createAction(SUBMIT, subjectInfo => subjectInfo);
// SAGA
const submitSaga = createRequestSaga(SUBMIT, subjectAPI.submitSubject);
export function* subjectSaga() {
  yield takeLatest(SUBMIT, submitSaga);
}
// INITIALSTATE
const initialState = {
  subject: {
    subName: "",
    type: "A",
    memo: "",
    roomNumber: "",
    subWeek: [false, false, false, false, false],
    evaluation: 0,
    file: null
  },
  success: null,
  error: null
};

// REDUCER
const subjectInfo = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft["subject"][key] = value;
      }),
    [CHOOSE_WEEK]: (state, { payload: { index, value } }) =>
      produce(state, draft => {
        draft["subject"]["subWeek"][index] = value;
      }),
    [CHANGE_EVALUATION]: (state, { payload: { value } }) =>
      produce(state, draft => {
        draft["subject"]["evaluation"] = value;
      }),
    [GET_FILE]: (state, { payload: { file } }) =>
      produce(state, draft => {
        draft["subject"]["file"] = file;
      }),
    [SUBMIT_SUCCESS]: (state, { payload: { success } }) =>
      produce(state, draft => {
        draft["success"] = success;
        draft["error"] = null;
      }),
    [SUBMIT_FAILURE]: (state, { payload: { error } }) =>
      produce(state, draft => {
        draft["success"] = null;
        draft["error"] = error;
      })
  },
  initialState
);

export default subjectInfo;
