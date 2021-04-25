import axios from "axios";

const SET_GALAXY = "SET_GALAXY";
const EDIT_GALAXY = "EDIT_GALAXY";

export const setGalaxy = (galaxy) => {
  return {
    type: SET_GALAXY,
    galaxy,
  };
};

//receives the updated galaxy as parameter
export const editGalaxy = (updatedGalaxy) => {
  return {
    type: EDIT_GALAXY,
    updatedGalaxy,
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

//receive updated galaxy from PUT request
export const updateGalaxy = (galaxy, history, galaxyId) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/galaxies/${galaxyId}/edit`,
        galaxy
      );
      dispatch(editGalaxy(updated));
      history.push(`/products`);
    } catch (error) {
      console.log(error);
    }
  };
};

export default function singleGalaxyReducer(state = {}, action) {
  switch (action.type) {
    case SET_GALAXY:
      return action.galaxy;
    case EDIT_GALAXY:
      return action.updatedGalaxy;
    default:
      return state;
  }
}
