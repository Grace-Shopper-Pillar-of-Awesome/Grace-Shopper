import axios from "axios";

const initialState = [];

//action types
const SET_GALAXIES = "SET_GALAXIES";
const DELETE_GALAXY = "DELETE_GALAXY";
const CREATE_GALAXY = "CREATE_GALAXY";

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

export const createGalaxy = (galaxy) => {
  return {
    type: CREATE_GALAXY,
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
      const { data } = await axios.delete(`/api/galaxies/${galaxyId}`,
      {
        headers: {
          authorization: token,
        },
      });
      dispatch(deleteGalaxy(data));
      //we will only be in the admin view when we delete a product, so we'll want to push them back to the products page
      history.push("/products");
    } catch (err) {
      console.error(err);
    }
  };
};

export const postGalaxy = (galaxy, history) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post("/api/galaxies", galaxy, 
      {
        headers: {
          authorization: token,
        },
      });
      dispatch(createGalaxy(created));
      history.push("/products");
    } catch (error) {
      console.error(err);
    }
  };
};

//subreducer
export default function galaxiesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GALAXIES:
      return action.galaxies;
    case DELETE_GALAXY:
      return state.filter((galaxy) => galaxy.id !== action.galaxy.id);
    case CREATE_GALAXY:
      return [...state, action.galaxy];
    default:
      return state;
  }
}
