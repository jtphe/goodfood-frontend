import {
  M_CHANGE_STATUT_ORDER,
  M_SET_ORDERS,
  M_SET_CURRENT_ORDER,
  M_SET_ORDERS_IS_LOADING,
  M_RESET_ORDER_STORE,
  M_UPDATE_CURRENT_ORDER_IS_LOADING
} from './actions';
import update from 'immutability-helper';

const initialState = {
  orders: [],
  currentOrder: null,
  currentOrderIsLoading: true,
  ordersIsLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_UPDATE_CURRENT_ORDER_IS_LOADING: {
      return update(state, {
        currentOrderIsLoading: {
          $set: action.payload.value
        }
      });
    }
    case M_SET_ORDERS_IS_LOADING:
      return update(state, {
        ordersIsLoading: {
          $set: action.value
        }
      });
    case M_SET_CURRENT_ORDER:
      return update(state, {
        currentOrder: {
          $set: action.payload.order
        },
        currentOrderIsLoading: {
          $set: true
        }
      });
    case M_SET_ORDERS:
      return update(state, {
        orders: {
          $set: action.res
        }
      });
    case M_CHANGE_STATUT_ORDER: {
      const orderIndex = state.orders.findIndex(
        (order) => order.id === action.order.id
      );
      return update(state, {
        orders: {
          [orderIndex]: {
            statut: {
              $set: action.order.statut
            }
          }
        },
        currentOrder: {
          statut: {
            $set: action.order.statut
          }
        }
      });
    }
    case M_RESET_ORDER_STORE:
      return initialState;
    default:
      return state;
  }
}
