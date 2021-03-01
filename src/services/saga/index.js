import axios from "axios";
import { all, fork, put, takeEvery } from "redux-saga/effects";
import { ACTION_TYPES, SAGA_ACTIONS } from "../action";

export function* workFetchUsers() {
  try {
    const resultUsers = yield axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    // yield axios.then((response) => ({ response }));
    let userNames = [];
    for (const i of resultUsers.data) {
      userNames.push(i.name);
      yield put({
        type: ACTION_TYPES.FETCH_USERS_SUCCESS,
        payload: userNames,
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
