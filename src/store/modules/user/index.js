/* eslint-disable default-param-last */
import { M_RESET_USER_STORE } from './actions';

const initialState = {
  user: null,
  token: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_RESET_USER_STORE:
      return initialState;
    default:
      return state;
  }
}
