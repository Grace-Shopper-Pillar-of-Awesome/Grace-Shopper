import axios from "axios";

const SET_USERS = "SET_USERS";

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get("/api/users", {
        headers: {
          authorization: token,
        }
      });
      dispatch(setUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
