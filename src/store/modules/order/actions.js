export const GET_ORDERS = 'GET_ORDERS';
export const CHANGE_STATUT_ORDER = 'CHANGE_STATUT_ORDER';
export const M_SET_ORDERS = 'M_SET_ORDERS';
export const M_CHANGE_STATUT_ORDER = 'M_CHANGE_STATUT_ORDER';

export const loadOrders = () => ({
  type: GET_ORDERS
});

export const changeStatutOrder = ({ payload }) => ({
  type: CHANGE_STATUT_ORDER,
  payload
});
