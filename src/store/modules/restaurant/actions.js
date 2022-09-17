export const GET_STAFF = 'GET_STAFF';
export const M_SET_STAFF = 'M_SET_STAFF';
export const CREATE_TEAM_MEMBER = 'CREATE_TEAM_MEMBER';
export const M_CREATE_USER = 'M_CREATE_USER';
export const UPDATE_STAFF = 'UPDATE_STAFF';
export const M_UPDATE_STAFF = 'M_UPDATE_STAFF';
export const M_RESET_RESTAURANT_STORE = 'M_RESET_RESTAURANT_STORE';
export const DELETE_STAFF = 'DELETE_STAFF';
export const M_DELETE_STAFF = 'M_DELETE_STAFF';

export const loadStaff = () => ({
  type: GET_STAFF
});

export const createTeamMember = ({ payload }) => ({
  type: CREATE_TEAM_MEMBER,
  payload
});

export const updateStaff = ({ payload }) => ({
  type: UPDATE_STAFF,
  payload
});

export const deleteStaff = ({ payload }) => ({
  type: DELETE_STAFF,
  payload
});
