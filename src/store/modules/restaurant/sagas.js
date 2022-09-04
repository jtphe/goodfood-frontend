import { call, takeLatest, select, put } from 'redux-saga/effects';
import { GET_STAFF, M_SET_STAFF } from './actions';
import { getToken, getUserRestaurant } from 'store/modules/user/selectors';
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

    yield put({ type: M_SET_STAFF, res });
  } catch (e) {
    console.log('Error while getting users => ', e);
  }
}

export default function* watchRestaurant() {
  yield takeLatest(GET_STAFF, loadStaff);
}
