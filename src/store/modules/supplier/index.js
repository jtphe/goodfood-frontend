import {
  M_SET_SUPPLIERS,
  M_RESET_SUPPLIER_STORE,
  M_UPDATE_SUPPLIER
} from './actions';
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
    case M_UPDATE_SUPPLIER: {
      const supplierIndex = state.suppliers.findIndex(
        (supplier) => supplier.id === action.supplier.id
      );
      return update(state, {
        suppliers: {
          [supplierIndex]: {
            $set: action.supplier
          }
        }
      });
    }
    case M_RESET_SUPPLIER_STORE:
      return initialState;
    default:
      return state;
  }
}
