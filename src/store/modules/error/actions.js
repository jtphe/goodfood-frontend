export const M_SET_ERROR = 'M_SET_ERROR';
export const M_RESET_ERROR_STORE = 'M_RESET_ERROR_STORE';

export const loginError = ({ payload }) => ({
  type: M_SET_ERROR,
  payload
});

export const resetErrorState = () => ({
  type: M_RESET_ERROR_STORE
});
