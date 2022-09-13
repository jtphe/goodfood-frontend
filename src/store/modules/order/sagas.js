import fetchService from 'api/fetchService';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getToken, getUserRestaurant } from 'store/modules/user/selectors';
import {
  GET_ORDERS,
  CHANGE_STATUT_ORDER,
  M_CHANGE_STATUT_ORDER,
  M_SET_ORDERS,
  M_SET_ORDERS_IS_LOADING
} from './actions';

function* loadOrders({ payload }) {
  try {
    const token = yield select(getToken);
    const restaurant = yield select(getUserRestaurant);
    if (payload) {
      yield put({ type: M_SET_ORDERS_IS_LOADING, value: payload.refresh });
    }

    const query = {
      method: 'get',
      url: `http://localhost:8000/restaurants/${restaurant.id}/orders`,
      headers: { token }
    };
    const res = yield call(fetchService.request, query);

    yield put({
      type: M_SET_ORDERS,
      res: res.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)).reverse()
    });
    if (payload) {
      yield put({ type: M_SET_ORDERS_IS_LOADING, value: false });
    }
  } catch (e) {
    console.log('Error while getting products => ', e);
  }
}

function* changeStatut({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'put',
      url: `http://localhost:8000/orders/${payload.orderId}/changestatut`,
      data: {
        statut: payload.statut
      },
      headers: { token }
    };
    const res = yield call(fetchService.request, query);
    console.log('res :>> ', res);

    yield put({ type: M_CHANGE_STATUT_ORDER, order: res });
  } catch (e) {
    console.log('Error while getting products => ', e);
  }
}

export default function* watchOrders() {
  yield takeLatest(GET_ORDERS, loadOrders);
  yield takeLatest(CHANGE_STATUT_ORDER, changeStatut);
}
