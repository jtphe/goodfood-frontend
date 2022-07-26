export const M_ERROR_LOGIN = 'M_ERROR_LOGIN';
export const M_ERROR_PASSWORD = 'M_ERROR_PASSWORD';

export const loginError = ({ payload }) => ({
  type: M_ERROR_LOGIN,
  payload
});
