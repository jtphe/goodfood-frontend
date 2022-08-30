export const GET_PRODUCTS = 'GET_PRODUCTS';
export const M_SET_PRODUCTS = 'M_SET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const M_CREATE_PRODUCT = 'M_CREATE_PRODUCT';
export const M_SET_PRODUCTS_IS_LOADING = 'M_SET_PRODUCTS_IS_LOADING';

export const loadProducts = ({ payload }) => ({
  type: GET_PRODUCTS,
  payload
});

export const createProduct = ({ payload }) => ({
  type: CREATE_PRODUCT,
  payload
});
