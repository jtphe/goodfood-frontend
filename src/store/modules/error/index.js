import { M_ERROR_LOGIN, M_ERROR_PASSWORD } from './actions';
import update from 'immutability-helper';

const initialState = {
  error_login: null,
  error_password: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_ERROR_LOGIN:
      return update(state, {
        error_login: {
          $set: action.res.message
        }
      });
    case M_ERROR_PASSWORD:
      return update(state, {
        error_password: {
          $set: action.res.message
        }
      });
    default:
      return state;
  }
}
