import { M_SET_STAFF } from './actions';
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
    default:
      return state;
  }
}
