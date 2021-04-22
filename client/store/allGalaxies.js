import axios from 'axios'


const SET_GALAXY = 'SET_GALAXY'

export const setGalaxy = (galaxy) => {
    return {
        type: SET_GALAXY,
        galaxy
    }
}

export const fetchGalaxy = () => {
    return async (dispatch) => {
        try {
            const { data } = axios.get('/api/galaxies')
            dispatch(setGalaxy(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export default function galaxyReducer(state = [], action) {
    switch (action.type) {
        case SET_GALAXY:
            return action.galaxy
        default:
            return state
    }
}