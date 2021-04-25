import axios from "axios";

const initialState = [];

//action types
const SET_GALAXIES = "SET_GALAXIES";
const DELETE_GALAXY = "DELETE_GALAXY";

//action creators
export const setGalaxies = (galaxies) => {
  return {
    type: SET_GALAXIES,
    galaxies,
  };
};

export const deleteGalaxy = (galaxy) => {
  return {
    type: DELETE_GALAXY,
    galaxy,
  };
};

//thunk creators
export const fetchGalaxies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/galaxies");
      dispatch(setGalaxies(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const destroyGalaxy = (galaxyId, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/galaxies/${galaxyId}`);
      dispatch(deleteGalaxy(data));
      //we will only be in the admin view when we delete a product, so we'll want to push them back to the products page
      history.push("/products");
    } catch (err) {
      console.error(err);
    }
  };
};

export default function galaxiesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GALAXIES:
      return action.galaxies;
    case DELETE_GALAXY:
      return state.filter((galaxy) => galaxy.id !== action.galaxy.id);
    default:
      return state;
  }
}
