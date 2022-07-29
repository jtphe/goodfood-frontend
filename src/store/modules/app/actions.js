export const M_UPDATE_NETWORK_STATE =
  'U_INIT_CONNECTION_STAM_UPDATE_NETWORK_STATETE_LISTENER';
export const M_RESET_APP_STORE = 'M_RESET_APP_STORE';
export const U_USER_LOGOUT = 'U_USER_LOGOUT';
export const M_SET_ERROR = 'M_SET_ERROR';

export const updateNetworkState = (payload) => ({
  type: M_UPDATE_NETWORK_STATE,
  payload
});

export const logout = () => ({
  type: U_USER_LOGOUT
});

export const setError = (payload) => ({
  type: M_SET_ERROR,
  payload
});
