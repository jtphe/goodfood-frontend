import { put, takeLatest } from 'redux-saga/effects';
import { U_USER_LOGOUT, M_RESET_APP_STORE } from './actions';
import { M_RESET_USER_STORE } from '../user/actions';

function* logout() {
  try {
    yield put({ type: M_RESET_APP_STORE });
    yield put({ type: M_RESET_USER_STORE });
  } catch (e) {
    console.log('Error while logging out => ', e);
  }
}

export default function* watchApp() {
  yield takeLatest(U_USER_LOGOUT, logout);
}
