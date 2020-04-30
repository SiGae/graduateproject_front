import { createAction, handleActions } from "redux-actions";
import CreateRequestSaga, {
  createRequestActionTypes,
} from "../lib/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as subApi from "../lib/api/subject";
import produce from "immer";

/********************** Action Type *******************/
const INITIALIZATION = "grade/INITIALIZATION";
const CHANGE_INPUT = "grade/CHANGE_INPUT";
const GRADE_MODIFY = "grade/GRADE_MODIFY";
const [
  GET_STUDENTLIST,
  GET_STUDENTLIST_SUCCESS,
  GET_STUDENTLIST_FAILURE,
] = createRequestActionTypes("grade/GET_STUDENTLIST");
const [
  SEND_STUDENTLIST,
  SEND_STUDENTLIST_SUCCESS,
  SEND_STUDENTLIST_FAILURE,
] = createRequestActionTypes("grade/SEND_STUDENTLIST");

/********************** Action Behavior ***************/
export const initialization = createAction(INITIALIZATION);
export const change_input = createAction(CHANGE_INPUT, ({ name, value }) => ({
  name,
  value,
}));
export const get_studentList = createAction(GET_STUDENTLIST, ({ subId }) => ({
  subId,
}));
export const send_studentList = createAction(
  SEND_STUDENTLIST,
  ({ subId, studentList, gradeRatioArr }) => ({
    subId,
    studentList,
    gradeRatioArr,
  })
);
// EVENT
export const grade_modify = createAction(
  GRADE_MODIFY,
  ({ id, value, prevVal }) => ({
    id,
    value,
    prevVal,
  })
);
/********************** Action Saga *******************/
const getStudentListSaga = CreateRequestSaga(GET_STUDENTLIST, subApi.getGrade);
const sendStudentListSaga = CreateRequestSaga(
  SEND_STUDENTLIST,
  subApi.sendGrade
);
/********************** Action Redux ******************/
export function* gradeSaga() {
  yield takeLatest(GET_STUDENTLIST, getStudentListSaga);
  yield takeLatest(SEND_STUDENTLIST, sendStudentListSaga);
}

const initialState = {
  studentList: [],
  gradeRatioArr: ["", "", "", ""],
  fNumber: 0,
  success: [0, 0], // [0] = students [1] = 저장.
  error: null,
};

// f받은 학생 구하기 더할 것인지 뺄 것인지 여부 정함
function checkForNot(value, prevVal) {
  if (value == "F") {
    return 1;
  } else if (prevVal == "F") {
    return -1;
  } else {
    return 0;
  }
}

const grade = handleActions(
  {
    [INITIALIZATION]: (state) => ({ ...initialState }),
    [CHANGE_INPUT]: (state, { payload: { name, value } }) =>
      produce(state, (draft) => {
        draft.gradeRatioArr[name] = value;
      }),
    [GET_STUDENTLIST_SUCCESS]: (state, { payload: { data, success } }) =>
      produce(state, (draft) => {
        draft.studentList = data.studentList;
        draft.gradeRatioArr = data.gradeRatioArr;
        draft.fNumber = data.Fcount;
        draft.success[0] = success;
      }),
    [GET_STUDENTLIST_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.error = error;
      }),
    [SEND_STUDENTLIST_SUCCESS]: (state, { payload: { success } }) =>
      produce(state, (draft) => {
        draft.success[1] = success;
      }),
    [SEND_STUDENTLIST_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.success[1] = error;
      }),
    [GRADE_MODIFY]: (state, { payload: { id, value, prevVal } }) =>
      produce(state, (draft) => {
        console.log("GRADE_MODIFY", value);
        const student = draft.studentList.find((student) => student.id === id);
        student.grade = value;

        draft.fNumber += checkForNot(value, prevVal);
      }),
  },
  initialState
);

export default grade;
