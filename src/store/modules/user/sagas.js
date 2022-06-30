import { takeLatest, call, put } from 'redux-saga/effects';
import { M_SET_USER, USER_LOGIN } from './actions';
import { errorHandler } from 'helpers/errorHandler';
import fetchService from 'api/fetchService';

function* signIn({ payload }) {
  try {
    // console.log('payload sagas ', payload);
    const query = {
      method: 'post',
      url: `http://localhost:8000/signin`,
      data: {
        email: payload.email,
        password: payload.password
      }
    };
    const res = yield call(fetchService.request, query);

    yield put({ type: M_SET_USER, res });
    payload.navigate('/');
  } catch (e) {
    errorHandler(e.response?.data.message);
    if (e.response) {
      console.log('Error while signing up => ', e.response?.data.message);
    }
  }
}

// watch toutes les actions qu'on lance et prend le dernier appel.
export default function* watchUser() {
  yield takeLatest(USER_LOGIN, signIn);
}
