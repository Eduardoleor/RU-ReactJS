import axios from "axios";

// const data
const dataInital = {
  total: 0,
  users: [],
  load: false,
  error: false,
};

// types
const LOAD = "LOAD";
const TOTAL_USERS = "TOTAL_USERS";
const OBTAIN_USERS_SUCCESS = "OBTAIN_USERS_SUCCESS";
const OBTAIN_USERS_ERROR = "OBTAIN_USERS_ERROR";
const CLEAR_USERS = "CLEAR_USERS";

// reducer
export default function userReducer(state = dataInital, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, load: true };
    case OBTAIN_USERS_SUCCESS:
      return { ...state, users: action.payload, load: false };
    case TOTAL_USERS:
      return { ...state, total: action.payload };
    case OBTAIN_USERS_ERROR:
      return { ...state, error: true };
    case CLEAR_USERS:
      return { ...state, users: true };
    default:
      return state;
  }
}

// actions
export const obtainUsersAction = () => async (dispatch, getState) => {
  dispatch({
    type: LOAD,
  });
  try {
    const res = await axios.get("https://fakerapi.it/api/v1/persons/");
    dispatch({
      type: OBTAIN_USERS_SUCCESS,
      payload: res.data.data,
    });
    dispatch({
      type: TOTAL_USERS,
      payload: res.data.total,
    });
  } catch (err) {
    console.log(err);
  }
};

export const obtainUsersActionCount = (number) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: LOAD,
  });
  const { total } = getState().users;
  const count = total + number;
  try {
    const res = await axios.get(
      `https://fakerapi.it/api/v1/users?_quantity=${count}`
    );
    dispatch({
      type: OBTAIN_USERS_SUCCESS,
      payload: res.data.data,
    });
    dispatch({
      type: TOTAL_USERS,
      payload: res.data.total,
    });
  } catch (err) {
    console.log(err);
  }
};

export const clearUsersAction = () => async (dispatch, getState) => {
  const { users } = getState().users;
  try {
    dispatch({
      type: CLEAR_USERS,
      payload: users.push([]),
    });
  } catch (err) {
    console.log(err);
  }
};
