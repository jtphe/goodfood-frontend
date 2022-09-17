import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  CREATE_TEAM_MEMBER,
  DELETE_STAFF,
  GET_STAFF,
  M_CREATE_USER,
  M_DELETE_STAFF,
  M_SET_STAFF,
  M_UPDATE_STAFF,
  UPDATE_STAFF
} from './actions';
import { M_SET_ERROR } from '../error/actions';
import { getToken, getUserRestaurant } from 'store/modules/user/selectors';
import { toast } from 'react-toastify';
import fetchService from 'api/fetchService';

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
    yield put({
      type: M_SET_STAFF,
      res
    });
  } catch (e) {
    console.log('Error while getting users => ', e);
  }
}

function* createTeamMember({ payload }) {
  try {
    const {
      firstname,
      lastname,
      email,
      role,
      navigate,
      messageSuccess,
      messageError
    } = payload;
    const token = yield select(getToken);
    const query = {
      method: 'post',
      url: `http://localhost:8000/createuser`,
      data: {
        firstname,
        lastname,
        email,
        role
      },
      headers: { token }
    };

    const res = yield call(fetchService.request, query);

    if (res.statusCode === 200) {
      yield put({ type: M_CREATE_USER, res });
      toast.success(messageSuccess);
      navigate('/parameters');
    } else {
      toast.error(messageError);
    }
  } catch (e) {
    if (e.response) {
      const error = e.response.data.message;
      yield put({ type: M_SET_ERROR, error });
    }
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

    if (payload.password?.trim() !== '' && payload.oldPassword) {
      const queryPassword = {
        method: 'put',
        url: `http://localhost:8000/changepassword`,
        data: {
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword
        },
        headers: { token }
      };
      yield call(fetchService.request, queryPassword);
    }

    toast.success(payload.messageSuccess);
    payload.navigate('/parameters');
  } catch (e) {
    console.log('Error while updating staff member => ', e);
    if (e.response.status === 400) {
      toast.error(payload.messageWrongOldPassword);
    } else {
      toast.error(payload.messageError);
    }
  }
}

function* deleteStaff({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'delete',
      url: `http://localhost:8000/users/${payload.id}`,
      headers: { token }
    };

    const res = yield call(fetchService.request, query);

    if (res.statusCode === 200) {
      yield put({ type: M_DELETE_STAFF, user: payload.id });

      toast.success(payload.messageSuccess);
    }
  } catch (e) {
    if (e.response) {
      console.log(e.response);
    }
  }
}

export default function* watchRestaurant() {
  yield takeLatest(GET_STAFF, loadStaff);
  yield takeLatest(CREATE_TEAM_MEMBER, createTeamMember);
  yield takeLatest(UPDATE_STAFF, updateStaff);
  yield takeLatest(DELETE_STAFF, deleteStaff);
}
