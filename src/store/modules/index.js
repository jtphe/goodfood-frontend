import { persistCombineReducers } from 'redux-persist';
import app from './app/index';
import user from './user/index';
import storage from 'redux-persist/lib/storage'

const config = {
  key: 'root',
  storage: storage,
  blacklist: ['app']
};


export default persistCombineReducers(config, {
  app,
  user
});
