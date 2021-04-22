import axios from 'axios';

const SET_GALAXY = 'SET_GALAXY';

export const setGalaxy = (galaxy) => {
    return {
        type: SET_GALAXY,
        galaxy
    }
}

export const fetchSingleGalaxy = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/galaxies/${galaxyId}`)
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = { selectedGalaxy: {} }

export default function singleGalaxyReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GALAXY:
            return { ...state, selectedGalaxy: action.galaxy }
        default:
            return state
    }
}
