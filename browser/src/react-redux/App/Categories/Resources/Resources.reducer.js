import axios from 'axios';

const initialState = [];
const RETRIEVE_RESOURCES = 'RETRIEVE_RESOURCES';

// REDUCER
export default (state=initialState, action) => {
    // const newState = Object.assign({}, state);

    switch (action.type) {
        case RETRIEVE_RESOURCES:
            newState = action.resources;
            break;
        default:
            return state;
    }

    return newState;
};

const retrieve = (resources) => ({
    type: RETRIEVE_RESOURCES,
    resources
});

export const retrieveResources = () =>
    dispatch =>
        axios.get('/api/resource')
            .then((resources) => {
                dispatch(retrieve(resources.data))
            });