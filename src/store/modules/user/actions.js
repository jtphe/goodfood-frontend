export const USER_LOGIN = 'USER_LOGIN';
export const M_RESET_USER_STORE = 'M_RESET_USER_STORE';
export const M_SET_USER = 'M_SET_USER';
export const U_UPDATE_FORGOTTEN_PASSWORD = 'U_UPDATE_FORGOTTEN_PASSWORD';

export const userLogIn = ({ payload }) => ({
  type: USER_LOGIN,
  payload
});

export const updateForgottenPassword = ({ payload }) => ({
  type: U_UPDATE_FORGOTTEN_PASSWORD,
  payload
});
