/* eslint-disable default-param-last */
import update from 'immutability-helper';
import {
  M_UPDATE_NETWORK_STATE,
  M_RESET_APP_STORE,
  M_UPDATE_CURRENT_SCREEN
} from './actions';

const initialState = {
  name: 'goodfood-frontend',
  networkState: 'connected',
  currentScreen: 'orders'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_UPDATE_NETWORK_STATE:
      return update(state, {
        networkState: {
          $set: action.payload.connectionState
        }
      });
    case M_UPDATE_CURRENT_SCREEN:
      return update(state, {
        currentScreen: {
          $set: action.payload.screen
        }
      })
    case M_RESET_APP_STORE:
      return initialState;
    default:
      return state;
  }
}
