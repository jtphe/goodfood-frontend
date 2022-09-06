import {
  M_SET_STAFF,
  M_CREATE_WORKER,
  M_CREATE_MANAGER,
  M_UPDATE_STAFF
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
    case M_CREATE_WORKER:
      return update(state, {
        staff: {
          $push: [action.res]
        }
      });
    case M_CREATE_MANAGER:
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
    default:
      return state;
  }
}
