export const GET_PRODUCTS = 'GET_PRODUCTS';
export const M_SET_PRODUCTS = 'M_SET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const loadProducts = () => ({
  type: GET_PRODUCTS
});

export const createProduct = ({ payload }) => ({
  type: CREATE_PRODUCT,
  payload
});
