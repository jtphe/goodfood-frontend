import { M_SET_SUPPLIERS, M_RESET_SUPPLIER_STORE } from './actions';
import update from 'immutability-helper';

const initialState = {
  suppliers: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_SET_SUPPLIERS:
      return update(state, {
        suppliers: {
          $set: action.res
        }
      });
    case M_RESET_SUPPLIER_STORE:
      return initialState;
    default:
      return state;
  }
}
