export const getOrders = (state) => state.order.orders;
export const getCurrentOrder = (state) => state.order.currentOrder;
export const getCurrentOrderIsLoading = (state) =>
  state.order.currentOrderIsLoading;
export const getOrdersIsLoading = (state) => state.order.ordersIsLoading;
