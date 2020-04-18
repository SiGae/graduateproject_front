import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as subjectAPI from "../lib/api/subject";

const INITIALIZATION = "ratio/INITIALIZATION";
const INPUT_CHANGE = "ratio/INPUT_CHANGE";
const ADD_DATA = "ratio/ADD_DATA";
const REMOVE_RATIO = "ratio/REMOVE_RATIO";
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

// 초기화
export const initialization = createAction(INITIALIZATION);
// 데이터 추가
export const add_data = createAction(ADD_DATA);
// 데이터 삭제
export const remove_ratio = createAction(REMOVE_RATIO, ({ idx }) => ({
  idx,
}));
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
  ratioArr: [],
  ratioCheck: false,
  // SEND, GET
  success: [null, null],
  error: null,
};

const ratio = handleActions(
  {
    [INITIALIZATION]: () => initialState,
    [INPUT_CHANGE]: (state, { payload: { idx, label, contents } }) =>
      produce(state, (draft) => {
        draft.ratioArr[idx][label] = contents;
      }),
    [ADD_DATA]: (state) =>
      produce(state, (draft) => {
        draft.ratioArr.push({ name: "", ratio: "" });
      }),
    [REMOVE_RATIO]: (state, { payload: { idx } }) =>
      produce(state, (draft) => {
        console.log("REMOVE_RATIO", idx);
        draft.ratioArr.splice(idx, 1);
      }),
    [SEND_RATIO_SUCCESS]: (state, { payload: { success } }) =>
      produce(state, (draft) => {
        draft.success[0] = success;
        draft.error = null;
      }),
    [SEND_RATIO_FAILURE]: (state, { payload: { error } }) =>
      produce(state, (draft) => {
        draft.error = error;
        draft.success[0] = false;
      }),
    [GET_RATIO_SUCCESS]: (state, { payload: { parts, ratio } }) =>
      produce(state, (draft) => {
        if (parts instanceof Array) {
          draft.ratioArr = parts;
        }
        draft.success[1] = ratio;
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

/**
 *    [GET_RATIO]: state =>
      produce(state, draft => {
        draft.success[1] = false;
      }),
 */
