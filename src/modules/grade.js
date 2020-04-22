import { createAction, handleActions } from "redux-actions";
import CreateRequestSaga, {
  createRequestActionTypes,
} from "../lib/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as subApi from "../lib/api/subject";
import produce from "immer";

/********************** Action Type *******************/
const [
  GET_STUDENTLIST,
  GET_STUDENTLIST_SUCCESS,
  GET_STUDENTLIST_FAILURE,
] = createRequestActionTypes("grade/GET_STUDENTLIST");

/********************** Action Behavior ***************/
export const get_studentList = createAction(GET_STUDENTLIST, ({ subId }) => ({
  subId,
}));
/********************** Action Saga *******************/
const getStudentListSaga = CreateRequestSaga(GET_STUDENTLIST, subApi.getGrade);
/********************** Action Redux ******************/
export function* gradeSaga() {
  yield takeLatest(GET_STUDENTLIST, getStudentListSaga);
}

const initialState = {
  studentList: [],
  success: [0, 0], // [0] = students [1] = 저장.
  error: null,
};

const grade = handleActions(
  {
    [GET_STUDENTLIST_SUCCESS]: (state, { payload: { data, success } }) =>
      produce(state, (draft) => {
        draft.studentList = data;
        draft.success[0] = success;
      }),
    [GET_STUDENTLIST_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.error = error;
      }),
  },
  initialState
);

export default grade;
