import { call, takeLatest, select, put } from 'redux-saga/effects';
import { GET_PRODUCTS, M_SET_PRODUCTS } from './actions';
import { getToken } from 'store/modules/user/selectors';
import fetchService from 'api/fetchService';

function* loadProducts() {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'get',
      url: `http://localhost:8000/restaurants/5/products`,
      headers: { token }
    };
    const res = yield call(fetchService.request, query);

    yield put({ type: M_SET_PRODUCTS, res });
  } catch (e) {
    console.log('Error while getting products => ', e);
  }
}

export default function* watchProducts() {
  yield takeLatest(GET_PRODUCTS, loadProducts);
}
