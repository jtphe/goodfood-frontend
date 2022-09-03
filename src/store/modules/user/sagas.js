/* eslint-disable require-yield */
import { takeLatest, call, put } from 'redux-saga/effects';
import { M_SET_USER, USER_LOGIN, U_UPDATE_FORGOTTEN_PASSWORD } from './actions';
import { M_SET_ERROR } from '../error/actions';
import { errorHandler } from 'helpers/errorHandler';
// import { toast } from 'react-toastify';
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
    }
  }
}

function* updateForgottenPassword({ payload }) {
  try {
    // const { token, newPassword } = payload;
    console.log('payload :>> ', payload);
    // Route à changer car on ne peut pas passer le oldPassword lol
    // const query = {
    //   method: 'put',
    //   url: `http://localhost:8000/changepassword`,
    //   headers: {
    //     token
    //   },
    //   data: {
    //     newPassword
    //   }
    // };

    // const res = yield call(fetchService.request, query);
    // if (res.status === 200) {
    //   toast.success(payload.messageSuccess);
    // }
  } catch (e) {
    console.log('Error while updating user password =>  :>> ', e);
  }
}
// watch toutes les actions qu'on lance et prend le dernier appel.
export default function* watchUser() {
  yield takeLatest(USER_LOGIN, signIn);
  yield takeLatest(U_UPDATE_FORGOTTEN_PASSWORD, updateForgottenPassword);
}
