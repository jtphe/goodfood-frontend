/* eslint-disable default-param-last */
//import { M_RESET_USER_STORE } from './actions';
import { M_SET_USER, M_RESET_USER_STORE } from './actions';
import update from 'immutability-helper';

// toutes les mutations dans ce fichier
const initialState = {
  user: null,
  token: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_SET_USER:
      // voir la doc de immutability helper
      return update(state, {
        user: {
          $set: action.res.user
        },
        token: {
          $set: action.res.token
        }
      });
    case M_RESET_USER_STORE:
      return initialState;
    default:
      return state;
  }
}
