import axios from "axios";

const SET_GALAXIES = "SET_GALAXIES";

export const setGalaxies = (galaxies) => {
  return {
    type: SET_GALAXIES,
    galaxies,
  };
};

export const fetchGalaxies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/galaxies");
      console.log("this is data in thunk creator:", data);
      dispatch(setGalaxies(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function galaxiesReducer(state = [], action) {
  switch (action.type) {
    case SET_GALAXIES:
      return action.galaxies;
    default:
      return state;
  }
}
