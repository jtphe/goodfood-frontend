import { M_RESET_ERROR, M_SET_ERROR } from './actions';
import update from 'immutability-helper';

const initialState = {
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_SET_ERROR:
      return update(state, {
        error: {
          $set: action.error
        }
      });
    case M_RESET_ERROR:
      return update(state, {
        error: {
          $set: initialState
        }
      });
    default:
      return state;
  }
}
