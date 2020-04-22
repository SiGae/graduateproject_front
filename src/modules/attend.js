import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/saga/createRequestSaga";
import * as attendAPI from "../lib/api/subject";
import produce from "immer";

// ACTION TYPE DEFINITION
const [GET_DATE, GET_DATE_SUCCESS, GET_DATE_FAILURE] = createRequestActionTypes(
  "attend/GET_DATE"
);
const [
  GET_STUDENTS,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAILURE,
] = createRequestActionTypes("attend/GET_ATTENDANCE");
const [
  SUBMIT_ATTEND,
  SUBMIT_ATTEND_SUCCESS,
  SUBMIT_ATTEND_FAILURE,
] = createRequestActionTypes("attend/SUBMIT_ATTEND");
// Add about date
const INITIALIZATION = "attend/INITIALIZATION";
const SET_DATE = "attend/SET_DATE";
const SET_SUBNAME = "attend/SET_SUBNAME";
const TOGGLE = "attend/TOGGLE";
const MOVE_INDEX = "attend/MOVE_INDEX";
//////////////////////////////// ACTION FUNCTION ////////////////////////
/////////////////////////// Interaction with server /////////////////////
// Receive studentList, pastDate
export const initialization = createAction(INITIALIZATION);
export const get_date = createAction(GET_DATE, ({ subId }) => subId);
export const get_students = createAction(
  GET_STUDENTS,
  ({ subId, month, day }) => ({ subId, month, day })
);
// Send studentList status to server
export const submit_attend = createAction(
  SUBMIT_ATTEND,
  ({ month, day, subId, studentList }) => ({ month, day, subId, studentList })
);
////////////////////////////////// local Function ////////////////////////
// set date
export const set_date = createAction(SET_DATE, ({ month, day, subName }) => ({
  month,
  day,
  subName,
}));
// set subject name
export const set_subName = createAction(SET_SUBNAME, ({ subName }) => subName);
// change studenList status.
export const toggle = createAction(TOGGLE, ({ id }) => id);
// move index
export const moveIndex = createAction(MOVE_INDEX, (curIndex) => curIndex);

// SAGA Generate function
const getDateSaga = createRequestSaga(GET_DATE, attendAPI.getCheckDate);
const getStudentSaga = createRequestSaga(
  GET_STUDENTS,
  attendAPI.getStudentList
);
const submitAttendSaga = createRequestSaga(
  SUBMIT_ATTEND,
  attendAPI.submitAttend
);
export function* attendSaga() {
  yield takeLatest(GET_DATE, getDateSaga);
  yield takeLatest(GET_STUDENTS, getStudentSaga);
  yield takeLatest(SUBMIT_ATTEND, submitAttendSaga);
}

const initialState = {
  subName: "",
  studentList: [],
  date: [{ month: "", day: "" }],
  curIndex: 0,
  stdStatus: false,
  success: null, // save
  error: null,
};

function objectListToArray(studentList) {
  let studentArray = [];
  let tempStdData = null;
  for (let i in studentList) {
    tempStdData = studentList[i];
    for (let j in tempStdData) {
      studentArray.push(tempStdData[j]);
    }
  }
  return studentArray;
}

// 문자열 month, day를 객체로 바꾸기
function strDateToObject(date) {
  const objectDate = [];
  for (let val of date) {
    const [month, day] = val.split("/");
    objectDate.push({
      month: month,
      day: day,
    });
  }

  return objectDate;
}

const attend = handleActions(
  {
    [INITIALIZATION]: (state) => initialState,
    [SET_DATE]: (state, { payload: { month, day } }) =>
      produce(state, (draft) => {
        draft["month"] = month;
        draft["day"] = day;
      }),
    [SET_SUBNAME]: (state, { payload: subName }) =>
      produce(state, (draft) => {
        draft.subName = subName;
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const student = draft.studentList.find((student) => student.id === id);
        student.status = (student.status + 1) % 3;
      }),
    [MOVE_INDEX]: (state, { payload: curIndex }) =>
      produce(state, (draft) => {
        draft.curIndex = curIndex;
        draft.stdStatus = true;
      }),
    [GET_DATE_SUCCESS]: (state, { payload: { date } }) =>
      produce(state, (draft) => {
        draft.date = strDateToObject(date);
        draft.curIndex = date.length - 1;
        draft.stdStatus = true;
        draft.error = null;
      }),
    [GET_DATE_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.error = error;
        draft.success = null;
      }),
    [GET_STUDENTS_SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.studentList = objectListToArray(payload);
        draft.stdStatus = false;
        draft["error"] = null;
      }),
    [GET_STUDENTS_FAILURE]: (state, { payload: { error } }) => ({
      ...state,
      success: null,
      error: error,
    }),
    [SUBMIT_ATTEND_SUCCESS]: (state, { payload: { success } }) =>
      produce(state, (draft) => {
        draft.success = success;
        draft.error = null;
      }),
    [SUBMIT_ATTEND_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.success = null;
        draft.error = error;
      }),
  },
  initialState
);

export default attend;
