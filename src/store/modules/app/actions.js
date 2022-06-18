export const M_UPDATE_NETWORK_STATE =
  'U_INIT_CONNECTION_STAM_UPDATE_NETWORK_STATETE_LISTENER';
export const U_LOG_OUT = 'U_LOG_OUT';
export const M_RESET_APP_STORE = 'M_RESET_APP_STORE';
export const M_UPDATE_CURRENT_SCREEN = 'M_UPDATE_CURRENT_SCREEN';

export const updateCurrentScreen = ({ payload }) => ({
  type: M_UPDATE_CURRENT_SCREEN,
  payload
})

export const updateNetworkState = (payload) => ({
  type: M_UPDATE_NETWORK_STATE,
  payload
});

export const logout = ({ payload }) => ({
  type: U_LOG_OUT,
  payload
});
