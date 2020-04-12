import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as subjectAPI from "../lib/api/subject";

const INPUT_CHANGE = "ratio/INPUT_CHANGE";
const [
  GET_RATIO,
  GET_RATIO_SUCCESS,
  GET_RATIO_FAILURE,
] = createRequestActionTypes("ratio/GET_RATIO");
const [
  SEND_RATIO,
  SEND_RATIO_SUCCESS,
  SEND_RATIO_FAILURE,
] = createRequestActionTypes("ratio/SEND_RATIO");

// 평가 주체의 이름과 비율 변경 ratioArr[idx][label]
export const input_change = createAction(
  INPUT_CHANGE,
  ({ idx, label, contents }) => ({
    idx,
    label,
    contents,
  })
);

export const send_ratio = createAction(SEND_RATIO, ({ subId, ratioArr }) => ({
  subId,
  ratioArr,
}));

export const get_ratio = createAction(GET_RATIO, ({ subId }) => ({ subId }));

const submitRatioSaga = createRequestSaga(SEND_RATIO, subjectAPI.submitRatio);
const getRatioSaga = createRequestSaga(GET_RATIO, subjectAPI.getRatio);
export function* ratioSaga() {
  yield takeLatest(SEND_RATIO, submitRatioSaga);
  yield takeLatest(GET_RATIO, getRatioSaga);
}

const initialState = {
  ratioArr: [
    {
      name: "출석",
      ratio: "10%",
    },
    {
      name: "테스트",
      ratio: "20%",
    },
  ],
  // SEND, GET
  success: [null, null],
  error: null,
};

const ratio = handleActions(
  {
    [INPUT_CHANGE]: (state, { payload: { idx, label, contents } }) =>
      produce(state, (draft) => {
        draft.ratioArr[idx][label] = contents;
      }),
    [SEND_RATIO_SUCCESS]: (state, payload) =>
      produce(state, (draft) => {
        draft.success[0] = true;
        draft.error = null;
      }),
    [SEND_RATIO_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.error = error;
        draft.success[0] = false;
      }),
    [GET_RATIO_SUCCESS]: (state, { payload: { ratioArr } }) =>
      produce(state, (draft) => {
        draft.ratioArr = ratioArr;
        draft.success[1] = true;
        draft.error = null;
      }),
    [GET_RATIO_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.error = error;
        draft.success[1] = false;
      }),
  },
  initialState
);

export default ratio;
