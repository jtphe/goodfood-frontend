export const M_SET_ERROR = 'M_SET_ERROR';

export const loginError = ({ payload }) => ({
  type: M_SET_ERROR,
  payload
});
