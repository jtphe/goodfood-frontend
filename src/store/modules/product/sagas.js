import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  GET_PRODUCTS,
  M_SET_PRODUCTS,
  CREATE_PRODUCT,
  M_CREATE_PRODUCT,
  M_SET_PRODUCTS_IS_LOADING,
  UPDATE_PRODUCT,
  M_UPDATE_PRODUCT
} from './actions';
import { M_SET_ERROR } from '../error/actions';
import { getToken, getUserRestaurant } from 'store/modules/user/selectors';
import { toast } from 'react-toastify';
import fetchService from 'api/fetchService';

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

    yield put({
      type: M_SET_PRODUCTS,
      res: res.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
    });
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
    const { name, description, productType, price, discount, stock, image } =
      payload;

    const query = {
      method: 'post',
      url: `http://localhost:8000/products`,
      data: {
        name,
        description,
        productType,
        price,
        discount,
        stock,
        image
      },
      headers: { token }
    };

    const res = yield call(fetchService.request, query);
    yield put({ type: M_CREATE_PRODUCT, res });

    toast.success(payload.messageSuccess);
    payload.navigate('/products');
  } catch (e) {
    if (e.response) {
      const error = e.response?.data.message;
      yield put({ type: M_SET_ERROR, error });
    }
    toast.error(payload.messageError);
  }
}

function* updateProduct({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'put',
      url: `http://localhost:8000/products/${payload.id}`,
      data: {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        discount: payload.discount,
        image: payload.image
      },
      headers: { token }
    };
    const res = yield call(fetchService.request, query);
    yield put({ type: M_UPDATE_PRODUCT, product: res });

    toast.success(payload.messageSuccess);
    payload.navigate('/products');
  } catch (e) {
    console.log('Error while updating product => ', e);
    toast.error(payload.messageError);
  }
}

export default function* watchProducts() {
  yield takeLatest(GET_PRODUCTS, loadProducts);
  yield takeLatest(CREATE_PRODUCT, createProduct);
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
}
