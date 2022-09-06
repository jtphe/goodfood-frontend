import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  CREATE_MANAGER,
  CREATE_WORKER,
  GET_STAFF,
  M_CREATE_MANAGER,
  M_CREATE_WORKER,
  M_SET_STAFF,
  M_UPDATE_STAFF,
  UPDATE_STAFF
} from './actions';
import { M_SET_ERROR } from '../error/actions';
import { getToken, getUserRestaurant } from 'store/modules/user/selectors';
import fetchService from 'api/fetchService';
import { toast } from 'react-toastify';
import { errorHandler } from 'helpers/errorHandler';

function* loadStaff() {
  try {
    const token = yield select(getToken);
    const restaurant = yield select(getUserRestaurant);

    const query = {
      method: 'get',
      url: `http://localhost:8000/restaurants/${restaurant.id}/users`,
      headers: { token }
    };
    const res = yield call(fetchService.request, query);

    yield put({ type: M_SET_STAFF, res });
  } catch (e) {
    console.log('Error while getting users => ', e);
  }
}

function* createWorker({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'post',
      url: `http://localhost:8000/createuser`,
      data: {
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        password: payload.password
      },
      headers: { token }
    };

    const res = yield call(fetchService.request, query);

    yield put({ type: M_CREATE_WORKER, res });

    toast.success(payload.messageSuccess);
    payload.navigate('/parameters');
  } catch (e) {
    if (e.response) {
      const error = e.response.data.message;
      yield put({ type: M_SET_ERROR, error });
    }
    toast.error(payload.messageError);
  }
}

function* createManager({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'post',
      url: `http://localhost:8000/createmanager`,
      data: {
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        password: payload.password
      },
      headers: { token }
    };

    const res = yield call(fetchService.request, query);

    yield put({ type: M_CREATE_MANAGER, res });

    toast.success(payload.messageSuccess);
    payload.navigate('/parameters');
  } catch (e) {
    if (e.response) {
      const error = errorHandler(e.response?.data.message);
      yield put({ type: M_SET_ERROR, error });
    }
    toast.error(payload.messageError);
  }
}

function* updateStaff({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'put',
      url: `http://localhost:8000/users/${payload.id}`,
      data: {
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email
      },
      headers: { token }
    };

    const res = yield call(fetchService.request, query);

    yield put({ type: M_UPDATE_STAFF, user: res });

    toast.success(payload.messageSuccess);
    payload.navigate('/parameters');
  } catch (e) {
    toast.error(payload.messageError);
  }
}

export default function* watchRestaurant() {
  yield takeLatest(GET_STAFF, loadStaff);
  yield takeLatest(CREATE_WORKER, createWorker);
  yield takeLatest(CREATE_MANAGER, createManager);
  yield takeLatest(UPDATE_STAFF, updateStaff);
}
