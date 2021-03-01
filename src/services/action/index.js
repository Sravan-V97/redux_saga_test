export const ACTION_TYPES = {
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE",
};

export const SAGA_ACTIONS = {
  FETCH_USERS_REQUEST: "FETCH_USERS_REQUEST",
};
export const fetchUsersRequest = () => {
  return {
    type: SAGA_ACTIONS.FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: ACTION_TYPES.FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: ACTION_TYPES.FETCH_USERS_FAILURE,
    payload: error,
  };
};
