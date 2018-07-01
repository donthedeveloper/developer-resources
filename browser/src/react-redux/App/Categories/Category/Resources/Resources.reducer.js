import axios from 'axios';

const initialState = [];
const RETRIEVE_RESOURCES = 'RETRIEVE_RESOURCES';

// REDUCER
export default (state=initialState, action) => {
    let newState = [...initialState];

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

export const retrieveResources = (categoryName) =>
    dispatch =>
        axios.get(`/api/resource?categoryName=${categoryName}`)
            .then((resources) => {
                dispatch(retrieve(resources.data))
            })
            .catch((err) => {
                console.log(err);
            });