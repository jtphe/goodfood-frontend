import { put, call, takeLatest } from 'redux-saga/effects';
import {
  U_USER_LOGOUT,
  M_RESET_APP_STORE,
  U_SEND_FORGOT_EMAIL
} from './actions';
import { M_RESET_USER_STORE } from '../user/actions';
import { M_RESET_ERROR_STORE } from '../error/actions';
import { M_RESET_ORDER_STORE } from '../order/actions';
import { M_RESET_PRODUCT_STORE } from '../product/actions';
import { M_RESET_SUPPLIER_STORE } from '../supplier/actions';
import { M_RESET_RESTAURANT_STORE } from '../restaurant/actions';
import fetchService from 'api/fetchService';

function* logout() {
  try {
    yield put({ type: M_RESET_APP_STORE });
    yield put({ type: M_RESET_USER_STORE });
    yield put({ type: M_RESET_ERROR_STORE });
    yield put({ type: M_RESET_ORDER_STORE });
    yield put({ type: M_RESET_PRODUCT_STORE });
    yield put({ type: M_RESET_SUPPLIER_STORE });
    yield put({ type: M_RESET_RESTAURANT_STORE });
  } catch (e) {
    console.log('Error while logging out => ', e);
  }
}

function* sendForgotEmail({ payload }) {
  try {
    const query = {
      method: 'post',
      url: `http://localhost:8000/forgottenpassword`,
      data: {
        email: payload.email
      }
    };
    yield call(fetchService.request, query);
  } catch (e) {
    console.log('Error while send forgot email => ', e);
  }
}

export default function* watchApp() {
  yield takeLatest(U_USER_LOGOUT, logout);
  yield takeLatest(U_SEND_FORGOT_EMAIL, sendForgotEmail);
}
