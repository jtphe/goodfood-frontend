export const GET_ORDERS = 'GET_ORDERS';
export const CHANGE_STATUT_ORDER = 'CHANGE_STATUT_ORDER';
export const M_SET_ORDERS = 'M_SET_ORDERS';
export const M_CHANGE_STATUT_ORDER = 'M_CHANGE_STATUT_ORDER';
export const M_SET_CURRENT_ORDER = 'M_SET_CURRENT_ORDER';
export const M_SET_ORDERS_IS_LOADING = 'M_SET_ORDERS_IS_LOADING';
export const M_RESET_ORDER_STORE = 'M_RESET_ORDER_STORE';

export const setCurrentOrder = ({ payload }) => ({
  type: M_SET_CURRENT_ORDER,
  payload
});

export const loadOrders = ({ payload }) => ({
  type: GET_ORDERS,
  payload
});

export const changeStatutOrder = ({ payload }) => ({
  type: CHANGE_STATUT_ORDER,
  payload
});
