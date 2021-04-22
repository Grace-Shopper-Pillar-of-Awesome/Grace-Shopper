import axios from "axios";

const SET_GALAXY = "SET_GALAXY";

export const setGalaxy = (galaxy) => {
  return {
    type: SET_GALAXY,
    galaxy,
  };
};

export const fetchSingleGalaxy = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/galaxies/${id}`);
      dispatch(setGalaxy(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function singleGalaxyReducer(state = {}, action) {
  switch (action.type) {
    case SET_GALAXY:
      return action.galaxy;
    default:
      return state;
  }
}
