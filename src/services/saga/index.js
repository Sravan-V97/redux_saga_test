import axios from "axios";
import { all, fork, put, takeEvery } from "redux-saga/effects";
import { ACTION_TYPES, SAGA_ACTIONS } from "../action";

export function* workFetchUsers() {
  try {
    const resultUsers = yield axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    // yield axios.then((response) => ({ response }));
    let userData = [];
    for (const i of resultUsers.data) {
      userData.push(i);
      yield put({
        type: ACTION_TYPES.FETCH_USERS_SUCCESS,
        payload: userData,
      });
    }
  } catch (err) {
    yield put({
      type: ACTION_TYPES.FETCH_USERS_FAILURE,
      payload: err.response,
    });
  }
}

function* watchFetchUsers() {
  yield takeEvery(SAGA_ACTIONS.FETCH_USERS_REQUEST, workFetchUsers);
}
export default function* watcherRootSaga() {
  yield all([fork(watchFetchUsers)]);
}
