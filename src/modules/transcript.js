import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const STUDENT_INSERT = "transcript/STUDENT_INSERT";
const STUDENT_UPDATE = "transcript/STUDENT_UPDATE";
const STUDENT_REMOVE = "transcript/STUDENT_REMOVE";

export const student_insert = createAction(
  STUDENT_INSERT,
  (newStudent, gradePoint) => ({
    newStudent,
    gradePoint
  })
);

export const student_update = createAction(
  STUDENT_UPDATE,
  (transcript, curNum) => ({
    transcript,
    curNum
  })
);

export const student_remove = createAction(STUDENT_REMOVE, schoolID => ({
  schoolID
}));

const initialState = {
  transcript: [],
  total: { A: 0, B: 0, C: 0, D: 0, F: 0 },
  curNum: { A: 0, B: 0, C: 0, D: 0, F: 0 }
};
