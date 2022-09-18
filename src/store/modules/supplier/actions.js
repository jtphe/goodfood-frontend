export const GET_SUPPLIERS = 'GET_SUPPLIERS';
export const M_SET_SUPPLIERS = 'M_SET_SUPPLIERS';
export const M_RESET_SUPPLIER_STORE = 'M_RESET_SUPPLIER_STORE';
export const UPDATE_SUPPLIER = 'UPDATE_SUPPLIER';
export const M_UPDATE_SUPPLIER = 'M_UPDATE_SUPPLIER';

export const loadSuppliers = () => ({
  type: GET_SUPPLIERS
});

export const updateSupplier = ({ payload }) => ({
  type: UPDATE_SUPPLIER,
  payload
});
