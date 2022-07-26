import { takeLatest, call, put } from 'redux-saga/effects';
import { M_SET_USER, USER_LOGIN } from './actions';
import { M_SET_ERROR } from '../error/actions';
import { errorHandler } from 'helpers/errorHandler';
import fetchService from 'api/fetchService';

function* signIn({ payload }) {
  try {
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
    if (e.response) {
      const error = errorHandler(e.response?.data.message);
      yield put({ type: M_SET_ERROR, error });
      console.log('Error while signing up => ', e.response?.data.message);
    }
  }
}

// watch toutes les actions qu'on lance et prend le dernier appel.
export default function* watchUser() {
  yield takeLatest(USER_LOGIN, signIn);
}
