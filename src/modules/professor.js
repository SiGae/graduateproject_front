import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes
} from "../lib/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as profAPI from "../lib/api/professor";

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
  subjectList: {
    name: null,
    subId: null
  },
  studentList: [],
  department: null,
  success: null,
  error: null
};

const professor = handleActions(
  {
    [GET_PROFESSOR_SUCCESS]: (
      state,
      { payload: { subjectList, department } }
    ) => ({
      ...state,
      subjectList,
      department,
      success: true,
      error: null
    }),
    [GET_PROFESSOR_FAILURE]: (state, { payload: { error } }) => ({
      ...initialState,
      error: error,
      success: null
    })
  },
  initialState
);

export default professor;
