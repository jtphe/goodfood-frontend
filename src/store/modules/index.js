import { persistCombineReducers } from 'redux-persist';
import app from './app/index';
import user from './user/index';
import error from './error/index';
import supplier from './supplier/index';
import product from './product/index';
import order from './order/index';
import restaurant from './restaurant/index';
import storage from 'redux-persist/lib/storage';

const config = {
  key: 'root',
  storage: storage,
  blacklist: ['app']
};

export default persistCombineReducers(config, {
  app,
  user,
  error,
  supplier,
  product,
  order,
  restaurant
});
