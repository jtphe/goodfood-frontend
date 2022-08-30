import { fork, all } from 'redux-saga/effects';
import watchApp from '../store/modules/app/sagas';
import watchUser from '../store/modules/user/sagas';
import watchSuppliers from '../store/modules/supplier/sagas';
import watchProducts from './modules/product/sagas';
import watchOrders from './modules/order/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchApp),
    fork(watchUser),
    fork(watchSuppliers),
    fork(watchProducts),
    fork(watchOrders)
  ]);
}
