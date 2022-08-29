import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  GET_PRODUCTS,
  M_SET_PRODUCTS,
  CREATE_PRODUCT,
  M_CREATE_PRODUCT,
  M_SET_PRODUCTS_IS_LOADING
} from './actions';
import { M_SET_ERROR } from '../error/actions';
import { getToken, getUserRestaurant } from 'store/modules/user/selectors';
import { errorHandler } from 'helpers/errorHandler';
import fetchService from 'api/fetchService';
import { toast } from 'react-toastify';

function* loadProducts({ payload }) {
  try {
    const token = yield select(getToken);
    const restaurant = yield select(getUserRestaurant);
    if (payload) {
      yield put({ type: M_SET_PRODUCTS_IS_LOADING, value: payload.refresh });
    }

    const query = {
      method: 'get',
      url: `http://localhost:8000/restaurants/${restaurant.id}/products`,
      headers: { token }
    };
    const res = yield call(fetchService.request, query);
    yield put({ type: M_SET_PRODUCTS, res });
    if (payload) {
      yield put({ type: M_SET_PRODUCTS_IS_LOADING, value: false });
    }
  } catch (e) {
    console.log('Error while getting products => ', e);
  }
}

function* createProduct({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'post',
      url: `http://localhost:8000/products`,
      data: {
        name: payload.name,
        description: payload.description,
        productType: payload.productType,
        price: payload.price,
        discount: payload.discount,
        stock: payload.stock,
        image: payload.image,
        restaurant_id: payload.restaurant_id
      },
      headers: { token }
    };

    const res = yield call(fetchService.request, query);

    yield put({ type: M_CREATE_PRODUCT, res });

    toast.success(payload.messageSuccess);
    payload.navigate('/products');
  } catch (e) {
    if (e.response) {
      const error = errorHandler(e.response?.data.message);
      yield put({ type: M_SET_ERROR, error });
    }
    toast.error(payload.messageError);
  }
}

export default function* watchProducts() {
  yield takeLatest(GET_PRODUCTS, loadProducts);
  yield takeLatest(CREATE_PRODUCT, createProduct);
}
