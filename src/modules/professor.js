import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes
} from "../lib/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as profAPI from "../lib/api/professor";
import produce from "immer";

// ACTION TYPE 정의
const [
  GET_PROFESSOR,
  GET_PROFESSOR_SUCCESS,
  GET_PROFESSOR_FAILURE
] = createRequestActionTypes("professor/GET_PROFESSOR");

// ACTION FUNCTION 정의 객체 던지기
export const get_professor = createAction(GET_PROFESSOR);
// GENERATOR FUNCTION
const getProfessorSaga = createRequestSaga(GET_PROFESSOR, profAPI.professor);
// SAGA
export function* professorSaga() {
  yield takeLatest(GET_PROFESSOR, getProfessorSaga);
}
// INITIAL STATE
const initialState = {
  subjectList: [],
  studentList: [],
  department: "",
  success: null,
  error: null
};

function objectToArray(subjectList) {
  let arrSubjectList = [];
  for (let idx in subjectList) {
    const temp = arrSubjectList.concat(subjectList[idx]);
    arrSubjectList = temp;
  }
  return arrSubjectList;
}
const professor = handleActions(
  {
    [GET_PROFESSOR_SUCCESS]: (
      state,
      { payload: { subjectList, department, success } }
    ) =>
      produce(state, draft => {
        draft["subjectList"] = objectToArray(subjectList);
        draft["department"] = department;
        draft["success"] = success;
      }),
    [GET_PROFESSOR_FAILURE]: (state, { payload: { error } }) => ({
      ...initialState,
      error: error
    })
  },
  initialState
);

export default professor;

/**
 * subjectList : {
 *  id
 *  name
 * }
 */
