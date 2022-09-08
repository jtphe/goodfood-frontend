import {
  M_SET_STAFF,
  M_CREATE_USER,
  M_UPDATE_STAFF,
  M_RESET_RESTAURANT_STORE
} from './actions';
import update from 'immutability-helper';

const initialState = {
  staff: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_SET_STAFF:
      return update(state, {
        staff: {
          $set: action.res
        }
      });
    case M_CREATE_USER:
      return update(state, {
        staff: {
          $push: [action.res]
        }
      });
    case M_UPDATE_STAFF: {
      const userIndex = state.staff.findIndex(
        (user) => user.id === action.user.id
      );
      return update(state, {
        staff: {
          [userIndex]: {
            $set: action.user
          }
        }
      });
    }
    case M_RESET_RESTAURANT_STORE: {
      return initialState;
    }
    default:
      return state;
  }
}
