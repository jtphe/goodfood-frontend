export const GET_STAFF = 'GET_STAFF';
export const M_SET_STAFF = 'M_SET_STAFF';
export const CREATE_WORKER = 'CREATE_WORKER';
export const M_CREATE_WORKER = 'M_CREATE_WORKER';
export const CREATE_MANAGER = 'CREATE_MANAGER';
export const M_CREATE_MANAGER = 'CREATE_MANAGER';
export const UPDATE_STAFF = 'UPDATE_STAFF';
export const M_UPDATE_STAFF = 'M_UPDATE_STAFF';

export const loadStaff = () => ({
  type: GET_STAFF
});

export const createWorker = ({ payload }) => ({
  type: CREATE_WORKER,
  payload
});

export const createManager = ({ payload }) => ({
  type: CREATE_MANAGER,
  payload
});

export const updateStaff = ({ payload }) => ({
  type: UPDATE_STAFF,
  payload
});
