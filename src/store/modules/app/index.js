/* eslint-disable default-param-last */
import { M_RESET_APP_STORE } from './actions';

const initialState = {
  name: 'goodfood-frontend',
  currentScreen: 'home'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_RESET_APP_STORE:
      return initialState;
    default:
      return state;
  }
}
