import fetchService from 'api/fetchService';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getToken, getUserRestaurant } from 'store/modules/user/selectors';
import {
  GET_ORDERS,
  CHANGE_STATUT_ORDER,
  M_CHANGE_STATUT_ORDER,
  M_SET_ORDERS
} from './actions';

function* loadOrders() {
  try {
    const token = yield select(getToken);
    const restaurant = yield select(getUserRestaurant);

    const query = {
      method: 'get',
      url: `http://localhost:8000/restaurants/${restaurant.id}/orders`,
      headers: { token }
    };
    const res = yield call(fetchService.request, query);

    yield put({ type: M_SET_ORDERS, res });
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

    yield put({ type: M_CHANGE_STATUT_ORDER, res });
  } catch (e) {
    console.log('Error while getting products => ', e);
  }
}

export default function* watchOrders() {
  yield takeLatest(GET_ORDERS, loadOrders);
  yield takeLatest(CHANGE_STATUT_ORDER, changeStatut);
}
