import { call, takeLatest, select, put } from 'redux-saga/effects';
import { GET_SUPPLIERS, M_SET_SUPPLIERS } from './actions';
import { getToken } from 'store/modules/user/selectors';
import fetchService from 'api/fetchService';

function* getSuppliers() {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'get',
      url: `http://localhost:8000/suppliers`,
      headers: { token }
    };
    const res = yield call(fetchService.request, query);

    yield put({ type: M_SET_SUPPLIERS, res });
  } catch (e) {
    console.log('Error while getting suppliers => ', e);
  }
}

export default function* watchSuppliers() {
  yield takeLatest(GET_SUPPLIERS, getSuppliers);
}
