import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  GET_SUPPLIERS,
  M_SET_SUPPLIERS,
  M_UPDATE_SUPPLIER,
  UPDATE_SUPPLIER
} from './actions';
import { getToken } from 'store/modules/user/selectors';
import fetchService from 'api/fetchService';
import { toast } from 'react-toastify';

function* loadSuppliers() {
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

function* updateSupplier({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'put',
      url: `http://localhost:8000/suppliers/${payload.id}`,
      data: {
        name: payload.name,
        type: payload.type,
        address: payload.address,
        phone: payload.phone,
        contact: payload.contact
      },
      headers: { token }
    };
    const res = yield call(fetchService.request, query);
    yield put({ type: M_UPDATE_SUPPLIER, supplier: res });

    toast.success(payload.messageSuccess);
    payload.navigate('/suppliers');
  } catch (e) {
    console.log('Error while updating supplier => ', e);
    toast.error(payload.messageError);
  }
}

export default function* watchSuppliers() {
  yield takeLatest(GET_SUPPLIERS, loadSuppliers);
  yield takeLatest(UPDATE_SUPPLIER, updateSupplier);
}
