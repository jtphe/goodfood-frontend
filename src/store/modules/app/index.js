/* eslint-disable default-param-last */
import update from 'immutability-helper';
import {
  M_UPDATE_NETWORK_STATE,
  M_RESET_APP_STORE
} from './actions';

const initialState = {
  name: 'goodfood-frontend',
  socket: null,
  networkState: 'connected'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_UPDATE_NETWORK_STATE:
      return update(state, {
        networkState: {
          $set: action.payload.connectionState
        }
      });
    case M_RESET_APP_STORE:
      return initialState;
    default:
      return state;
  }
}
