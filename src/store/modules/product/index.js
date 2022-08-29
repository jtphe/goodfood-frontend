import {
  M_CREATE_PRODUCT,
  M_SET_PRODUCTS,
  M_SET_PRODUCTS_IS_LOADING
} from './actions';
import update from 'immutability-helper';

const initialState = {
  products: [],
  productsIsLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_SET_PRODUCTS_IS_LOADING:
      return update(state, {
        productsIsLoading: {
          $set: action.value
        }
      });
    case M_SET_PRODUCTS:
      return update(state, {
        products: {
          $set: action.res
        }
      });
    case M_CREATE_PRODUCT:
      return update(state, {
        products: {
          $push: [action.res]
        }
      });
    default:
      return state;
  }
}
