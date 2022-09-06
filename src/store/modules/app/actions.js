export const M_RESET_APP_STORE = 'M_RESET_APP_STORE';
export const U_USER_LOGOUT = 'U_USER_LOGOUT';
export const U_SEND_FORGOT_EMAIL = 'U_SEND_FORGOT_EMAIL';

export const sendForgotEmail = ({ payload }) => ({
  type: U_SEND_FORGOT_EMAIL,
  payload
});

export const logout = () => ({
  type: U_USER_LOGOUT
});
