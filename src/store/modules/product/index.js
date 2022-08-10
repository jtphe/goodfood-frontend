import { M_SET_PRODUCTS } from './actions';
import update from 'immutability-helper';

const initialState = {
  products: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_SET_PRODUCTS:
      return update(state, {
        products: {
          $set: action.res
        }
      });
    default:
      return state;
  }
}
