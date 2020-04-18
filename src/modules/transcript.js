import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as subjectAPI from "../lib/api/subject";
import { produce } from "immer";

/*********************** TYPE ***********************/
const INITIALIZATION = "transcript/SCORE_INITIALIZATION";
const STUDENT_SCORE_INPUT = "transcript/STUDENT_SCORE_INPUT";
const SET_STUDENTLIST = "transcript/SET_STUDENTLIST";
const PERFECT_SCORE_INPUT = "transcript/PERFECT_SCORE_CHANGE";

const [
  GET_TRANSCRIPT,
  GET_TRANSCRIPT_SUCCESS,
  GET_TRANSCRIPT_FAILURE,
] = createRequestActionTypes("transcript/GET_SCORE");

const [
  SEND_TRANSCRIPT,
  SEND_TRANSCRIPT_SUCCESS,
  SEND_TRANSCRIPT_FAILURE,
] = createRequestActionTypes("transcript/SEND_TRANSCRIPT");

/********************** ACTION **********************/
export const initialization = createAction(INITIALIZATION);
export const student_score_input = createAction(
  STUDENT_SCORE_INPUT,
  ({ stdIdx, name, value }) => ({ stdIdx, name, value })
);
export const perfect_score_input = createAction(
  PERFECT_SCORE_INPUT,
  ({ name, value }) => ({ name, value })
);
export const set_studentList = createAction(
  SET_STUDENTLIST,
  ({ studentList, maxLabelLength }) => ({ studentList, maxLabelLength })
);
export const get_transcript = createAction(GET_TRANSCRIPT, ({ subId }) => ({
  subId,
}));
export const send_transcript = createAction(
  SEND_TRANSCRIPT,
  ({ subId, transcript }) => ({
    subId,
    studentList: transcript.studentList,
    perfectScore: transcript.perfectScore,
  })
);

/************************** SAGA *********************/
const getTranscriptSaga = createRequestSaga(
  GET_TRANSCRIPT,
  subjectAPI.getScore
);
const sendTranscriptSaga = createRequestSaga(
  SEND_TRANSCRIPT,
  subjectAPI.SendScore
);
export function* transcriptSaga() {
  yield takeLatest(GET_TRANSCRIPT, getTranscriptSaga);
  yield takeLatest(SEND_TRANSCRIPT, sendTranscriptSaga);
}

/************************* INIT **********************/
const initialState = {
  studentList: [],
  perfectScore: [],
  success: [null, null], // 0 = getStudentList, 1 = submit
  error: null,
};

function inputArr(maxLabelLength) {
  const stringArr = [];
  for (let i = 0; i < maxLabelLength; i++) {
    stringArr.push("");
  }
  return stringArr;
}

function newLabel(studentList, stringArr) {
  const newStudentList = [];

  for (let i in studentList) {
    const newLabel = JSON.parse(JSON.stringify(stringArr));
    newStudentList.push({
      id: studentList[i].id,
      name: studentList[i].name,
      label: newLabel,
    });
  }

  return newStudentList;
}

/********************** REDUCER **********************/
const transcript = handleActions(
  {
    [INITIALIZATION]: () => initialState,
    [STUDENT_SCORE_INPUT]: (state, { payload: { stdIdx, name, value } }) =>
      produce(state, (draft) => {
        console.log("STUDENT_SCORE_INPUT", stdIdx, name, value);
        draft.studentList[stdIdx].label[name] = value;
      }),
    [PERFECT_SCORE_INPUT]: (state, { payload: { name, value } }) =>
      produce(state, (draft) => {
        draft.perfectScore[name] = value;
      }),

    [GET_TRANSCRIPT_SUCCESS]: (state, { payload: { data, score } }) =>
      produce(state, (draft) => {
        console.log("GET_TRANSCRIPT : ", data);
        draft.studentList = data.studentList;
        draft.perfectScore = data.perfectScore;
        draft.success[0] = score;
      }),
    [GET_TRANSCRIPT_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.error = error;
      }),
    [SEND_TRANSCRIPT_SUCCESS]: (state, { payload: { success } }) =>
      produce(state, (draft) => {
        draft.success[1] = success;
      }),
    [SEND_TRANSCRIPT_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.success[1] = null;
        draft.error = error;
      }),
    [SET_STUDENTLIST]: (state, { payload: { studentList, maxLabelLength } }) =>
      produce(state, (draft) => {
        const newArr = inputArr(maxLabelLength);
        draft.studentList = newLabel(studentList, newArr);
        draft.perfectScore = newArr;
      }),
  },
  initialState
);

export default transcript;

/**
 *    [GET_TRANSCRIPT]: (state) =>
      produce(state, (draft) => {
        draft.success[0] = false;
      }),
 */
