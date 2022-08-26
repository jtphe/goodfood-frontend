import { M_CHANGE_STATUT_ORDER, M_SET_ORDERS } from './actions';
import update from 'immutability-helper';

const initialState = {
  orders: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_SET_ORDERS:
      return update(state, {
        orders: {
          $set: action.res
        }
      });
    case M_CHANGE_STATUT_ORDER:
      return update(state, {
        orders: {
          $set: action.res
        }
      });
    default:
      return state;
  }
}
